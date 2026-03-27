import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { Phone, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wedding & Prom Car Rentals | Exotics By The Bay",
  description:
    "Make your special day unforgettable with a luxury exotic car. Wedding getaway cars, prom arrivals, and special occasion rentals in Tampa, Miami & Orlando.",
};

export default function WeddingRentalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
            <Heart className="h-4 w-4" />
            Special Occasions
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Wedding & Prom{" "}
            <span className="text-gradient-gold">Rentals</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Make your arrival as stunning as the occasion. From Rolls Royce
            wedding getaway cars to Lamborghini prom arrivals, create memories
            that last a lifetime.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Arrive Like Royalty
              </h2>
              <div className="space-y-4 text-white/60 text-lg">
                <p>
                  Your special day deserves a special ride. Picture pulling up to
                  your wedding venue in a pristine Rolls Royce, or making the
                  grand prom entrance in a Lamborghini Huracan. These are the
                  moments that become the highlight of every photo album.
                </p>
                <p>
                  We offer dedicated wedding and special occasion packages with
                  decorated vehicles, professional chauffeur service, and
                  flexible scheduling to match your timeline. Our team
                  coordinates directly with your wedding planner or event
                  organizer for seamless logistics.
                </p>
                <p>
                  Popular choices include the Rolls Royce Cullinan for elegant
                  wedding exits, the Lamborghini Urus for bridal party
                  transportation, and the Ferrari for unforgettable prom
                  arrivals.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Plan Your Luxury Arrival
              </h3>
              <p className="text-white/50 mb-6">
                Share your event date, venue, and vehicle preferences. We will
                create a custom package for your wedding, prom, quinceañera, or
                special celebration.
              </p>
              <div className="space-y-4">
                <a href={`tel:${LOCATIONS.tampa.phoneRaw}`} className="block">
                  <Button
                    size="lg"
                    className="w-full gold-shimmer bg-gold text-black font-bold"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call {LOCATIONS.tampa.phone}
                  </Button>
                </a>
                <Link href="/fleet" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-gold/30 text-gold hover:bg-gold/10"
                  >
                    Browse Exotic Fleet
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5 bg-gradient-to-r from-gold/5 via-transparent to-gold/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Make It Unforgettable
          </h2>
          <p className="text-white/50 mb-8">
            Reserve your dream car for your wedding, prom, or special occasion.
            Book early to secure your preferred vehicle and date.
          </p>
          <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
            <Button
              size="lg"
              className="gold-shimmer bg-gold text-black font-bold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call {LOCATIONS.tampa.phone}
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
