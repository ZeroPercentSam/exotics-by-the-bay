"use client";

import { Phone, Car } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import Link from "next/link";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
      <div className="grid grid-cols-2 divide-x divide-white/10">
        <a
          href={`tel:${LOCATIONS.tampa.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-gold active:bg-gold/10 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
        <Link
          href="/fleet"
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-gold text-black active:bg-gold-dark transition-colors"
        >
          <Car className="h-4 w-4" />
          Browse Fleet
        </Link>
      </div>
    </div>
  );
}
