import { Suspense } from "react";
import type { Metadata } from "next";
import { getVehicles, getBrands } from "@/lib/queries";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleFilters } from "@/components/vehicles/VehicleFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exotic Car Fleet | Lamborghini, Rolls Royce, Ferrari & More",
  description:
    "Browse our full fleet of exotic and luxury vehicles available for rent in Tampa, Miami & Orlando. Lamborghini, Rolls Royce, Porsche, Ferrari, McLaren and more.",
};

interface FleetPageProps {
  searchParams: Promise<{
    brand?: string;
    city?: string;
    price?: string;
    sort?: string;
  }>;
}

export default async function FleetPage({ searchParams }: FleetPageProps) {
  const params = await searchParams;

  // Parse price filter
  let priceMin: number | undefined;
  let priceMax: number | undefined;
  if (params.price) {
    const [min, max] = params.price.split("-").map(Number);
    priceMin = min;
    priceMax = max;
  }

  const [vehicles, brands] = await Promise.all([
    getVehicles({
      brand: params.brand,
      city: params.city,
      priceMin,
      priceMax,
    }),
    getBrands(),
  ]);

  return (
    <>
      {/* Hero Banner */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Our Collection
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Exotic Fleet
          </h1>
          <p className="mt-4 max-w-2xl text-white/50 text-lg">
            Hand-picked exotic and luxury vehicles, meticulously maintained for
            an unparalleled driving experience. Available across Tampa, Miami &
            Orlando.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <Suspense fallback={<Skeleton className="h-10 w-full sm:w-[500px]" />}>
              <VehicleFilters brands={brands} />
            </Suspense>
            <p className="text-sm text-white/40">
              {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Vehicle Grid */}
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle: any) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-white/50 text-lg">
                No vehicles match your filters.
              </p>
              <Link href="/fleet">
                <Button
                  variant="outline"
                  className="mt-4 border-gold/30 text-gold hover:bg-gold/10"
                >
                  View All Vehicles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5 bg-gradient-to-r from-gold/5 via-transparent to-gold/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Don&apos;t See What You&apos;re Looking For?
          </h2>
          <p className="text-white/50 mb-8">
            Our fleet is always growing. Call us to discuss custom requests or
            upcoming additions.
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
