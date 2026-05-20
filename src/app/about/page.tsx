import Image from "next/image";
import { PortableText } from "@/components/portable-text";
import { getAboutPage } from "@/lib/cms";
import { buildBreadcrumbSchema, buildSchemaGraph, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Joel Templeton - Templeton Custom Homes",
  description:
    "Meet the owner behind Templeton Custom Homes and learn how projects are run with direct accountability.",
  path: "/about",
});

const aboutSchema = buildSchemaGraph(
  buildBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "About", path: "/about" },
  ]),
);

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <JsonLd data={aboutSchema} />
      <h1 className="text-4xl lg:text-5xl">About Joel Templeton</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-coastal-muted">
          <PortableText value={about.bio} />
          {about.teamMembers?.length ? (
            <div className="space-y-4 border-t border-coastal-line pt-6">
              <h2 className="text-2xl text-coastal-ink">Team</h2>
              <ul className="space-y-4">
                {about.teamMembers.map((m, i) => (
                  <li key={`${m.name}-${i}`} className="flex gap-4">
                    {m.photoUrl ? (
                      <Image
                        src={m.photoUrl}
                        alt={m.name || "Team member"}
                        width={96}
                        height={96}
                        className="h-24 w-24 shrink-0 rounded object-cover"
                      />
                    ) : null}
                    <div>
                      {m.name ? <p className="font-semibold text-coastal-ink">{m.name}</p> : null}
                      {m.role ? <p className="text-sm">{m.role}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {about.credentials?.length ? (
            <div className="border-t border-coastal-line pt-6">
              <PortableText value={about.credentials} />
            </div>
          ) : null}
        </div>
        <Image
          src={about.joelPhotoUrl}
          alt="Joel Templeton, owner of Templeton Custom Homes"
          width={900}
          height={1200}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="rounded object-cover"
        />
      </div>
    </div>
  );
}
