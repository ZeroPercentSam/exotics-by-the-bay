import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone, ChevronRight } from "lucide-react";
import { LOCATIONS, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `FAQ | ${SITE_NAME}`,
  description:
    "Frequently asked questions about renting exotic cars from Exotics By The Bay. Learn about requirements, insurance, pricing, delivery, and more.",
};

const FAQ_ITEMS = [
  {
    question: "What are the rental requirements?",
    answer:
      "To rent from Exotics By The Bay, you need a valid driver's license, a major credit card in your name, and full-coverage auto insurance. We also require a signed rental agreement. International licenses are accepted with a valid passport.",
  },
  {
    question: "What is the minimum age requirement?",
    answer:
      "The minimum age to rent an exotic vehicle is 25 years old. All drivers must have a clean driving record with no major violations in the past 3 years. Additional drivers must also meet these requirements and be listed on the rental agreement.",
  },
  {
    question: "Is insurance included in the rental?",
    answer:
      "Renters are required to have their own full-coverage auto insurance that extends to rental vehicles. We also offer supplemental insurance options for additional peace of mind. Our team can help you verify your coverage before your rental date.",
  },
  {
    question: "Is there a security deposit?",
    answer:
      "Yes, a security deposit is required at the time of pickup and is held on your credit card. The deposit amount varies by vehicle and typically ranges from $2,500 to $10,000. The hold is released within 5-7 business days after the vehicle is returned in good condition.",
  },
  {
    question: "Do you offer delivery and pickup?",
    answer:
      "Absolutely! We offer white-glove delivery and pickup service across Florida. We can deliver to your home, hotel, airport, or event venue. Delivery within the Tampa Bay area is complimentary for multi-day rentals. Delivery fees to Miami and Orlando vary — contact us for a quote.",
  },
  {
    question: "What are the mileage limits?",
    answer:
      "Each rental includes a daily mileage allowance that varies by vehicle, typically between 100-150 miles per day. Additional miles can be purchased at booking or during your rental. We also offer unlimited mileage packages for extended rentals — ask our team for details.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made 72 hours or more before your rental start time receive a full refund. Cancellations within 48-72 hours receive a 50% refund. Cancellations within 48 hours are non-refundable. We understand plans change — contact us and we'll do our best to accommodate rescheduling.",
  },
  {
    question: "How do I book a vehicle?",
    answer:
      "Booking is simple! You can browse our fleet online, call us directly, or fill out our contact form. Once you select your vehicle and dates, we'll confirm availability and send a rental agreement. A deposit is required to secure your reservation. Our concierge team is available 24/7 to assist.",
  },
  {
    question: "What locations do you serve?",
    answer:
      "We proudly serve three major Florida markets: Tampa (our headquarters), Miami, and Orlando. We offer doorstep delivery throughout these metro areas and can arrange delivery to other Florida destinations on request. Whether you're in South Beach, Downtown Tampa, or near the theme parks, we've got you covered.",
  },
  {
    question: "What is the fuel policy?",
    answer:
      "All vehicles are provided with a full tank of premium fuel and must be returned with a full tank. If the vehicle is returned without a full tank, a refueling fee will be applied at above-market rates. We recommend fueling up at a nearby station before returning the vehicle. Our team will provide fuel recommendations for your specific vehicle.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Support
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tight">
            Frequently Asked{" "}
            <span className="text-gradient-gold">Questions</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60 leading-relaxed">
            Everything you need to know about renting an exotic car from Exotics
            By The Bay.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Accordion>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={index}
                className="border-white/10"
              >
                <AccordionTrigger className="py-6 text-base text-white hover:text-gold hover:no-underline transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/60 leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-y border-gold/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-6">
            Still Have{" "}
            <span className="text-gradient-gold">Questions?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Our concierge team is available 24/7 to help with anything you need.
            Don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="gold-shimmer bg-gold text-black font-bold text-lg px-10 py-6"
              >
                Contact Us
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.tampa.phoneRaw}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 text-lg px-10 py-6"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
