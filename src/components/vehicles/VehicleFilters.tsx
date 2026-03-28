"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";

interface VehicleFiltersProps {
  brands: { name: string; slug: string }[];
}

const CATEGORIES = [
  { label: "Exotic", value: "exotic", description: "Lamborghini, McLaren, Porsche" },
  { label: "Luxury", value: "luxury", description: "Rolls Royce, Bentley, Mercedes" },
  { label: "Muscle", value: "muscle", description: "Shelby GT500, Charger, Corvette" },
];

const PRICE_TIERS = [
  { label: "Under $500/day", value: "0-500" },
  { label: "$500 – $799/day", value: "500-799" },
  { label: "$800 – $999/day", value: "800-999" },
  { label: "$1,000+/day", value: "1000-99999" },
];

const CITIES = [
  { label: "Tampa", value: "tampa" },
  { label: "Miami", value: "miami" },
  { label: "Orlando", value: "orlando" },
];

const SORT_OPTIONS = [
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Newest First", value: "newest" },
];

export function VehicleFilters({ brands }: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const currentCity = searchParams.get("city") || "";
  const currentPrice = searchParams.get("price") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";

  const activeFilterCount = [currentBrand, currentCity, currentPrice, currentCategory].filter(Boolean).length;

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/fleet?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push("/fleet", { scroll: false });
  }, [router]);

  return (
    <div className="w-full space-y-3">
      {/* Filter label */}
      <div className="flex items-center gap-2 text-sm text-white/50">
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filter vehicles by:</span>
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-semibold text-gold">
            {activeFilterCount} active
          </span>
        )}
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3 items-end">
        {/* Location Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Location</label>
          <Select value={currentCity || "all"} onValueChange={(v) => updateFilter("city", v)}>
            <SelectTrigger className="w-[170px] bg-card border-white/10 text-white">
              <SelectValue>
                {currentCity ? CITIES.find((c) => c.value === currentCity)?.label : "All Locations"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="all">All Locations</SelectItem>
              {CITIES.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Type</label>
          <Select value={currentCategory || "all"} onValueChange={(v) => updateFilter("category", v)}>
            <SelectTrigger className="w-[170px] bg-card border-white/10 text-white">
              <SelectValue>
                {currentCategory ? CATEGORIES.find((c) => c.value === currentCategory)?.label : "All Types"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="all">All Types</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex flex-col">
                    <span>{cat.label}</span>
                    <span className="text-[11px] text-white/40">{cat.description}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Brand</label>
          <Select value={currentBrand || "all"} onValueChange={(v) => updateFilter("brand", v)}>
            <SelectTrigger className="w-[180px] bg-card border-white/10 text-white">
              <SelectValue>
                {currentBrand ? brands.find((b) => b.slug === currentBrand)?.name : "All Brands"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.slug} value={brand.slug}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Daily Rate</label>
          <Select value={currentPrice || "all"} onValueChange={(v) => updateFilter("price", v)}>
            <SelectTrigger className="w-[180px] bg-card border-white/10 text-white">
              <SelectValue>
                {currentPrice ? PRICE_TIERS.find((p) => p.value === currentPrice)?.label : "Any Price"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="all">Any Price</SelectItem>
              {PRICE_TIERS.map((tier) => (
                <SelectItem key={tier.value} value={tier.value}>
                  {tier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Sort By</label>
          <Select value={currentSort || "price-desc"} onValueChange={(v) => updateFilter("sort", v)}>
            <SelectTrigger className="w-[190px] bg-card border-white/10 text-white">
              <SelectValue>
                {SORT_OPTIONS.find((o) => o.value === (currentSort || "price-desc"))?.label || "Price: High to Low"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentCity && (
            <FilterChip
              label={`Location: ${CITIES.find((c) => c.value === currentCity)?.label || currentCity}`}
              onRemove={() => updateFilter("city", null)}
            />
          )}
          {currentCategory && (
            <FilterChip
              label={`Type: ${CATEGORIES.find((c) => c.value === currentCategory)?.label || currentCategory}`}
              onRemove={() => updateFilter("category", null)}
            />
          )}
          {currentBrand && (
            <FilterChip
              label={`Brand: ${brands.find((b) => b.slug === currentBrand)?.name || currentBrand}`}
              onRemove={() => updateFilter("brand", null)}
            />
          )}
          {currentPrice && (
            <FilterChip
              label={`Price: ${PRICE_TIERS.find((p) => p.value === currentPrice)?.label || currentPrice}`}
              onRemove={() => updateFilter("price", null)}
            />
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-medium text-gold transition-colors hover:bg-gold/10 hover:border-gold/30"
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}
