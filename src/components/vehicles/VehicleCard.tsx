"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VehicleCardProps {
  vehicle: {
    slug: string;
    name: string;
    year: number;
    make: string;
    model: string;
    daily_rate: number;
    category: string;
    images: string[];
    specs: any;
    brand?: { name: string; slug: string } | null;
  };
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const heroImage = vehicle.images?.[0];
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(vehicle.daily_rate);

  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-white/5 bg-card transition-all duration-500 hover:border-gold/20 hover:shadow-[0_0_30px_rgba(251,221,47,0.05)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={vehicle.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/20 text-sm uppercase tracking-wider">
            {vehicle.make}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category badge */}
        <Badge
          variant="outline"
          className="absolute top-3 left-3 border-white/20 bg-black/60 text-white/80 text-[10px] uppercase tracking-wider backdrop-blur-sm"
        >
          {vehicle.category}
        </Badge>

        {/* HP badge */}
        {vehicle.specs?.horsepower && (
          <Badge className="absolute top-3 right-3 bg-gold/90 text-black text-[10px] font-bold">
            {vehicle.specs.horsepower} HP
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {vehicle.name}
        </h3>

        {/* Quick specs */}
        <div className="mt-2 flex gap-3 text-xs text-white/40">
          {vehicle.specs?.engine && (
            <span className="line-clamp-1">{vehicle.specs.engine}</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-gold font-bold text-lg">{formattedPrice}</span>
            <span className="text-white/40 text-sm">/day</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold text-xs"
          >
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}
