import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import sharp from "sharp";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const OPTIMIZED_WIDTH = 1920;
const THUMB_WIDTH = 400;
const QUALITY = 82;

interface UploadResult {
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  originalName: string;
  alt: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authenticated admin
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const vehicleSlug = formData.get("vehicleSlug") as string;
    const vehicleName = formData.get("vehicleName") as string;

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const results: UploadResult[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 10MB limit` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const slug = vehicleSlug || "vehicle";
      const timestamp = Date.now();
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase();

      // Optimize main image: resize to max 1920px wide, convert to WebP
      const optimized = await sharp(buffer)
        .resize(OPTIMIZED_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: QUALITY, effort: 4 })
        .toBuffer();

      const metadata = await sharp(optimized).metadata();

      // Generate thumbnail: 400px wide WebP
      const thumbnail = await sharp(buffer)
        .resize(THUMB_WIDTH, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: 70, effort: 4 })
        .toBuffer();

      // Upload optimized main image
      const mainPath = `${slug}/${timestamp}-${cleanName}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("vehicle-images")
        .upload(mainPath, optimized, {
          contentType: "image/webp",
          cacheControl: "31536000", // 1 year cache
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: `Upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      // Upload thumbnail
      const thumbPath = `${slug}/thumbs/${timestamp}-${cleanName}.webp`;
      await supabase.storage
        .from("vehicle-images")
        .upload(thumbPath, thumbnail, {
          contentType: "image/webp",
          cacheControl: "31536000",
          upsert: false,
        });

      // Get public URLs
      const { data: mainUrl } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(mainPath);

      const { data: thumbUrl } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(thumbPath);

      // Auto-generate SEO alt text
      const alt = generateAltText(vehicleName || slug, cleanName, results.length);

      results.push({
        url: mainUrl.publicUrl,
        thumbnailUrl: thumbUrl.publicUrl,
        width: metadata.width || OPTIMIZED_WIDTH,
        height: metadata.height || 0,
        size: optimized.length,
        originalName: file.name,
        alt,
      });
    }

    return NextResponse.json({ images: results });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}

function generateAltText(
  vehicleName: string,
  fileName: string,
  index: number
): string {
  // Try to extract context from filename
  const contexts = [
    "exterior front view",
    "exterior rear view",
    "side profile",
    "interior dashboard",
    "interior seats",
    "engine bay",
    "wheel detail",
    "aerial view",
  ];

  const fileHints: Record<string, string> = {
    front: "exterior front view",
    rear: "exterior rear view",
    back: "exterior rear view",
    side: "side profile view",
    interior: "interior view",
    dash: "interior dashboard",
    dashboard: "interior dashboard",
    engine: "engine detail",
    wheel: "wheel and brake detail",
    seat: "interior seats",
    cockpit: "cockpit view",
  };

  let context = contexts[index % contexts.length];

  // Check filename for hints
  const lowerFile = fileName.toLowerCase();
  for (const [hint, desc] of Object.entries(fileHints)) {
    if (lowerFile.includes(hint)) {
      context = desc;
      break;
    }
  }

  return `${vehicleName} - ${context} | Exotic car rental Tampa, Miami, Orlando`;
}
