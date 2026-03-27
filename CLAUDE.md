# Exotics By The Bay — Project Handoff Document

## Project Overview

Rebuilding **exoticsbythebay.co** from Shopify to a custom Next.js website for a luxury exotic car rental company operating in **Tampa, Miami, and Orlando, FL**. Client uses GoHighLevel (GHL) as CRM and HQ Rentals for booking.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| Language | TypeScript | 5.x |
| Database | Supabase PostgreSQL | Project: `cokdltrfrspaapwzpntu` |
| Auth | Supabase Auth | Email/password |
| Hosting | Vercel | Project: `exotics-by-the-bay` |
| UI | Tailwind CSS v4 + shadcn/ui | Latest |
| Animations | Framer Motion + GSAP | 12.x / 3.x |
| CRM | GoHighLevel API v2 | **Not yet integrated** |
| Booking | HQ Rentals | **Not yet integrated** |

## Current Status (Phases 0-7 Complete)

### What's Built (9 commits, 48+ pages)

**Public Pages:**
- Homepage with scroll-reveal animations, CountUp stats, featured vehicles from Supabase
- Fleet listing (`/fleet`) with brand/city/price filters
- 15 vehicle detail pages (`/fleet/[slug]`) with image gallery, specs grid, CTAs, related vehicles
- About, Contact (form), FAQ (accordion with 10 items)
- 3 Location pages (`/locations/[city]`) with city-filtered fleet
- Locations index (`/locations`)
- Blog listing + detail (`/blog`, `/blog/[slug]`)
- 5 Service pages: Jets, Yachts, Sprinters, Wedding Rentals, Airport Rentals
- Terms of Service, Privacy Policy
- Custom 404 and error pages

**Auth & Dashboards:**
- Login, Signup, Forgot Password pages
- Auth middleware protecting `/dashboard` and `/admin` routes
- Customer Dashboard: overview, bookings list, profile management
- Admin Dashboard: overview stats, fleet management (table + add vehicle form), bookings with filters, customer list

**SEO:**
- Dynamic `sitemap.xml` with all vehicles and pages
- `robots.txt` blocking /admin, /dashboard, /api
- JSON-LD schema markup (AutoRental, Car, Breadcrumb)
- 45+ 301 redirects from all old Shopify URLs
- Meta tags with `generateMetadata` on every page
- Google Analytics 4 (G-13FX3J1FJ0)

**Design System:**
- Dark luxury theme: black background, gold `#fbdd2f` accents
- Typography: Inter (body) + Playfair Display (headings via `font-heading`)
- CSS classes: `text-gradient-gold`, `gold-shimmer` (hover animation on CTAs)
- 18 shadcn/ui components installed
- Framer Motion: ScrollReveal, StaggerChildren/StaggerItem, CountUp

### What's NOT Built Yet (Phase 8 — Deferred)

These are blocked on **client-provided credentials**:

1. **HQ Rentals Booking Widget** — Needs tenant ID. Plan: iframe embed on `/booking` and vehicle detail pages
2. **GoHighLevel CRM Sync** — Needs API key + location ID. Plan: sync contact forms, signups, quote requests, newsletter to GHL
3. **Payment Processor** — Client hasn't chosen one yet. Abstract `PaymentProvider` interface ready
4. **Insurance Verification** — Client hasn't chosen vendor. Document upload to Supabase Storage is built

### Other Remaining Work

- **Blog content migration** — 64 blog posts from Shopify need to be scraped and inserted into `blog_posts` table
- **Admin fleet edit page** — `/admin/fleet/[id]/edit` not yet built (add vehicle form exists)
- **Admin blog management** — `/admin/blog` CRUD pages not yet built
- **Image optimization** — Vehicle images currently served from Shopify CDN; should be migrated to Supabase Storage
- **Custom domain** — DNS cutover to exoticsbythebay.co happens after client approval
- **Desktop design polish** — Use `frontend-design` skill for final visual pass on each page

## Database Schema (Supabase)

**Project ID:** `cokdltrfrspaapwzpntu`
**Region:** us-east-1
**URL:** `https://cokdltrfrspaapwzpntu.supabase.co`

### Tables

| Table | Purpose | Row Count |
|-------|---------|-----------|
| `locations` | Tampa, Miami, Orlando | 3 |
| `brands` | Vehicle brands (Lamborghini, Porsche, etc.) | 14 |
| `vehicles` | Full vehicle records with specs, images, pricing | 15 |
| `vehicle_locations` | Many-to-many vehicle↔location | 15 |
| `user_profiles` | Extends auth.users with role, license, insurance | 0 |
| `bookings` | Rental bookings with pricing breakdown | 0 |
| `leads` | Contact form / quote request submissions | 0 |
| `blog_posts` | Blog content (title, slug, content, status) | 0 |
| `reviews` | Cached Google reviews | 0 |
| `site_settings` | Key-value config | 7 |

### RLS Policies
- Vehicles/locations/brands/reviews: publicly readable
- Blog posts: publicly readable when `status = 'published'`
- Admin: full CRUD on all tables (checked via `user_profiles.role = 'admin'`)
- Customers: read own profile/bookings only
- Leads: anyone can insert (contact forms)

### Key Enums
- `vehicle_category`: exotic, luxury, muscle, suv, sedan, convertible
- `vehicle_status`: active, inactive, maintenance
- `booking_status`: pending, confirmed, active, completed, cancelled
- `user_role`: customer, admin
- `blog_status`: draft, published, archived

## Directory Structure

```
src/
  app/
    (marketing)/       # Public pages with Header/Footer layout
      page.tsx         # Homepage
      fleet/           # Fleet listing + [slug] detail
      locations/       # Index + [city] dynamic
      blog/            # Listing + [slug] detail
      about/, contact/, faq/, terms/, privacy/
      jets/, yachts/, sprinters/, wedding-rentals/, airport-rentals/
    (auth)/            # Login, signup, forgot-password (no Header/Footer)
    (dashboard)/       # Customer dashboard (auth required)
    (admin)/           # Admin dashboard (admin role required)
    api/auth/callback/ # Supabase auth callback
    layout.tsx         # Root layout (fonts, GA4)
    globals.css        # Design system (colors, animations)
    sitemap.ts, robots.ts, not-found.tsx, error.tsx
  components/
    ui/                # 18 shadcn/ui components
    layout/            # Header, Footer, MobileBottomBar
    vehicles/          # VehicleCard, VehicleFilters, VehicleGallery
    animations/        # ScrollReveal, StaggerChildren, CountUp
  lib/
    constants.ts       # LOCATIONS, NAV_LINKS, SOCIAL_LINKS, TRUST_STATS
    queries.ts         # Supabase query functions (getVehicles, getFeaturedVehicles, etc.)
    schemas.ts         # JSON-LD schema generators
    utils.ts           # cn() utility
    supabase/          # client.ts, server.ts, middleware.ts
  middleware.ts        # Auth session refresh + route protection
scripts/
  scrape-vehicles.ts   # Vehicle seed data from Shopify
```

## Environment Variables

```env
# Required (set in .env.local and Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://cokdltrfrspaapwzpntu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  (in .env.local)
NEXT_PUBLIC_SITE_URL=https://exoticsbythebay.co

# Not yet configured (need client credentials)
# SUPABASE_SERVICE_ROLE_KEY=
# GHL_API_KEY=
# GHL_LOCATION_ID=
# HQ_RENTALS_TENANT_ID=
# HQ_RENTALS_API_KEY=
# STRIPE_SECRET_KEY= (or other payment processor)
```

## Key Design Decisions

1. **Always-dark theme** — No light mode. `:root` CSS vars set to dark colors directly
2. **Shopify CDN images** — Vehicle images still point to `cdn.shopify.com`. Next.js `remotePatterns` configured
3. **Server components by default** — Only forms, galleries, filters, and animation wrappers are client components
4. **shadcn/ui Button has NO `asChild` prop** — Use `<Link href="..."><Button>text</Button></Link>` pattern
5. **Middleware uses `@supabase/ssr`** — Session refresh via `updateSession` in `src/lib/supabase/middleware.ts`

## Git History

```
73ad9b3 Initialize Next.js 15 project
f958b41 Add design system, layout shell, and placeholder homepage
842c03c Add vehicle data scraping script and seed Supabase database
172d9d0 Add Fleet pages and Homepage with real Supabase data
f1abc63 Add all remaining public pages (Phase 3 complete)
b622911 Add auth system, customer dashboard, and admin dashboard
894cf40 Add SEO infrastructure: sitemap, robots, schema, redirects
7fcb508 Add animations, custom error pages, and final polish
4a9386a Add blog pages, locations index, and Google Analytics 4
```

## Commands

```bash
npm run dev        # Start dev server on port 3000
npm run build      # Production build
npm run lint       # ESLint
npx vercel         # Deploy preview
npx vercel --prod  # Deploy production
```

## Client Info

- **Business:** Exotics By The Bay
- **Tampa:** (813) 403-8213 | **Miami:** (305) 803-0957
- **Email:** info@exoticsbythebay.co
- **Address:** 2502 North Rocky Point Drive, Tampa, FL 33607
- **GitHub:** https://github.com/ZeroPercentSam/exotics-by-the-bay

## TBD Items (Owner Action Required)

1. Payment processor — owner to provide platform + credentials
2. Insurance verification vendor — owner to select provider
3. Google Analytics / Search Console — owner to grant access
4. HQ Rentals embed — confirm widget embed on current plan + provide tenant ID
5. GHL API credentials — owner to provide API key and location ID
6. Brand assets — supplementary high-res images beyond Shopify scrape
7. CRM automation preferences — desired follow-up workflows in GHL
