import { getPartners, getPartnersPage } from "@/lib/cms";
import { buildBreadcrumbSchema, buildSchemaGraph, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partners - Templeton Custom Homes",
  description:
    "Architects, interior designers, and landscape architects Templeton Custom Homes has worked with.",
  path: "/partners",
});

const partnersSchema = buildSchemaGraph(
  buildBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Partners", path: "/partners" },
  ]),
);

export default async function PartnersPage() {
  const [partners, page] = await Promise.all([getPartners(), getPartnersPage()]);
  const categories = ["Architect", "Interior Designer", "Landscape Architect"] as const;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <JsonLd data={partnersSchema} />
      <h1 className="text-4xl lg:text-5xl">Partners</h1>
      <p className="mt-5 max-w-4xl text-lg leading-relaxed text-coastal-muted">{page.intro}</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-2xl">{category}s</h2>
            <div className="mt-4 space-y-4">
              {partners
                .filter((p) => p.category === category)
                .map((partner) => (
                  <article key={partner._id} className="border border-coastal-line p-4">
                    <p className="text-xl">{partner.name}</p>
                    {partner.role ? <p className="text-sm text-coastal-muted">{partner.role}</p> : null}
                    {partner.note ? <p className="mt-2 text-sm text-coastal-muted">{partner.note}</p> : null}
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
