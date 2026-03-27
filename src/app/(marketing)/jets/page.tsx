import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { Phone, Plane, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Jet Charters | Exotics By The Bay",
  description:
    "Luxury private jet charters in Tampa, Miami & Orlando. Complete your exotic experience with private aviation. Contact Exotics By The Bay for charter inquiries.",
};

export default function JetsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
            <Plane className="h-4 w-4" />
            Private Aviation
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Private Jet{" "}
            <span className="text-gradient-gold">Charters</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Elevate your travel experience from the ground to the sky. Through
            our partnerships with premier charter operators, we offer seamless
            access to private jet travel across Florida and beyond.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                The Complete Luxury Experience
              </h2>
              <div className="space-y-4 text-white/60 text-lg">
                <p>
                  Why stop at an exotic car? Pair your rental with a private jet
                  charter for the ultimate luxury experience. Arrive at a
                  private terminal, step off the plane, and into the driver&apos;s
                  seat of a Lamborghini or Rolls Royce.
                </p>
                <p>
                  We work with trusted charter operators to arrange flights
                  tailored to your schedule. Whether you need a light jet for a
                  quick hop to Miami or a heavy jet for a cross-country trip, we
                  can coordinate every detail.
                </p>
                <p>
                  From corporate travel to special occasions, our concierge team
                  handles the logistics so you can focus on the experience.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-center">
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Inquire About Private Jet Charters
              </h3>
              <p className="text-white/50 mb-6">
                Our concierge team will coordinate with our charter partners to
                provide you with options and pricing tailored to your needs.
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
            Ready to Fly Private?
          </h2>
          <p className="text-white/50 mb-8">
            Contact us to discuss your private jet charter needs. We handle
            everything from booking to ground transportation.
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
