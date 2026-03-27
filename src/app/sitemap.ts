import type { MetadataRoute } from "next";

const SITE_URL = "https://exoticsbythebay.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch vehicle slugs directly (avoid cookies in sitemap generation)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vehicles?select=slug,updated_at&status=eq.active`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  const vehicles: { slug: string; updated_at: string }[] = await res.json();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/fleet`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/locations/tampa`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/locations/miami`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/locations/orlando`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/jets`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/yachts`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/sprinters`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/wedding-rentals`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/airport-rentals`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const vehiclePages: MetadataRoute.Sitemap = (vehicles || []).map((v) => ({
    url: `${SITE_URL}/fleet/${v.slug}`,
    lastModified: v.updated_at,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...vehiclePages];
}
