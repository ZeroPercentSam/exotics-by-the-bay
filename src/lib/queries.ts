import { createClient } from "@/lib/supabase/server";

export async function getVehicles(filters?: {
  brand?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  featured?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("vehicles")
    .select(`
      *,
      brand:brands(name, slug),
      vehicle_locations(
        location:locations(name, slug)
      )
    `)
    .eq("status", "active")
    .eq("is_available", true)
    .order("daily_rate", { ascending: false });

  if (filters?.brand) {
    query = query.eq("brand.slug", filters.brand);
  }
  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.featured) {
    query = query.eq("is_featured", true);
  }
  if (filters?.priceMin) {
    query = query.gte("daily_rate", filters.priceMin);
  }
  if (filters?.priceMax) {
    query = query.lte("daily_rate", filters.priceMax);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Filter by city if specified (need to do post-query due to junction table)
  if (filters?.city && data) {
    return data.filter((v: any) =>
      v.vehicle_locations?.some(
        (vl: any) => vl.location?.slug === filters.city
      )
    );
  }

  return data || [];
}

export async function getVehicleBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      brand:brands(name, slug),
      vehicle_locations(
        location:locations(name, slug, phone)
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getAllVehicleSlugs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("slug")
    .eq("status", "active");

  if (error) return [];
  return data.map((v) => v.slug);
}

export async function getBrands() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("sort_order");

  if (error) return [];
  return data;
}

export async function getLocations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true);

  if (error) return [];
  return data;
}

export async function getFeaturedVehicles(limit = 6) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      brand:brands(name, slug)
    `)
    .eq("status", "active")
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("daily_rate", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data;
}

export async function getRelatedVehicles(
  currentSlug: string,
  brandSlug: string,
  limit = 3
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      brand:brands(name, slug)
    `)
    .eq("status", "active")
    .neq("slug", currentSlug)
    .order("daily_rate", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data;
}
