import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "assets.usestyle.ai",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Product -> Fleet redirects
      { source: "/products/2022-rolls-royce-cullinan-black-badge", destination: "/fleet/rolls-royce-cullinan-black-badge", permanent: true },
      { source: "/products/2022-lamborghini-hurac-n-evo-spyder-rental", destination: "/fleet/lamborghini-huracan-evo-spyder", permanent: true },
      { source: "/products/2023-c8-exotic-corvette-rental-tampa", destination: "/fleet/corvette-c8-spyder", permanent: true },
      { source: "/products/2024-shelby-gt500-rental-tampa", destination: "/fleet/shelby-gt500", permanent: true },
      { source: "/products/2021-brabus-rocket-800-gle-rental-tampa", destination: "/fleet/brabus-rocket-800-gle", permanent: true },
      { source: "/products/2019-porsche-gt3rs-rental-tampa", destination: "/fleet/porsche-911-gt3-rs", permanent: true },
      { source: "/products/maybach-gls600-mercedes-rental-tampa", destination: "/fleet/maybach-gls600", permanent: true },
      { source: "/products/rent-lamborghini-urus-s-tampa", destination: "/fleet/lamborghini-urus-vorsteiner", permanent: true },
      { source: "/products/2016-mclaren-650s", destination: "/fleet/mclaren-650s", permanent: true },
      { source: "/products/bentley-bentayga-bentley-rental-tampa", destination: "/fleet/bentley-bentayga", permanent: true },
      { source: "/products/2020-mercedes-benz-g63-black", destination: "/fleet/mercedes-g63-amg", permanent: true },
      { source: "/products/2023-audi-r8-v10-performance", destination: "/fleet/audi-r8-v10-performance", permanent: true },
      { source: "/products/2023-porsche-gt4-rs-porsche-rental-tampa", destination: "/fleet/porsche-cayman-gt4-rs", permanent: true },
      { source: "/products/2023-porsche-911-t", destination: "/fleet/porsche-911-t", permanent: true },
      { source: "/products/2022-dodge-charger-scat-pack", destination: "/fleet/dodge-charger-scat-pack", permanent: true },
      { source: "/products/corvette-z06-rental-tampa", destination: "/fleet", permanent: true },

      // Collection -> Fleet redirects
      { source: "/collections/all", destination: "/fleet", permanent: true },
      { source: "/collections/lamborghini-rental-tampa", destination: "/fleet?brand=lamborghini", permanent: true },
      { source: "/collections/porsche-rental", destination: "/fleet?brand=porsche", permanent: true },
      { source: "/collections/ferrari-rental", destination: "/fleet?brand=ferrari", permanent: true },
      { source: "/collections/mclaren-rental", destination: "/fleet?brand=mclaren", permanent: true },
      { source: "/collections/mercedes-rental", destination: "/fleet?brand=mercedes-benz", permanent: true },
      { source: "/collections/bentley-rental", destination: "/fleet?brand=bentley", permanent: true },
      { source: "/collections/audi-rental", destination: "/fleet?brand=audi", permanent: true },
      { source: "/collections/orlando-luxury-and-exotic-cars", destination: "/fleet?city=orlando", permanent: true },
      { source: "/collections/miami-exotic-car-rental", destination: "/fleet?city=miami", permanent: true },
      { source: "/collections/tampa-exotic-car-rental", destination: "/fleet?city=tampa", permanent: true },
      { source: "/collections/exotic-cars", destination: "/fleet", permanent: true },
      { source: "/collections/luxury-cars", destination: "/fleet", permanent: true },
      { source: "/collections/muscle-cars", destination: "/fleet", permanent: true },
      { source: "/collections/suv-rentals", destination: "/fleet", permanent: true },

      // Page redirects
      { source: "/pages/contact-us", destination: "/contact", permanent: true },
      { source: "/pages/terms-of-service", destination: "/terms", permanent: true },
      { source: "/pages/exotic-car-rental-miami", destination: "/locations/miami", permanent: true },
      { source: "/pages/exotic-car-fleet-tampa", destination: "/fleet?city=tampa", permanent: true },
      { source: "/pages/tampa-car-rental-faq", destination: "/faq", permanent: true },
      { source: "/pages/private-jets", destination: "/jets", permanent: true },
      { source: "/pages/yachts", destination: "/yachts", permanent: true },
      { source: "/pages/limo-sprinter-rental", destination: "/sprinters", permanent: true },
      { source: "/pages/orlando-exotic-car-rentals", destination: "/locations/orlando", permanent: true },
      { source: "/pages/wedding-and-prom-rentals-in-tampa", destination: "/wedding-rentals", permanent: true },
      { source: "/pages/tampa-airport-exotic-car-rentals", destination: "/airport-rentals", permanent: true },
      { source: "/pages/rent-a-brabus-orlando", destination: "/fleet/brabus-rocket-800-gle", permanent: true },

      // Blog redirects
      { source: "/blogs/car-rental-news", destination: "/blog", permanent: true },
      { source: "/blogs/news", destination: "/blog", permanent: true },
      { source: "/blogs/car-rental-news/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blogs/news/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
