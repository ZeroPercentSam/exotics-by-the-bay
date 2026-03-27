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
import { X } from "lucide-react";

interface VehicleFiltersProps {
  brands: { name: string; slug: string }[];
}

const PRICE_TIERS = [
  { label: "Under $500", value: "0-500" },
  { label: "$500 - $799", value: "500-799" },
  { label: "$800 - $999", value: "800-999" },
  { label: "$1,000+", value: "1000-99999" },
];

const CITIES = [
  { label: "Tampa", value: "tampa" },
  { label: "Miami", value: "miami" },
  { label: "Orlando", value: "orlando" },
];

export function VehicleFilters({ brands }: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const currentCity = searchParams.get("city") || "";
  const currentPrice = searchParams.get("price") || "";

  const hasFilters = currentBrand || currentCity || currentPrice;

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
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select value={currentCity || "all"} onValueChange={(v) => updateFilter("city", v)}>
        <SelectTrigger className="w-full sm:w-[160px] bg-card border-white/10 text-white">
          <SelectValue placeholder="All Locations" />
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

      <Select value={currentBrand || "all"} onValueChange={(v) => updateFilter("brand", v)}>
        <SelectTrigger className="w-full sm:w-[180px] bg-card border-white/10 text-white">
          <SelectValue placeholder="All Brands" />
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

      <Select value={currentPrice || "all"} onValueChange={(v) => updateFilter("price", v)}>
        <SelectTrigger className="w-full sm:w-[160px] bg-card border-white/10 text-white">
          <SelectValue placeholder="Any Price" />
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

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-white/50 hover:text-white"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
