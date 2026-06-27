import { ContactForm } from "@/components/contact-form";
import { PortableText } from "@/components/portable-text";
import { blocksToPlainText, CONTACT_AREA_SERVED, getContactPage } from "@/lib/cms";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildSchemaGraph,
  JsonLd,
  pageMetadata,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Learn More - IWP",
  description: "Get in touch with Itibari, Waynne & Partners. We respond to every inquiry promptly.",
  path: "/contact",
});

export default async function ContactPage() {
  const contact = await getContactPage();

  const licensePlain = blocksToPlainText(contact.licenseBonding ?? undefined);
  const servicePlain = blocksToPlainText(contact.serviceArea ?? undefined);

  const description =
    [licensePlain, servicePlain].filter(Boolean).join(" ").slice(0, 280) ||
    "Custom home builder serving coastal Orange County with transparent bidding and billing.";

  const localBusiness = buildLocalBusinessSchema({
    description,
    email: contact.contactEmail,
    telephone: contact.phone,
  });

  const contactSchema = buildSchemaGraph(
    { ...localBusiness, areaServed: [...CONTACT_AREA_SERVED] },
    buildBreadcrumbSchema([
      { name: "Home", path: "" },
      { name: "Contact", path: "/contact" },
    ]),
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20">
      <JsonLd data={contactSchema} />
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
