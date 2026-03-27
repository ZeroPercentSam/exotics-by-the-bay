import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { Phone, Anchor, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yacht Rentals | Exotics By The Bay",
  description:
    "Luxury yacht rentals in Tampa Bay, Miami & Orlando. From intimate day cruises to full-day charters. Contact Exotics By The Bay to book your yacht experience.",
};

export default function YachtsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
            <Anchor className="h-4 w-4" />
            Luxury Marine
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Yacht{" "}
            <span className="text-gradient-gold">Rentals</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Take your luxury experience to the water. From Tampa Bay sunsets to
            Miami coastline cruises, our yacht charters deliver an unforgettable
            day on the water.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Luxury on the Water
              </h2>
              <div className="space-y-4 text-white/60 text-lg">
                <p>
                  Complete your Florida luxury experience with a yacht charter.
                  Whether it&apos;s a sunset cruise through Tampa Bay, a day trip
                  along the Gulf Coast, or a celebration on the water in Miami,
                  we connect you with premium vessels and experienced captains.
                </p>
                <p>
                  Our yacht options range from sleek day boats perfect for small
                  groups to full-size luxury yachts ideal for corporate events,
                  birthdays, and special celebrations.
                </p>
                <p>
                  Pair a yacht charter with an exotic car rental for the
                  ultimate land-and-sea luxury package.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Book a Yacht Charter
              </h3>
              <p className="text-white/50 mb-6">
                Tell us your occasion, group size, and preferred date. Our team
                will match you with the perfect vessel and handle every detail.
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
            Set Sail in Style
          </h2>
          <p className="text-white/50 mb-8">
            Contact our concierge team to plan your yacht charter. Available in
            Tampa Bay, Miami, and along the Florida coast.
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
