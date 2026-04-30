import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Build - Templeton Custom Homes",
  description: "How Templeton Custom Homes handles bids, billing, reporting, and project capacity with full transparency.",
};

const sections = [
  {
    title: "How we bid",
    body: "Every subcontractor on a TCH project is itemized in the bid. You see exactly what every line costs and where every dollar is going before any work begins.",
  },
  {
    title: "How we bill",
    body: "Monthly invoices with actual receipts attached for every line item. Our fee is billed as actual percentage complete - never front-loaded.",
  },
  {
    title: "What you get every week",
    body: "A written owner report covering progress, upcoming work, decisions needed, and any change orders. No surprises at the end of the month or the end of the project.",
  },
  {
    title: "What's different",
    body: "Most builders in this market mark up subcontractor costs and bury the breakdown. Some bill 20% fees front-loaded. Some run a dozen jobs at once and you talk to a project manager, not the owner. We don't.",
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <h1 className="text-4xl lg:text-5xl">Process / Transparency</h1>
      <p className="mt-6 text-lg leading-relaxed text-coastal-muted">
        Most contractors guard their numbers. We publish ours. Here&apos;s how a Templeton project actually runs - from
        the first bid to the final invoice.
      </p>
      <div className="mt-10 space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="border border-coastal-line bg-coastal-alt p-6">
            <h2 className="text-2xl">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-coastal-muted">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-lg text-coastal-muted">
        We run 6-10 projects at once. That&apos;s a deliberate cap - enough to keep the team sharp, few enough that Joel
        is on every site, every week.
      </p>
      <p className="mt-3 text-sm text-coastal-muted">
        [PLACEHOLDER: Phase 2 will add sample PDF links for budget, change order logs, schedules, and weekly reports.]
      </p>
    </div>
  );
}
