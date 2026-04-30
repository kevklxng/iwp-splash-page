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
      description: [{ _type: "block", children: [{ _type: "span", text: project.description }] }],
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
    closingCtaCopy: "Got plans in motion? Tell us where your project stands and we will respond within one business day.",
  });

  await client.createOrReplace({
    _id: "about-page",
    _type: "aboutPage",
    bio: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see CONTENT.md.]",
          },
        ],
      },
    ],
  });

  await client.createOrReplace({
    _id: "process-page",
    _type: "processPage",
    intro:
      "Most contractors guard their numbers. We publish ours. Here's how a Templeton project actually runs - from the first bid to the final invoice.",
  });

  await client.createOrReplace({
    _id: "contact-page",
    _type: "contactPage",
    intro: "Tell us about your project. Joel reads every inquiry and responds within one business day.",
    contactEmail: "joel@templetoncustomhomes.com",
    phone: "(949) 933-2459",
    minimumProjectSizeNote: "Minimum project size: $500,000.",
  });

  console.log("Seed completed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
