import { SITE_URL } from "@/lib/constants";

export function generateAutoRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Exotics By The Bay",
    url: "https://exoticsbythebay.co",
    logo: "https://exoticsbythebay.co/logo.png",
    description:
      "Tampa's premier exotic car rental. Lamborghini, Rolls Royce, Ferrari, Porsche and more delivered across Florida.",
    telephone: "+18134038213",
    email: "info@exoticsbythebay.co",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2502 North Rocky Point Drive",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33607",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.9763,
      longitude: -82.5336,
    },
    areaServed: [
      { "@type": "City", name: "Tampa", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Miami", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Orlando", containedInPlace: { "@type": "State", name: "Florida" } },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "63",
      bestRating: "5",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$$$",
  };
}

export function generateVehicleSchema(vehicle: {
  name: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  daily_rate: number;
  description?: string;
  images?: string[];
  specs?: any;
  brand?: { name: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.name,
    brand: {
      "@type": "Brand",
      name: vehicle.brand?.name || vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    description: vehicle.description,
    image: vehicle.images?.[0],
    url: `https://exoticsbythebay.co/fleet/${vehicle.slug}`,
    vehicleEngine: vehicle.specs?.engine
      ? { "@type": "EngineSpecification", name: vehicle.specs.engine }
      : undefined,
    driveWheelConfiguration: vehicle.specs?.drivetrain,
    seatingCapacity: vehicle.specs?.seats,
    offers: {
      "@type": "Offer",
      price: vehicle.daily_rate,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
    },
  };
}

export function generateLocalBusinessSchema(location: {
  name: string;
  phone: string;
  address?: string;
  city: string;
  state: string;
  zip?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Exotics By The Bay - ${location.name}`,
    telephone: location.phone,
    address: location.address
      ? {
          "@type": "PostalAddress",
          streetAddress: location.address,
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.zip,
          addressCountry: "US",
        }
      : undefined,
    url: `https://exoticsbythebay.co/locations/${location.name.toLowerCase()}`,
    parentOrganization: {
      "@type": "Organization",
      name: "Exotics By The Bay",
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
