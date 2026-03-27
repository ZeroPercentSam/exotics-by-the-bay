import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicles } from "@/lib/queries";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { Button } from "@/components/ui/button";
import { LOCATIONS, SITE_EMAIL } from "@/lib/constants";
import { Phone, MapPin, Mail, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";

type CityKey = keyof typeof LOCATIONS;

const VALID_CITIES: CityKey[] = ["tampa", "miami", "orlando"];

export function generateStaticParams() {
  return [{ city: "tampa" }, { city: "miami" }, { city: "orlando" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = LOCATIONS[city as CityKey];
  if (!location) return {};

  return {
    title: `Exotic Car Rental ${location.name} | Exotics By The Bay`,
    description: `Rent luxury and exotic cars in ${location.name}, Florida. Lamborghini, Rolls Royce, Ferrari & more. Delivery available across ${location.name}. Call ${location.phone}.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  if (!VALID_CITIES.includes(city as CityKey)) {
    notFound();
  }

  const location = LOCATIONS[city as CityKey];
  const vehicles = await getVehicles({ city: city });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            {location.name}, Florida
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Exotic Car Rental in{" "}
            <span className="text-gradient-gold">{location.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Experience the thrill of driving a luxury exotic car through the
            streets of {location.name}. Hand-delivered to your door, hotel, or
            airport.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${location.phoneRaw}`}>
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call {location.phone}
              </Button>
            </a>
            <Link href="/fleet">
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                Browse Full Fleet
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between pb-6 border-b border-white/5">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Available in {location.name}
            </h2>
            <p className="text-sm text-white/40">
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
            </p>
          </div>

          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle: any) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-white/50 text-lg">
                No vehicles currently listed for {location.name}. Call us for
                availability.
              </p>
              <a href={`tel:${location.phoneRaw}`}>
                <Button
                  size="lg"
                  className="mt-6 gold-shimmer bg-gold text-black font-bold"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call {location.phone}
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-gold text-sm mb-6">
                <Truck className="h-4 w-4" />
                Free Delivery Available
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                We Deliver Across{" "}
                <span className="text-gradient-gold">{location.name}</span>
              </h2>
              <p className="text-white/50 text-lg mb-6">
                Skip the rental counter. We bring the car directly to you --
                whether that&apos;s your home, hotel, office, or the airport.
                White-glove delivery and pickup across the entire{" "}
                {location.name} metro area.
              </p>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Complimentary delivery within {location.name}
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Airport pickup & drop-off available
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  24/7 roadside assistance included
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  Flexible pickup and return scheduling
                </li>
              </ul>
            </div>

            {/* Location Info Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="font-heading text-xl font-bold text-white mb-6">
                {location.name} Location
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/40 text-sm mb-1">Phone</p>
                    <a
                      href={`tel:${location.phoneRaw}`}
                      className="text-white hover:text-gold transition-colors font-medium"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
                {"address" in location && location.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-sm mb-1">Address</p>
                      <p className="text-white/80">{location.address}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/40 text-sm mb-1">Email</p>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="text-white hover:text-gold transition-colors"
                    >
                      {SITE_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5 bg-gradient-to-r from-gold/5 via-transparent to-gold/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Ready to Drive Something Extraordinary?
          </h2>
          <p className="text-white/50 mb-8">
            Call our {location.name} team to reserve your dream car today.
            Same-day delivery available.
          </p>
          <a href={`tel:${location.phoneRaw}`}>
            <Button
              size="lg"
              className="gold-shimmer bg-gold text-black font-bold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call {location.phone}
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
