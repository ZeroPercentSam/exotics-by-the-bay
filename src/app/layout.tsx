import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Exotics By The Bay | Luxury & Exotic Car Rentals in Tampa, Miami & Orlando",
    template: "%s | Exotics By The Bay",
  },
  description:
    "Tampa's premier exotic car rental. Drive Lamborghini, Rolls Royce, Ferrari, Porsche & more. Delivered to you in Tampa, Miami & Orlando. 5-star rated, 24/7 concierge.",
  keywords: [
    "exotic car rental Tampa",
    "luxury car rental Miami",
    "exotic car rental Orlando",
    "Lamborghini rental Florida",
    "Rolls Royce rental Tampa",
    "Ferrari rental Miami",
    "supercar rental",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Exotics By The Bay",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-13FX3J1FJ0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-13FX3J1FJ0');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
