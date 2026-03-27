import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { LOCATIONS, TRUST_STATS } from "@/lib/constants";
import { getFeaturedVehicles } from "@/lib/queries";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(6);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-24">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Tampa &bull; Miami &bull; Orlando
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight">
            Drive Your
            <br />
            <span className="text-gradient-gold">Dream Car</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Lamborghini, Rolls Royce, Ferrari, Porsche and more — delivered to
            your door across Florida. Experience the extraordinary.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fleet">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-8 py-6 hover:bg-gold-dark"
              >
                Browse Our Fleet
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-1 text-gold">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.googleRating}
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {TRUST_STATS.reviewCount}+ Google Reviews
              </span>
            </div>
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-1">
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
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.availability}
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Concierge Support
              </span>
            </div>
            <div className="flex flex-col items-center py-8 gap-2">
              <span className="text-2xl font-bold text-white">28+</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Exotic Vehicles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Our Collection
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Featured Vehicles
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              Hand-picked from our premium fleet. Each vehicle is meticulously
              maintained for an unparalleled driving experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle: any) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/fleet">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-semibold hover:bg-gold-dark"
              >
                View All Vehicles
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-white/5 bg-black/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Simple Process
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Car",
                description:
                  "Browse our fleet of exotic vehicles. Filter by brand, location, or price to find your perfect ride.",
              },
              {
                step: "02",
                title: "Book Online or Call",
                description:
                  "Reserve your vehicle in minutes. Choose your dates, pickup location, and confirm your booking.",
              },
              {
                step: "03",
                title: "We Deliver to You",
                description:
                  "Sit back while we bring your dream car directly to your door, hotel, or airport.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 mb-6">
                  <span className="text-gradient-gold text-2xl font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Drive Your{" "}
            <span className="text-gradient-gold">Dream Car?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Join 500+ satisfied customers who chose Tampa&apos;s #1 exotic car
            rental. Book today and experience luxury on your terms.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/fleet">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6"
              >
                Browse Fleet
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 text-lg px-10 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                {LOCATIONS.tampa.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Serving All of Florida
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Our Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["tampa", "miami", "orlando"] as const).map((key) => {
              const loc = LOCATIONS[key];
              return (
                <Link
                  key={key}
                  href={`/locations/${key}`}
                  className="group relative overflow-hidden rounded-lg border border-white/5 bg-card p-8 transition-all duration-300 hover:border-gold/20"
                >
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="h-8 w-8 text-gold mb-4" />
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-gold transition-colors">
                      {loc.name}
                    </h3>
                    <span className="mt-3 text-white/50">{loc.phone}</span>
                    <span className="mt-4 text-sm text-gold uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore Fleet &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
