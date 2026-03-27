"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LOCATIONS } from "@/lib/constants";
import { ImageUploader, VehicleImage } from "@/components/admin/ImageUploader";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface Brand {
  id: string;
  name: string;
}

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  const supabase = createClient();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    year: new Date().getFullYear(),
    make: "",
    model: "",
    variant: "",
    category: "exotic",
    brand_id: "",
    daily_rate: "",
    description: "",
    engine: "",
    horsepower: "",
    torque: "",
    transmission: "",
    drivetrain: "",
    seats: "",
    top_speed: "",
    zero_to_sixty: "",
    is_featured: false,
    status: "active",
  });

  const [vehicleImages, setVehicleImages] = useState<VehicleImage[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Load vehicle data
  useEffect(() => {
    async function loadData() {
      const [{ data: brandsData }, { data: vehicle }, { data: vehicleLocs }] =
        await Promise.all([
          supabase.from("brands").select("id, name").order("name"),
          supabase.from("vehicles").select("*").eq("id", vehicleId).single(),
          supabase
            .from("vehicle_locations")
            .select("location:locations(slug)")
            .eq("vehicle_id", vehicleId),
        ]);

      if (brandsData) setBrands(brandsData);

      if (vehicle) {
        const specs = vehicle.specs || {};
        setForm({
          name: vehicle.name || "",
          slug: vehicle.slug || "",
          year: vehicle.year || new Date().getFullYear(),
          make: vehicle.make || "",
          model: vehicle.model || "",
          variant: vehicle.variant || "",
          category: vehicle.category || "exotic",
          brand_id: vehicle.brand_id || "",
          daily_rate: vehicle.daily_rate?.toString() || "",
          description: vehicle.description || "",
          engine: specs.engine || "",
          horsepower: specs.horsepower?.toString() || "",
          torque: specs.torque || "",
          transmission: specs.transmission || "",
          drivetrain: specs.drivetrain || "",
          seats: specs.seats?.toString() || "",
          top_speed: specs.top_speed || "",
          zero_to_sixty: specs.zero_to_sixty || "",
          is_featured: vehicle.is_featured || false,
          status: vehicle.status || "active",
        });

        // Load existing images
        if (vehicle.images && Array.isArray(vehicle.images)) {
          setVehicleImages(
            vehicle.images.map((url: string, i: number) => ({
              url,
              alt: `${vehicle.name} - image ${i + 1}`,
            }))
          );
        }
      }

      if (vehicleLocs) {
        const slugs = vehicleLocs
          .map((vl: any) => vl.location?.slug)
          .filter(Boolean);
        setSelectedLocations(slugs);
      }

      setLoading(false);
    }

    loadData();
  }, [vehicleId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "name") {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const toggleLocation = (locationKey: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationKey)
        ? prev.filter((k) => k !== locationKey)
        : [...prev, locationKey]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const images = vehicleImages.map((img) => img.url);

    const specs: Record<string, any> = {};
    if (form.engine) specs.engine = form.engine;
    if (form.horsepower) specs.horsepower = parseInt(form.horsepower);
    if (form.torque) specs.torque = form.torque;
    if (form.transmission) specs.transmission = form.transmission;
    if (form.drivetrain) specs.drivetrain = form.drivetrain;
    if (form.seats) specs.seats = parseInt(form.seats);
    if (form.top_speed) specs.top_speed = form.top_speed;
    if (form.zero_to_sixty) specs.zero_to_sixty = form.zero_to_sixty;

    const { error: updateError } = await supabase
      .from("vehicles")
      .update({
        name: form.name,
        slug: form.slug,
        year: form.year,
        make: form.make,
        model: form.model,
        variant: form.variant || null,
        category: form.category,
        brand_id: form.brand_id || null,
        daily_rate: parseFloat(form.daily_rate),
        description: form.description || null,
        specs,
        images,
        is_featured: form.is_featured,
        status: form.status,
      })
      .eq("id", vehicleId);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    // Update vehicle_locations: delete existing, re-insert
    await supabase
      .from("vehicle_locations")
      .delete()
      .eq("vehicle_id", vehicleId);

    if (selectedLocations.length > 0) {
      const { data: locationRows } = await supabase
        .from("locations")
        .select("id, slug")
        .in("slug", selectedLocations);

      if (locationRows && locationRows.length > 0) {
        await supabase.from("vehicle_locations").insert(
          locationRows.map((loc: any) => ({
            vehicle_id: vehicleId,
            location_id: loc.id,
          }))
        );
      }
    }

    router.push("/admin/fleet");
    router.refresh();
  };

  const categories = [
    "exotic",
    "luxury",
    "sports",
    "suv",
    "sedan",
    "convertible",
    "coupe",
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#fbdd2f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Edit Vehicle
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Update vehicle details, images, and settings.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>
          <Separator className="my-4 bg-white/10" />

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-white/70">
                  Display Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-white/70">
                  Slug
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="mt-1.5 border-white/10 bg-white/5 text-white/50"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <Label htmlFor="year" className="text-white/70">Year *</Label>
                <Input id="year" name="year" type="number" value={form.year} onChange={handleChange} required className="mt-1.5 border-white/10 bg-white/5 text-white" />
              </div>
              <div>
                <Label htmlFor="make" className="text-white/70">Make *</Label>
                <Input id="make" name="make" value={form.make} onChange={handleChange} required className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
              </div>
              <div>
                <Label htmlFor="model" className="text-white/70">Model *</Label>
                <Input id="model" name="model" value={form.model} onChange={handleChange} required className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
              </div>
              <div>
                <Label htmlFor="variant" className="text-white/70">Variant</Label>
                <Input id="variant" name="variant" value={form.variant} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="category" className="text-white/70">Category *</Label>
                <select id="category" name="category" value={form.category} onChange={handleChange} className="mt-1.5 flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-gold/50">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-black text-white">{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="brand_id" className="text-white/70">Brand</Label>
                <select id="brand_id" name="brand_id" value={form.brand_id} onChange={handleChange} className="mt-1.5 flex h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-gold/50">
                  <option value="" className="bg-black text-white">Select brand...</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id} className="bg-black text-white">{brand.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="daily_rate" className="text-white/70">Daily Rate ($) *</Label>
                <Input id="daily_rate" name="daily_rate" type="number" step="1" min="0" value={form.daily_rate} onChange={handleChange} required className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white/70">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
          </div>
        </Card>

        {/* Specs */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Specifications</h2>
          <Separator className="my-4 bg-white/10" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="engine" className="text-white/70">Engine</Label>
              <Input id="engine" name="engine" value={form.engine} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="horsepower" className="text-white/70">Horsepower</Label>
              <Input id="horsepower" name="horsepower" type="number" value={form.horsepower} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="torque" className="text-white/70">Torque</Label>
              <Input id="torque" name="torque" value={form.torque} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="transmission" className="text-white/70">Transmission</Label>
              <Input id="transmission" name="transmission" value={form.transmission} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="drivetrain" className="text-white/70">Drivetrain</Label>
              <Input id="drivetrain" name="drivetrain" value={form.drivetrain} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="seats" className="text-white/70">Seats</Label>
              <Input id="seats" name="seats" type="number" value={form.seats} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="top_speed" className="text-white/70">Top Speed</Label>
              <Input id="top_speed" name="top_speed" value={form.top_speed} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
            <div>
              <Label htmlFor="zero_to_sixty" className="text-white/70">0-60 mph</Label>
              <Input id="zero_to_sixty" name="zero_to_sixty" value={form.zero_to_sixty} onChange={handleChange} className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30" />
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Images</h2>
          <p className="mt-1 text-sm text-white/40">
            Upload images or paste URLs. Images are auto-optimized to WebP with SEO alt text.
            Drag to reorder — first image becomes the hero.
          </p>
          <Separator className="my-4 bg-white/10" />

          <ImageUploader
            images={vehicleImages}
            onChange={setVehicleImages}
            vehicleSlug={form.slug}
            vehicleName={form.name}
          />
        </Card>

        {/* Locations & Settings */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Locations &amp; Settings
          </h2>
          <Separator className="my-4 bg-white/10" />

          <div className="space-y-4">
            <div>
              <Label className="text-white/70">Available Locations</Label>
              <div className="mt-2 flex flex-wrap gap-4">
                {Object.entries(LOCATIONS).map(([key, loc]) => (
                  <label key={key} className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                    <Checkbox
                      checked={selectedLocations.includes(key)}
                      onCheckedChange={() => toggleLocation(key)}
                    />
                    {loc.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                <Checkbox
                  checked={form.is_featured}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, is_featured: checked === true }))
                  }
                />
                Featured Vehicle
              </label>
            </div>

            <div>
              <Label htmlFor="status" className="text-white/70">Status</Label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className="mt-1.5 flex h-9 w-full max-w-xs rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-gold/50">
                <option value="active" className="bg-black text-white">Active</option>
                <option value="inactive" className="bg-black text-white">Inactive</option>
                <option value="maintenance" className="bg-black text-white">Maintenance</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving}
            className="flex-1 bg-gold text-black font-semibold hover:bg-gold/90 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/fleet")}
            className="border-white/10 text-white/60 hover:border-white/20"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
