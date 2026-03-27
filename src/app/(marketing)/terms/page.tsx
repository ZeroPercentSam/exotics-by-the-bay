import type { Metadata } from "next";
import { SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | Exotics By The Bay",
  description:
    "Terms of service for Exotics By The Bay exotic car rentals. Read our rental agreement terms, policies, and conditions.",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: March 27, 2026
        </p>

        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-white/60 [&_h2]:font-heading [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the services provided by Exotics By The Bay
            (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, you may not use our services.
          </p>

          <h2>2. Rental Eligibility</h2>
          <p>
            To rent a vehicle from Exotics By The Bay, you must be at least 25
            years of age, possess a valid driver&apos;s license, carry valid
            auto insurance, and provide a valid credit card in your name. We
            reserve the right to decline service at our discretion.
          </p>

          <h2>3. Reservations & Deposits</h2>
          <p>
            All reservations require a non-refundable deposit at the time of
            booking. The remaining balance is due at the time of vehicle pickup
            or delivery. Reservation details, including pricing and vehicle
            availability, are subject to change until confirmed in writing.
          </p>

          <h2>4. Security Deposit</h2>
          <p>
            A security deposit will be held on your credit card for the
            duration of the rental period. The amount varies by vehicle. The
            deposit will be released within 7-14 business days after the
            vehicle is returned in satisfactory condition.
          </p>

          <h2>5. Vehicle Use & Restrictions</h2>
          <p>
            Rented vehicles may only be operated by the authorized renter listed
            on the rental agreement. Vehicles may not be used for racing,
            off-road driving, towing, or any illegal activity. Smoking is
            prohibited in all vehicles. Pets are not permitted without prior
            written approval. Mileage limits apply as specified in your rental
            agreement.
          </p>

          <h2>6. Insurance & Liability</h2>
          <p>
            The renter is responsible for maintaining valid auto insurance
            coverage for the duration of the rental. The renter is liable for
            all damages, fines, tolls, and violations incurred during the
            rental period. Additional insurance options may be available at the
            time of booking.
          </p>

          <h2>7. Cancellations & Refunds</h2>
          <p>
            Cancellations made more than 72 hours before the rental start time
            may be eligible for a partial refund, minus the non-refundable
            deposit. Cancellations within 72 hours of the rental start time are
            non-refundable. No-shows forfeit the full rental amount.
          </p>

          <h2>8. Vehicle Return</h2>
          <p>
            Vehicles must be returned at the agreed-upon time and location with
            the same fuel level as at the start of the rental. Late returns
            will incur additional daily charges. Vehicles returned in a
            condition requiring excessive cleaning will be subject to a
            detailing fee.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Exotics By The Bay shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from the use of our services or vehicles.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of the State of Florida. Any disputes shall be resolved in
            the courts of Hillsborough County, Florida.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have questions about these Terms of Service, please contact
            us at{" "}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-gold hover:underline"
            >
              {SITE_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
