// Blog migration script - fetches from Shopify Atom feeds and inserts into Supabase
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cokdltrfrspaapwzpntu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNva2RsdHJmcnNwYWFwd3pwbnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTI1OTIsImV4cCI6MjA5MDE2ODU5Mn0.vhbyfkXss1iPk8Xydgt9_hJ9iG-kv2Q9scnGEi-3efo";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signInAsAdmin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "exoticsadmin@exoticsbythebay.co",
    password: "Exoticspass1!",
  });
  if (error) {
    console.error("Failed to sign in as admin:", error.message);
    process.exit(1);
  }
  console.log("Signed in as admin:", data.user?.email);
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  status: string;
  tags: string[];
  category: string | null;
  shopify_blog_channel: string;
  shopify_url: string;
  published_at: string;
}

function extractSlug(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

function extractExcerpt(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 200) + (text.length > 200 ? "..." : "");
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

async function fetchAtomFeed(url: string): Promise<any[]> {
  console.log(`Fetching: ${url}`);
  const res = await fetch(url);
  const xml = await res.text();

  const entries: any[] = [];
  const entryRegex =
    /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];

    const title =
      entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim() || "";
    const link =
      entry.match(/<link[^>]*href="([^"]*)"[^>]*\/>/)?.[1] ||
      entry.match(/<link[^>]*href="([^"]*)"/)?.[1] ||
      "";
    const published =
      entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() || "";
    const content =
      entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1]?.trim() || "";

    // Decode HTML entities in content
    const decodedContent = content
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    if (title && link) {
      entries.push({
        title,
        url: link,
        published,
        content: decodedContent,
      });
    }
  }

  console.log(`  Found ${entries.length} entries`);
  return entries;
}

async function main() {
  console.log("Starting blog migration from Shopify...\n");

  // Sign in as admin to bypass RLS
  await signInAsAdmin();

  // Fetch both blog channels
  const [newsEntries, carRentalEntries] = await Promise.all([
    fetchAtomFeed("https://exoticsbythebay.co/blogs/news.atom"),
    fetchAtomFeed("https://exoticsbythebay.co/blogs/car-rental-news.atom"),
  ]);

  const allPosts: BlogPost[] = [];

  // Process news entries
  for (const entry of newsEntries) {
    allPosts.push({
      title: entry.title,
      slug: extractSlug(entry.url),
      excerpt: extractExcerpt(entry.content),
      content: entry.content,
      featured_image_url: extractFirstImage(entry.content),
      status: "published",
      tags: ["exotic cars"],
      category: "News",
      shopify_blog_channel: "news",
      shopify_url: entry.url,
      published_at: entry.published || new Date().toISOString(),
    });
  }

  // Process car-rental-news entries
  for (const entry of carRentalEntries) {
    allPosts.push({
      title: entry.title,
      slug: extractSlug(entry.url),
      excerpt: extractExcerpt(entry.content),
      content: entry.content,
      featured_image_url: extractFirstImage(entry.content),
      status: "published",
      tags: ["car rental", "tips"],
      category: "Car Rental News",
      shopify_blog_channel: "car-rental-news",
      shopify_url: entry.url,
      published_at: entry.published || new Date().toISOString(),
    });
  }

  console.log(`\nTotal posts to insert: ${allPosts.length}`);

  // Check for existing posts to avoid duplicates
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("slug");
  const existingSlugs = new Set((existing || []).map((p: any) => p.slug));

  const newPosts = allPosts.filter((p) => !existingSlugs.has(p.slug));
  console.log(
    `New posts (not already in DB): ${newPosts.length} (${existingSlugs.size} already exist)`
  );

  if (newPosts.length === 0) {
    console.log("No new posts to insert. Done!");
    return;
  }

  // Insert in batches of 10
  const batchSize = 10;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < newPosts.length; i += batchSize) {
    const batch = newPosts.slice(i, i + batchSize);
    const { error } = await supabase.from("blog_posts").insert(batch);

    if (error) {
      console.error(`Batch ${i / batchSize + 1} error:`, error.message);
      // Try one by one
      for (const post of batch) {
        const { error: singleError } = await supabase
          .from("blog_posts")
          .insert(post);
        if (singleError) {
          console.error(`  Failed: "${post.title}" - ${singleError.message}`);
          errors++;
        } else {
          inserted++;
        }
      }
    } else {
      inserted += batch.length;
      console.log(
        `  Inserted batch ${i / batchSize + 1} (${batch.length} posts)`
      );
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`  Inserted: ${inserted}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Skipped (duplicates): ${allPosts.length - newPosts.length}`);
}

main().catch(console.error);
