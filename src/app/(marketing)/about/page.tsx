import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Star,
  MapPin,
  Clock,
  Car,
  Truck,
  Headphones,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { LOCATIONS, SITE_NAME, TRUST_STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Learn about Exotics By The Bay — Tampa's premier exotic car rental serving Tampa, Miami, and Orlando with a hand-picked fleet of luxury vehicles and white-glove service.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Our Story
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
            About{" "}
            <span className="text-gradient-gold">Exotics By The Bay</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Tampa&apos;s premier exotic car rental. We bring the world&apos;s
            most extraordinary vehicles to your doorstep across Florida.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                Who We Are
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-8">
                Born From a Passion for{" "}
                <span className="text-gradient-gold">Exotic Cars</span>
              </h2>
              <div className="space-y-6 text-white/60 leading-relaxed">
                <p>
                  Exotics By The Bay was founded with a single mission: to make
                  the thrill of driving the world&apos;s most exclusive vehicles
                  accessible to everyone. What started as a passion for exotic
                  automobiles has grown into Florida&apos;s most trusted luxury
                  car rental experience.
                </p>
                <p>
                  Serving Tampa, Miami, and Orlando, we&apos;ve built our
                  reputation on three pillars: an impeccably maintained fleet of
                  hand-picked vehicles, unmatched customer service, and
                  relentless attention to detail. Every car in our collection is
                  selected for its performance, presence, and the unforgettable
                  experience it delivers.
                </p>
                <p>
                  Whether you&apos;re celebrating a milestone, making a statement
                  at a business event, or simply fulfilling a lifelong dream, we
                  ensure every moment behind the wheel is extraordinary. Our
                  white-glove concierge service means we handle every detail
                  &mdash; from doorstep delivery to 24/7 support &mdash; so you
                  can focus on the drive.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-lg border border-white/5 bg-card overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <Car className="h-16 w-16 text-gold/30 mx-auto mb-4" />
                  <p className="text-white/30 text-sm uppercase tracking-wider">
                    Premium Fleet Showroom
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold/10 border border-gold/20 rounded-lg p-6 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">
                  {TRUST_STATS.reviewCount}+
                </p>
                <p className="text-white/60 text-sm">5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-white">28+</span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Exotic Vehicles
              </span>
            </div>
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.locationCount}
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Florida Locations
              </span>
            </div>
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-gold fill-current" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.reviewCount}+
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                5-Star Reviews
              </span>
            </div>
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.availability}
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Concierge Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              The Difference
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              We go beyond rentals. Every detail is designed to deliver an
              unforgettable luxury experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Car,
                title: "Premium Fleet",
                description:
                  "Hand-picked Lamborghinis, Ferraris, Rolls Royces, and more — each meticulously maintained and detailed before every rental.",
              },
              {
                icon: Truck,
                title: "Doorstep Delivery",
                description:
                  "We bring your dream car directly to your home, hotel, airport, or event. White-glove delivery across all of Florida.",
              },
              {
                icon: Headphones,
                title: "24/7 Concierge",
                description:
                  "Our dedicated concierge team is available around the clock to assist with bookings, itineraries, and anything you need.",
              },
              {
                icon: DollarSign,
                title: "Transparent Pricing",
                description:
                  "No hidden fees, no surprises. Our pricing is clear and competitive with insurance and delivery options upfront.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-lg border border-white/5 bg-card p-8 transition-all duration-300 hover:border-gold/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gold/20 mb-6">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
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
