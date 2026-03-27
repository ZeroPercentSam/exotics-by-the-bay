import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getVehicleBySlug,
  getAllVehicleSlugs,
  getRelatedVehicles,
} from "@/lib/queries";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generateVehicleSchema, generateBreadcrumbSchema } from "@/lib/schemas";
import {
  Phone,
  Gauge,
  Cog,
  Users,
  Zap,
  ArrowLeft,
  ChevronRight,
  Shield,
  Clock,
  CreditCard,
  Car,
} from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";

export const revalidate = 3600; // ISR: revalidate every hour

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Use direct fetch instead of Supabase client to avoid cookies in build
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vehicles?select=slug&status=eq.active`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  const vehicles = await res.json();
  return (vehicles || []).map((v: { slug: string }) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(vehicle.daily_rate);

  return {
    title: `${vehicle.name} Rental | ${price}/day`,
    description: `Rent the ${vehicle.name} in Tampa. ${vehicle.specs?.horsepower}HP, ${vehicle.specs?.engine}. Starting at ${price}/day. Book now or call for availability.`,
    openGraph: {
      images: vehicle.images?.[0] ? [vehicle.images[0]] : [],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const brandSlug = vehicle.brand?.slug || "";
  const relatedVehicles = await getRelatedVehicles(slug, brandSlug);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(vehicle.daily_rate);

  const specs = vehicle.specs || {};

  const specItems = [
    { label: "Engine", value: specs.engine, icon: Cog },
    { label: "Horsepower", value: specs.horsepower ? `${specs.horsepower} HP` : null, icon: Zap },
    { label: "Torque", value: specs.torque, icon: Gauge },
    { label: "Transmission", value: specs.transmission, icon: Cog },
    { label: "Drivetrain", value: specs.drivetrain, icon: Car },
    { label: "Seats", value: specs.seats, icon: Users },
    { label: "Top Speed", value: specs.top_speed, icon: Gauge },
    { label: "0-60 MPH", value: specs.zero_to_sixty, icon: Zap },
  ].filter((s) => s.value);

  const vehicleSchema = generateVehicleSchema(vehicle);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://exoticsbythebay.co" },
    { name: "Fleet", url: "https://exoticsbythebay.co/fleet" },
    { name: vehicle.name, url: `https://exoticsbythebay.co/fleet/${vehicle.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div className="pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/fleet"
            className="inline-flex items-center text-sm text-white/40 hover:text-gold transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fleet
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <VehicleGallery
              images={vehicle.images || []}
              vehicleName={vehicle.name}
            />

            {/* Vehicle Info */}
            <div className="flex flex-col">
              {/* Title + Price */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="border-gold/30 text-gold text-[10px] uppercase tracking-wider"
                  >
                    {vehicle.category}
                  </Badge>
                  {vehicle.brand && (
                    <Badge
                      variant="outline"
                      className="border-white/10 text-white/60 text-[10px] uppercase tracking-wider"
                    >
                      {vehicle.brand.name}
                    </Badge>
                  )}
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  {vehicle.name}
                </h1>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-gold text-3xl font-bold">
                    {formattedPrice}
                  </span>
                  <span className="text-white/40 text-lg">/day</span>
                </div>
              </div>

              <Separator className="my-6 bg-white/5" />

              {/* Description */}
              <p className="text-white/60 leading-relaxed">
                {vehicle.description}
              </p>

              <Separator className="my-6 bg-white/5" />

              {/* Specs Grid */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {specItems.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                    >
                      <spec.icon className="h-4 w-4 text-gold shrink-0" />
                      <div>
                        <p className="text-[11px] text-white/40 uppercase tracking-wider">
                          {spec.label}
                        </p>
                        <p className="text-sm font-medium text-white">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6 bg-white/5" />

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${LOCATIONS.tampa.phoneRaw}`}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    className="w-full gold-shimmer bg-gold text-black font-bold text-lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                </a>
                <a
                  href={`tel:${LOCATIONS.tampa.phoneRaw}`}
                  className="flex-1"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5 text-lg"
                  >
                    Call {LOCATIONS.tampa.phone}
                  </Button>
                </a>
              </div>

              {/* Requirements */}
              <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Rental Requirements
                </h3>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gold" />
                    Valid driver&apos;s license (25+ years old)
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gold" />
                    Credit card for security deposit
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gold" />
                    Proof of full-coverage insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    48-hour advance booking recommended
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-white">
                You May Also Like
              </h2>
              <Link
                href="/fleet"
                className="text-sm text-gold hover:text-gold-light transition-colors flex items-center"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map((v: any) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
