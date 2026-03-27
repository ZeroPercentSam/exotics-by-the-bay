"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
  images: string[];
  vehicleName: string;
}

export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-lg bg-gray-900 flex items-center justify-center">
        <span className="text-white/20 text-sm uppercase tracking-wider">
          No images available
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={images[selectedIndex]}
          alt={`${vehicleName} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={selectedIndex === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                i === selectedIndex
                  ? "border-gold"
                  : "border-transparent opacity-50 hover:opacity-80"
              )}
            >
              <Image
                src={img}
                alt={`${vehicleName} thumbnail ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
