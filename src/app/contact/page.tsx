import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Start a Project - Templeton Custom Homes",
  description: "Tell us about your project. Joel reads every inquiry and responds within one business day.",
};

export default function ContactPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Templeton Custom Homes",
    email: "joel@templetoncustomhomes.com",
    telephone: "(949) 933-2459",
    areaServed: [
      "Newport Beach",
      "Costa Mesa",
      "Corona del Mar",
      "Laguna Beach",
      "Dana Point",
      "San Clemente",
      "Huntington Beach",
      "Anaheim",
      "Irvine",
    ],
    priceRange: "$$$$",
    description: "Custom home builder serving coastal Orange County with transparent bidding and billing.",
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <section>
        <h1 className="text-4xl lg:text-5xl">Start a Project</h1>
        <p className="mt-5 text-lg text-coastal-muted">
          Tell us about your project. Joel reads every inquiry and responds within one business day.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
      <aside className="h-fit border border-coastal-line bg-coastal-alt p-6 text-coastal-muted">
        <p className="text-xl text-coastal-ink">Templeton Custom Homes</p>
        <p className="mt-4">Email: joel@templetoncustomhomes.com</p>
        <p>Phone: (949) 933-2459</p>
        <p className="mt-4">[PLACEHOLDER: License and bonding information pending confirmation.]</p>
        <p className="mt-4">
          We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach,
          Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.
        </p>
        <p className="mt-4 font-semibold text-coastal-ink">Minimum project size: $500,000.</p>
      </aside>
    </div>
  );
}
