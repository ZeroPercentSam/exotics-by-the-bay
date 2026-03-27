import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { Phone, PlaneTakeoff, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tampa Airport Exotic Car Rentals | Exotics By The Bay",
  description:
    "Exotic car rental with Tampa International Airport pickup and delivery. Skip the rental counter — we bring the Lamborghini, Rolls Royce, or Ferrari to you at TPA.",
};

export default function AirportRentalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
            <PlaneTakeoff className="h-4 w-4" />
            Airport Delivery
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Tampa Airport{" "}
            <span className="text-gradient-gold">Exotic Car Rentals</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Land at Tampa International Airport and step into a Lamborghini. We
            deliver your exotic rental directly to TPA -- no rental counters, no
            shuttle buses, no waiting.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Skip the Counter. Drive the Dream.
              </h2>
              <div className="space-y-4 text-white/60 text-lg">
                <p>
                  Forget the traditional rental car experience. When you book
                  with Exotics By The Bay, we coordinate your exotic car delivery
                  to match your flight arrival. A member of our team meets you at
                  Tampa International Airport with your vehicle ready to go.
                </p>
                <p>
                  Our airport rental service includes a full vehicle walkthrough,
                  adjusting seats and mirrors to your preference, and ensuring
                  you are comfortable behind the wheel before you drive off.
                </p>
                <p>
                  When your trip is over, simply let us know your departure
                  details and we will pick the car up from you at the airport.
                  Seamless from arrival to departure.
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-white/60">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Complimentary airport delivery and pickup at TPA
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Timed to your flight arrival for zero wait
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Full vehicle walkthrough included
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  24/7 roadside assistance throughout your rental
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Book Airport Delivery
              </h3>
              <p className="text-white/50 mb-6">
                Share your flight details and preferred vehicle. We handle the
                rest -- your exotic car will be waiting when you land.
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
            Your Exotic Awaits at the Terminal
          </h2>
          <p className="text-white/50 mb-8">
            Call now to reserve your exotic car with complimentary Tampa Airport
            delivery. Same-day bookings available.
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
