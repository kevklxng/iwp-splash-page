import { cache } from "react";
import { placeholderPartners, placeholderProjects, type Partner, type Project } from "./content";

/** Cities used for Contact JSON-LD and fallbacks. */
export const CONTACT_AREA_SERVED = [
  "Newport Beach",
  "Costa Mesa",
  "Corona del Mar",
  "Laguna Beach",
  "Dana Point",
  "San Clemente",
  "Huntington Beach",
  "Anaheim",
  "Irvine",
] as const;

const FALLBACK_HOME = {
  heroHeadline: "Custom homes built with open books.",
  heroSubhead:
    "High-end coastal homes and remodels in Newport Beach, Costa Mesa, and Corona del Mar - built with itemized bids, monthly receipts, and direct access to the owner on every project.",
  positioningStatement:
    "Most builders in Newport and Costa Mesa are overpriced and impersonal. Templeton Custom Homes delivers the same coastal luxury at a fair cost - with full transparency, direct owner access, and zero budget surprises.",
  whatWeDoPlain:
    "Custom new builds ($500K-$20M), remodels, additions, and ADUs. Service area: Newport Beach, Costa Mesa, Corona del Mar, Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine. Style-agnostic - every project is custom-fitted to the client's vision.",
  differencePillars: [
    {
      title: "High-End",
      description: "Premium quality without premium mystery.",
    },
    {
      title: "Honest",
      description: "Itemized bids, monthly invoices with receipts, fee billed at actual percentage complete.",
    },
    {
      title: "Dependable",
      description: "6-10 simultaneous projects with direct owner access and personal accountability.",
    },
  ],
  aboutPreviewHeading: "About Joel",
  aboutPreviewPlain:
    "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see CONTENT.md for structure and replacement guidance.]",
  aboutLearnMoreLabel: "Learn more about Joel",
  heroImageUrl: null as string | null,
  aboutPreviewPhotoUrl: null as string | null,
  closingCtaHeading: "Ready to start a project with a transparent process and direct owner access?",
  closingCtaCopy: null as string | null,
  closingCtaButtonLabel: "Start a project",
};

const FALLBACK_ABOUT = {
  joelPhotoUrl: "https://images.unsplash.com/photo-1595514535415-dae4f6c8b742?auto=format&fit=crop&w=1400&q=80",
  bio: [
    "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see brief Section 7. Suggested structure: (1) what Joel did before TCH, (2) the moment he decided to start the company, (3) the specific frustration with the industry that drives the TCH approach, (4) what he wants every client experience to feel like.]",
    "[PLACEHOLDER: Team section - add names and roles for key team members once confirmed.]",
    "[PLACEHOLDER: Industry background and credentials, including licensing and bonding details.]",
  ],
  teamMembers: [] as { name?: string; role?: string; photoUrl?: string | null }[],
  credentials: null as string | null,
};

const FALLBACK_PROCESS = {
  intro:
    "Most contractors guard their numbers. We publish ours. Here's how a Templeton project actually runs - from the first bid to the final invoice.",
  sections: [
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
  ],
  capacityCallout:
    "We run 6-10 projects at once. That's a deliberate cap - enough to keep the team sharp, few enough that Joel is on every site, every week.",
  phaseTwoNote: "[PLACEHOLDER: Phase 2 will add sample PDF links for budget, change order logs, schedules, and weekly reports.]",
};

const FALLBACK_CONTACT = {
  intro: "Let's talk specifics. Joel reads every inquiry and responds within one business day.",
  contactEmail: "joel@iwp.fund",
  phone: "(949) 933-2459",
  licenseBonding: "[PLACEHOLDER: License and bonding information pending confirmation.]",
  serviceArea:
    "We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.",
  minimumProjectSizeNote: "Minimum project size: $500,000.",
};

const FALLBACK_WORK = {
  intro:
    "Eight projects from across coastal Orange County. New builds, remodels, additions, and ADUs - every one custom-fitted to the client.",
};

const FALLBACK_PARTNERS = {
  intro:
    "Templeton Custom Homes works closely with the architects, interior designers, and landscape architects who shape coastal Orange County. These are the firms we've built with - often, and well.",
};

const FALLBACK_SITE_SETTINGS = {
  footerTagline: "High-end coastal homes built with open books.",
  licenseBondingText: "[PLACEHOLDER: License and bonding numbers pending Joel confirmation]",
  serviceAreaNote:
    "We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.",
};

export type HomePageContent = typeof FALLBACK_HOME;
export type AboutPageContent = typeof FALLBACK_ABOUT;
export type ProcessPageContent = typeof FALLBACK_PROCESS;
export type ContactPageContent = typeof FALLBACK_CONTACT;
export type WorkPageContent = typeof FALLBACK_WORK;
export type PartnersPageContent = typeof FALLBACK_PARTNERS;
export type SiteSettingsContent = typeof FALLBACK_SITE_SETTINGS;

export const getHomePage = cache(async (): Promise<HomePageContent> => FALLBACK_HOME);

export const getAboutPage = cache(async (): Promise<AboutPageContent> => FALLBACK_ABOUT);

export const getProcessPage = cache(async (): Promise<ProcessPageContent> => FALLBACK_PROCESS);

export const getContactPage = cache(async (): Promise<ContactPageContent> => FALLBACK_CONTACT);

export const getWorkPage = cache(async (): Promise<WorkPageContent> => FALLBACK_WORK);

export const getPartnersPage = cache(async (): Promise<PartnersPageContent> => FALLBACK_PARTNERS);

export const getSiteSettings = cache(async (): Promise<SiteSettingsContent> => FALLBACK_SITE_SETTINGS);

export const getProjects = cache(async (): Promise<Project[]> => placeholderProjects);

export const getFeaturedProjects = cache(async (): Promise<Project[]> =>
  placeholderProjects.filter((p) => p.featured).slice(0, 3),
);

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> =>
  placeholderProjects.find((p) => p.slug === slug),
);

export const getPartners = cache(async (): Promise<Partner[]> => placeholderPartners);

export const getProjectSlugs = cache(async (): Promise<string[]> =>
  placeholderProjects.map((project) => project.slug),
);
