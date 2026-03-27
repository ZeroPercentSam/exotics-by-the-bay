export const SITE_NAME = "Exotics By The Bay";
export const SITE_TAGLINE = "Tampa's Premier Exotic Car Rental";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://exoticsbythebay.co";
export const SITE_EMAIL = "info@exoticsbythebay.co";

export const LOCATIONS = {
  tampa: {
    name: "Tampa",
    phone: "(813) 403-8213",
    phoneRaw: "+18134038213",
    address: "2502 North Rocky Point Drive, Tampa, FL 33607",
    city: "Tampa",
    state: "FL",
    zip: "33607",
  },
  miami: {
    name: "Miami",
    phone: "(305) 803-0957",
    phoneRaw: "+13058030957",
    city: "Miami",
    state: "FL",
  },
  orlando: {
    name: "Orlando",
    phone: "(813) 403-8213",
    phoneRaw: "+18134038213",
    city: "Orlando",
    state: "FL",
  },
} as const;

export const NAV_LINKS = [
  { label: "Fleet", href: "/fleet" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/exoticsbythebay/",
  facebook: "https://www.facebook.com/exoticsbythebay/",
  youtube: "https://www.youtube.com/@exoticsbythebay",
} as const;

export const TRUST_STATS = {
  googleRating: 5.0,
  reviewCount: 63,
  locationCount: 3,
  availability: "24/7",
} as const;
