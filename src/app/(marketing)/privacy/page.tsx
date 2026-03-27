import type { Metadata } from "next";
import { SITE_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Exotics By The Bay",
  description:
    "Privacy policy for Exotics By The Bay. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: March 27, 2026
        </p>

        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-white/60 [&_h2]:font-heading [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when making a
            reservation, contacting us, or using our website. This may include
            your name, email address, phone number, driver&apos;s license
            information, payment details, and insurance information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process and manage your
            vehicle rentals, communicate with you about reservations and
            services, verify your identity and rental eligibility, process
            payments and security deposits, comply with legal obligations, and
            improve our services and website experience.
          </p>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information to third parties. We may
            share your information with payment processors to complete
            transactions, insurance providers as required for rental coverage,
            law enforcement when required by law, and service providers who
            assist us in operating our business.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>5. Cookies & Tracking</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your
            browsing experience, analyze website traffic, and understand how
            visitors interact with our site. You can control cookie preferences
            through your browser settings.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites. We
            encourage you to review the privacy policies of any third-party
            sites you visit.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            fulfill the purposes for which it was collected, including to
            satisfy legal, accounting, or reporting requirements. Rental
            records are retained in accordance with applicable state and
            federal regulations.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete your personal information. You may also have the
            right to opt out of certain data processing activities. To exercise
            any of these rights, please contact us using the information below.
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 25.
            We do not knowingly collect personal information from children
            under 18.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any material changes by posting the updated policy on our
            website with a revised &quot;last updated&quot; date.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at{" "}
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
