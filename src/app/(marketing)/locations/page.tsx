import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Locations | Exotic Car Rental Tampa, Miami & Orlando",
  description:
    "Rent exotic and luxury cars across Florida. Exotics By The Bay serves Tampa, Miami, and Orlando with doorstep delivery and 24/7 concierge support.",
};

const CITY_KEYS = ["tampa", "miami", "orlando"] as const;

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Serving Florida
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
            Our <span className="text-gradient-gold">Locations</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Exotic car delivery across Tampa, Miami, and Orlando. White-glove
            service, wherever you are in Florida.
          </p>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CITY_KEYS.map((key) => {
              const location = LOCATIONS[key];
              return (
                <div
                  key={key}
                  className="group rounded-lg border border-white/5 bg-card p-8 transition-all duration-300 hover:border-gold/20"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/20 mb-6">
                    <MapPin className="h-6 w-6 text-gold" />
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                    {location.name}
                  </h2>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-white/60">
                      <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                      <a
                        href={`tel:${location.phoneRaw}`}
                        className="hover:text-gold transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>

                    {"address" in location && location.address && (
                      <div className="flex items-start gap-2 text-white/60">
                        <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{location.address}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/locations/${key}`}>
                    <Button
                      variant="outline"
                      className="border-gold/30 text-gold hover:bg-gold/10 w-full"
                    >
                      Explore Fleet
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Experience{" "}
            <span className="text-gradient-gold">Luxury?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Browse our hand-picked collection of exotic vehicles and find the
            perfect car for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fleet">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6"
              >
                Browse Fleet
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 text-lg px-10 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
