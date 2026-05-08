import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PortableText } from "@/components/portable-text";
import { blocksToPlainText, CONTACT_AREA_SERVED, getContactPage } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Start a Project - Templeton Custom Homes",
  description: "Tell us about your project. Joel reads every inquiry and responds within one business day.",
};

export default async function ContactPage() {
  const contact = await getContactPage();

  const licensePlain = blocksToPlainText(contact.licenseBonding ?? undefined);
  const servicePlain = blocksToPlainText(contact.serviceArea ?? undefined);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Templeton Custom Homes",
    email: contact.contactEmail,
    telephone: contact.phone,
    areaServed: [...CONTACT_AREA_SERVED],
    priceRange: "$$$$",
    description:
      [licensePlain, servicePlain].filter(Boolean).join(" ").slice(0, 280) ||
      "Custom home builder serving coastal Orange County with transparent bidding and billing.",
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <section>
        <h1 className="text-4xl lg:text-5xl">Start a Project</h1>
        <p className="mt-5 text-lg text-coastal-muted">{contact.intro}</p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
      <aside className="h-fit border border-coastal-line bg-coastal-alt p-6 text-coastal-muted">
        <p className="text-xl text-coastal-ink">Templeton Custom Homes</p>
        <p className="mt-4">
          Email:{" "}
          <a href={`mailto:${contact.contactEmail}`} className="underline">
            {contact.contactEmail}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="underline">
            {contact.phone}
          </a>
        </p>
        <div className="mt-4">
          <PortableText value={contact.licenseBonding ?? undefined} />
        </div>
        <div className="mt-4">
          <PortableText value={contact.serviceArea ?? undefined} />
        </div>
        <p className="mt-4 font-semibold text-coastal-ink">{contact.minimumProjectSizeNote}</p>
      </aside>
    </div>
  );
}
