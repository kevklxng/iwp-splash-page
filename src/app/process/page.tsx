import type { Metadata } from "next";
import { getProcessPage } from "@/lib/cms";

export const metadata: Metadata = {
  title: "How We Build - Templeton Custom Homes",
  description: "How Templeton Custom Homes handles bids, billing, reporting, and project capacity with full transparency.",
};

export default async function ProcessPage() {
  const process = await getProcessPage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <h1 className="text-4xl lg:text-5xl">Process / Transparency</h1>
      <p className="mt-6 text-lg leading-relaxed text-coastal-muted">{process.intro}</p>
      <div className="mt-10 space-y-6">
        {process.sections.map((section) => (
          <section key={section.title} className="border border-coastal-line bg-coastal-alt p-6">
            <h2 className="text-2xl">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-coastal-muted">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-lg text-coastal-muted">{process.capacityCallout}</p>
      <p className="mt-3 text-sm text-coastal-muted">{process.phaseTwoNote}</p>
    </div>
  );
}
