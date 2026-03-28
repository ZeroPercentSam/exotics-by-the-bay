import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { LOCATIONS, TRUST_STATS } from "@/lib/constants";
import { getFeaturedVehicles } from "@/lib/queries";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { generateAutoRentalSchema } from "@/lib/schemas";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CountUp } from "@/components/animations/CountUp";

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles(6);
  const autoRentalSchema = generateAutoRentalSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRentalSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Mobile hero background */}
        <Image
          src="/hero/hero-mobile.webp"
          alt="Exotics By The Bay fleet lineup at sunset"
          fill
          priority
          className="object-cover object-center sm:hidden"
          sizes="100vw"
        />
        {/* Desktop hero background */}
        <Image
          src="/hero/hero-desktop.webp"
          alt="Exotics By The Bay fleet lineup at sunset"
          fill
          priority
          className="object-cover object-center hidden sm:block"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-8 sm:pt-24">
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

          {/* Mobile scroll indicator (inline to avoid bottom bar overlap) */}
          <div className="mt-8 mb-16 flex sm:hidden flex-col items-center gap-2 text-white/30 animate-bounce">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>

        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            <ScrollReveal delay={0} className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-1 text-gold">
                <Star className="h-5 w-5 fill-current" />
                <CountUp end={5} duration={1.5} suffix=".0" className="text-2xl font-bold text-white" />
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                <CountUp end={TRUST_STATS.reviewCount} duration={2} suffix="+" className="" /> Google Reviews
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-gold" />
                <CountUp end={TRUST_STATS.locationCount} duration={1.5} className="text-2xl font-bold text-white" />
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Florida Locations
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="flex flex-col items-center py-8 gap-2">
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gold" />
                <span className="text-2xl font-bold text-white">
                  {TRUST_STATS.availability}
                </span>
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Concierge Support
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="flex flex-col items-center py-8 gap-2">
              <CountUp end={28} duration={2} suffix="+" className="text-2xl font-bold text-white" />
              <span className="text-xs text-white/40 uppercase tracking-wider">
                Exotic Vehicles
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
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
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {featuredVehicles.map((vehicle: any) => (
              <StaggerItem key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </StaggerItem>
            ))}
          </StaggerChildren>

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
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Simple Process
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              How It Works
            </h2>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12" staggerDelay={0.15}>
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
              <StaggerItem key={item.step} className="text-center">
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
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <ScrollReveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
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
        </ScrollReveal>
      </section>

      {/* Locations */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Serving All of Florida
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Our Locations
            </h2>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {(["tampa", "miami", "orlando"] as const).map((key) => {
              const loc = LOCATIONS[key];
              return (
                <StaggerItem key={key}>
                  <Link
                    href={`/locations/${key}`}
                    className="group relative overflow-hidden rounded-lg border border-white/5 bg-card p-8 transition-all duration-300 hover:border-gold/20 block"
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
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
