import { createClient } from "@sanity/client";
import { placeholderPartners, placeholderProjects } from "../src/lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.log("Missing NEXT_PUBLIC_SANITY_PROJECT_ID and/or SANITY_API_WRITE_TOKEN. Seed skipped.");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-04-01",
  token,
  useCdn: false,
});

function span(text: string) {
  return { _type: "span", _key: `s-${Math.random().toString(36).slice(2)}`, text, marks: [] as const };
}

function blockFromText(text: string) {
  return {
    _type: "block",
    _key: `b-${Math.random().toString(36).slice(2)}`,
    style: "normal",
    markDefs: [] as const,
    children: [span(text)],
  };
}

const WHAT_WE_DO_PLAIN =
  "Custom new builds ($500K-$20M), remodels, additions, and ADUs. Service area: Newport Beach, Costa Mesa, Corona del Mar, Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine. Style-agnostic - every project is custom-fitted to the client's vision.";

const PROCESS_SECTIONS = [
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

async function run() {
  for (const project of placeholderProjects) {
    await client.createOrReplace({
      _id: `seed-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      location: project.location,
      year: project.year,
      type: project.type,
      style: project.style,
      description: [blockFromText(project.description)],
      featured: Boolean(project.featured),
      order: 100,
      isPlaceholder: true,
    });
  }

  for (const partner of placeholderPartners) {
    await client.createOrReplace({
      _id: `seed-partner-${partner._id}`,
      _type: "partner",
      name: partner.name,
      category: partner.category,
      role: partner.role,
      note: partner.note,
      order: 100,
    });
  }

  await client.createOrReplace({
    _id: "home-page",
    _type: "homePage",
    heroHeadline: "Custom homes built with open books.",
    heroSubhead:
      "High-end coastal homes and remodels in Newport Beach, Costa Mesa, and Corona del Mar - built with itemized bids, monthly receipts, and direct access to the owner on every project.",
    positioningStatement:
      "Most builders in Newport and Costa Mesa are overpriced and impersonal. Templeton Custom Homes delivers the same coastal luxury at a fair cost - with full transparency, direct owner access, and zero budget surprises.",
    whatWeDo: [blockFromText(WHAT_WE_DO_PLAIN)],
    differencePillars: [
      { title: "High-End", description: "Premium quality without premium mystery." },
      { title: "Honest", description: "Itemized bids, monthly invoices with receipts, fee billed at actual percentage complete." },
      { title: "Dependable", description: "6-10 simultaneous projects with direct owner access and personal accountability." },
    ],
    aboutPreviewHeading: "About Joel",
    aboutPreviewText: [
      blockFromText(
        "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see CONTENT.md for structure and replacement guidance.]",
      ),
    ],
    aboutLearnMoreLabel: "Learn more about Joel",
    closingCtaHeading: "Ready to start a project with a transparent process and direct owner access?",
    closingCtaButtonLabel: "Start a project",
  });

  await client.createOrReplace({
    _id: "about-page",
    _type: "aboutPage",
    bio: [
      blockFromText(
        "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see brief Section 7. Suggested structure: (1) what Joel did before TCH, (2) the moment he decided to start the company, (3) the specific frustration with the industry that drives the TCH approach, (4) what he wants every client experience to feel like.]",
      ),
      blockFromText("[PLACEHOLDER: Team section - add names and roles for key team members once confirmed.]"),
      blockFromText("[PLACEHOLDER: Industry background and credentials, including licensing and bonding details.]"),
    ],
  });

  await client.createOrReplace({
    _id: "process-page",
    _type: "processPage",
    intro:
      "Most contractors guard their numbers. We publish ours. Here's how a Templeton project actually runs - from the first bid to the final invoice.",
    sections: PROCESS_SECTIONS,
    capacityCallout:
      "We run 6-10 projects at once. That's a deliberate cap - enough to keep the team sharp, few enough that Joel is on every site, every week.",
    phaseTwoNote: "[PLACEHOLDER: Phase 2 will add sample PDF links for budget, change order logs, schedules, and weekly reports.]",
  });

  await client.createOrReplace({
    _id: "contact-page",
    _type: "contactPage",
    intro: "Tell us about your project. Joel reads every inquiry and responds within one business day.",
    contactEmail: "joel@templetoncustomhomes.com",
    phone: "(949) 933-2459",
    licenseBonding: [blockFromText("[PLACEHOLDER: License and bonding information pending confirmation.]")],
    serviceArea: [
      blockFromText(
        "We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.",
      ),
    ],
    minimumProjectSizeNote: "Minimum project size: $500,000.",
  });

  await client.createOrReplace({
    _id: "work-page",
    _type: "workPage",
    intro:
      "Eight projects from across coastal Orange County. New builds, remodels, additions, and ADUs - every one custom-fitted to the client.",
  });

  await client.createOrReplace({
    _id: "partners-page",
    _type: "partnersPage",
    intro:
      "Templeton Custom Homes works closely with the architects, interior designers, and landscape architects who shape coastal Orange County. These are the firms we've built with - often, and well.",
  });

  await client.createOrReplace({
    _id: "site-settings",
    _type: "siteSettings",
    footerTagline: "High-end coastal homes built with open books.",
    licenseBondingText: "[PLACEHOLDER: License and bonding numbers pending Joel confirmation]",
    serviceAreaNote:
      "We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.",
  });

  console.log("Seed completed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
