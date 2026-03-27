import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LOCATIONS, SITE_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description:
    "Get in touch with Exotics By The Bay. Reach our team in Tampa, Miami, or Orlando for exotic car rental inquiries, bookings, and support.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Contact Us
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
            Get In <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Have a question or ready to book your dream car? Our team is here to
            help 24/7.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-white/50 mb-8">
                Fill out the form below and we&apos;ll get back to you within
                the hour.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Preferred Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select a location</option>
                      <option value="tampa">Tampa</option>
                      <option value="miami">Miami</option>
                      <option value="orlando">Orlando</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vehicle"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Preferred Vehicle
                  </label>
                  <select
                    id="vehicle"
                    name="vehicle"
                    className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                  >
                    <option value="">Select a vehicle (optional)</option>
                    <option value="lamborghini">Lamborghini</option>
                    <option value="ferrari">Ferrari</option>
                    <option value="rolls-royce">Rolls Royce</option>
                    <option value="porsche">Porsche</option>
                    <option value="mclaren">McLaren</option>
                    <option value="bentley">Bentley</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your rental needs, dates, and any special requests..."
                    className="w-full rounded-lg bg-card border border-white/10 text-white px-4 py-3 placeholder:text-white/30 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6 w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-white mb-2">
                Contact Information
              </h2>
              <p className="text-white/50 mb-8">
                Reach out directly to any of our three Florida locations.
              </p>

              {(["tampa", "miami", "orlando"] as const).map((key) => {
                const loc = LOCATIONS[key];
                return (
                  <div
                    key={key}
                    className="rounded-lg border border-white/5 bg-card p-6 transition-all duration-300 hover:border-gold/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/20">
                        <MapPin className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {loc.name}, {loc.state}
                        </h3>
                        {"address" in loc && (
                          <p className="text-white/50 text-sm mb-2">
                            {loc.address}
                          </p>
                        )}
                        <a
                          href={`tel:${loc.phoneRaw}`}
                          className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold/80 transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          {loc.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Email Card */}
              <div className="rounded-lg border border-white/5 bg-card p-6 transition-all duration-300 hover:border-gold/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/20">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email Us
                    </h3>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="text-gold text-sm hover:text-gold/80 transition-colors"
                    >
                      {SITE_EMAIL}
                    </a>
                    <p className="text-white/50 text-sm mt-1">
                      We respond within 1 hour during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="rounded-lg border border-white/5 bg-card p-6 transition-all duration-300 hover:border-gold/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/20">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Hours of Operation
                    </h3>
                    <p className="text-white/50 text-sm">
                      24/7 availability for bookings and support
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      Deliveries available 7 days a week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Find Us in Florida
            </h2>
            <p className="mt-4 text-white/50">
              Serving Tampa, Miami, and Orlando with doorstep delivery across
              the state.
            </p>
          </div>
          <div className="aspect-[16/7] rounded-lg border border-white/5 bg-card flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 text-gold/30 mx-auto mb-4" />
              <p className="text-white/30 text-sm uppercase tracking-wider">
                Interactive Map Coming Soon
              </p>
              <p className="text-white/20 text-xs mt-2">
                Tampa &bull; Miami &bull; Orlando
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Prefer to{" "}
            <span className="text-gradient-gold">Call?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Our concierge team is available 24/7 to assist with bookings,
            vehicle selection, and any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                {LOCATIONS.tampa.phone}
              </Button>
            </a>
            <Link href="/fleet">
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 text-lg px-10 py-6"
              >
                Browse Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
