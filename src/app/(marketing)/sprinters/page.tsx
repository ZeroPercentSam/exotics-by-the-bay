import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { Phone, Users, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sprinter & Limo Rentals | Exotics By The Bay",
  description:
    "Luxury Sprinter van and limousine rentals in Tampa, Miami & Orlando. Perfect for group events, bachelor parties, corporate transportation. Call Exotics By The Bay.",
};

export default function SprintersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
            <Users className="h-4 w-4" />
            Group Transportation
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Sprinter & Limo{" "}
            <span className="text-gradient-gold">Rentals</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Travel in style with your crew. Our luxury Sprinter vans and
            limousines are perfect for bachelor and bachelorette parties,
            corporate events, game days, and nights out on the town.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Luxury Group Transportation
              </h2>
              <div className="space-y-4 text-white/60 text-lg">
                <p>
                  When you need to move your group in style, our fleet of luxury
                  Sprinter vans and limousines delivers first-class comfort with
                  a professional chauffeur at the wheel.
                </p>
                <p>
                  Our vehicles feature premium leather interiors, ambient
                  lighting, entertainment systems, and refreshment bars. Whether
                  it&apos;s a 6-person executive transfer or a 14-passenger party
                  bus, we have the right vehicle for your event.
                </p>
                <p>
                  Popular for bachelor and bachelorette parties, corporate
                  outings, sporting events, concert transportation, and airport
                  group transfers across Tampa, Miami, and Orlando.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Reserve a Sprinter or Limo
              </h3>
              <p className="text-white/50 mb-6">
                Tell us your group size, destination, and date. We will match you
                with the perfect vehicle and a professional chauffeur.
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
            Roll Out With Your Crew
          </h2>
          <p className="text-white/50 mb-8">
            Book a luxury Sprinter or limousine for your next event. Chauffeur
            service available across Tampa, Miami, and Orlando.
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
