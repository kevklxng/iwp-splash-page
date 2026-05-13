import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import { cache } from "react";
import { sanityClient } from "../sanity/client";
import { hasSanity } from "../sanity/env";
import { urlFor } from "../sanity/image";
import { placeholderPartners, placeholderProjects, type Partner, type Project } from "./content";

/** Cities used for Contact JSON-LD and fallbacks (editable copy lives in CMS for visible text). */
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

export function blocksToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks?.length) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    if (block._type !== "block" || !("children" in block) || !Array.isArray(block.children)) continue;
    const line = block.children
      .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
      .join("");
    parts.push(line);
  }
  return parts.filter(Boolean).join("\n\n");
}

function plainParagraphBlocks(...paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `p-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s-${i}`, text, marks: [] }],
  })) as PortableTextBlock[];
}

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
  bio: plainParagraphBlocks(
    "[PLACEHOLDER: Joel's origin story. Rough notes pending polish - see brief Section 7. Suggested structure: (1) what Joel did before TCH, (2) the moment he decided to start the company, (3) the specific frustration with the industry that drives the TCH approach, (4) what he wants every client experience to feel like.]",
    "[PLACEHOLDER: Team section - add names and roles for key team members once confirmed.]",
    "[PLACEHOLDER: Industry background and credentials, including licensing and bonding details.]",
  ),
  teamMembers: [] as { name?: string; role?: string; photoUrl?: string | null }[],
  credentials: null as PortableTextBlock[] | null,
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
  contactEmail: "joel@templetoncustomhomes.com",
  phone: "(949) 933-2459",
  licenseBonding: plainParagraphBlocks("[PLACEHOLDER: License and bonding information pending confirmation.]"),
  serviceArea: plainParagraphBlocks(
    "We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.",
  ),
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

const DEFAULT_REVALIDATE_SECONDS = 300;

export type HomePageContent = {
  heroHeadline: string;
  heroSubhead: string;
  heroImageUrl: string | null;
  positioningStatement: string;
  whatWeDoBlocks: PortableTextBlock[] | null;
  whatWeDoPlain: string;
  differencePillars: { title: string; description: string }[];
  aboutPreviewHeading: string;
  aboutPreviewBlocks: PortableTextBlock[] | null;
  aboutPreviewPlain: string;
  aboutPreviewPhotoUrl: string | null;
  aboutLearnMoreLabel: string;
  closingCtaHeading: string;
  closingCtaCopy: string | null;
  closingCtaButtonLabel: string;
};

export type AboutPageContent = {
  joelPhotoUrl: string;
  bio: PortableTextBlock[];
  teamMembers: { name?: string; role?: string; photoUrl?: string | null }[];
  credentials: PortableTextBlock[] | null;
};

export type ProcessPageContent = typeof FALLBACK_PROCESS;

export type ContactPageContent = {
  intro: string;
  contactEmail: string;
  phone: string;
  licenseBonding: PortableTextBlock[] | null;
  serviceArea: PortableTextBlock[] | null;
  minimumProjectSizeNote: string;
};

export type WorkPageContent = { intro: string };
export type PartnersPageContent = { intro: string };
export type SiteSettingsContent = typeof FALLBACK_SITE_SETTINGS;

const homeQuery = groq`*[_id == "home-page"][0]{
  heroHeadline,
  heroSubhead,
  positioningStatement,
  whatWeDo,
  differencePillars,
  aboutPreviewHeading,
  aboutPreviewText,
  aboutLearnMoreLabel,
  closingCtaHeading,
  closingCtaCopy,
  closingCtaButtonLabel,
  heroImage{asset, crop, hotspot},
  aboutPreviewPhoto{asset, crop, hotspot}
}`;

const aboutQuery = groq`*[_id == "about-page"][0]{
  bio,
  credentials,
  teamMembers[]{ name, role, "photoUrl": photo.asset->url },
  "joelPhotoUrl": joelPhoto.asset->url
}`;

const processQuery = groq`*[_id == "process-page"][0]{ intro, sections, capacityCallout, phaseTwoNote }`;

const contactQuery = groq`*[_id == "contact-page"][0]{
  intro,
  contactEmail,
  phone,
  licenseBonding,
  serviceArea,
  minimumProjectSizeNote
}`;

const workQuery = groq`*[_id == "work-page"][0]{ intro }`;
const partnersQuerySingleton = groq`*[_id == "partners-page"][0]{ intro }`;
const siteSettingsQuery = groq`*[_id == "site-settings"][0]{ footerTagline, licenseBondingText, serviceAreaNote }`;

const projectsQuery = groq`*[_type == "project"] | order(order asc, year desc){
  _id,
  title,
  "slug": slug.current,
  location,
  year,
  type,
  style,
  featured,
  isPlaceholder,
  heroImage{asset, crop, hotspot}
}`;

const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)] | order(order asc, year desc){
  "slug": slug.current
}`;

const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  location,
  year,
  type,
  style,
  featured,
  isPlaceholder,
  description,
  details,
  heroImage{asset, crop, hotspot},
  gallery[]{asset, crop, hotspot}
}`;

const partnersQuery = groq`*[_type == "partner"] | order(order asc){
  _id,name,category,role,website,note
}`;

const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc, year desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  location,
  year,
  type,
  style,
  featured,
  isPlaceholder,
  heroImage{asset, crop, hotspot}
}`;

type SanityFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

async function safeSanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: SanityFetchOptions,
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params ?? {}, {
      next: {
        revalidate: options?.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
        tags: options?.tags,
      },
    });
  } catch (error) {
    console.error("Sanity query failed; using fallback content.", error);
    return null;
  }
}

type SanityImageSource = Parameters<typeof urlFor>[0];

function buildSanityImageUrl(source: string | SanityImageSource | null | undefined, width: number): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  return urlFor(source)?.width(width).auto("format").quality(75).url() ?? null;
}

function mapSanityProject(row: {
  _id: string;
  title: string;
  slug?: string;
  location: string;
  year: number;
  type: string;
  style?: string;
  featured?: boolean;
  isPlaceholder?: boolean;
  description?: PortableTextBlock[] | null;
  details?: { label?: string; value?: string }[] | null;
  heroImage?: string | SanityImageSource | null;
  gallery?: (string | SanityImageSource | null)[] | null;
}): Project {
  const plain = blocksToPlainText(row.description ?? undefined);
  const gallery =
    row.gallery
      ?.map((image) => buildSanityImageUrl(image, 1200))
      .filter((u): u is string => Boolean(u)) ?? [];
  const heroImage = buildSanityImageUrl(row.heroImage, 1600) ?? "";
  return {
    _id: row._id,
    title: row.title,
    slug: row.slug ?? "",
    location: row.location,
    year: row.year,
    type: row.type,
    style: row.style,
    heroImage,
    description: plain || "[No description yet.]",
    descriptionBlocks: row.description?.length ? row.description : undefined,
    featured: row.featured,
    isPlaceholder: row.isPlaceholder,
    gallery: gallery.length ? gallery : undefined,
    details: row.details?.filter((d) => d.label && d.value) as Project["details"],
  };
}

export const getHomePage = cache(async (): Promise<HomePageContent> => {
  if (!hasSanity) {
    return {
      ...FALLBACK_HOME,
      whatWeDoBlocks: null,
      aboutPreviewBlocks: plainParagraphBlocks(FALLBACK_HOME.aboutPreviewPlain),
      aboutPreviewPlain: FALLBACK_HOME.aboutPreviewPlain,
    };
  }
  const doc = await safeSanityFetch<Record<string, unknown>>(homeQuery, undefined, { tags: ["home-page"] });
  if (!doc) {
    return {
      ...FALLBACK_HOME,
      whatWeDoBlocks: null,
      aboutPreviewBlocks: plainParagraphBlocks(FALLBACK_HOME.aboutPreviewPlain),
      aboutPreviewPlain: FALLBACK_HOME.aboutPreviewPlain,
    };
  }
  const whatWeDo = doc.whatWeDo as PortableTextBlock[] | null | undefined;
  const aboutPreviewText = doc.aboutPreviewText as PortableTextBlock[] | null | undefined;
  const diff = doc.differencePillars as { title?: string; description?: string }[] | null | undefined;
  return {
    heroHeadline: (doc.heroHeadline as string) || FALLBACK_HOME.heroHeadline,
    heroSubhead: (doc.heroSubhead as string) || FALLBACK_HOME.heroSubhead,
    heroImageUrl: buildSanityImageUrl((doc.heroImage as SanityImageSource) ?? null, 1800),
    positioningStatement: (doc.positioningStatement as string) || FALLBACK_HOME.positioningStatement,
    whatWeDoBlocks: whatWeDo?.length ? whatWeDo : null,
    whatWeDoPlain: FALLBACK_HOME.whatWeDoPlain,
    differencePillars: (() => {
      const pillars = (diff ?? []).filter((p): p is { title: string; description: string } =>
        Boolean(p.title?.trim() && p.description?.trim()),
      );
      return pillars.length ? pillars : FALLBACK_HOME.differencePillars;
    })(),
    aboutPreviewHeading: (doc.aboutPreviewHeading as string) || FALLBACK_HOME.aboutPreviewHeading,
    aboutPreviewBlocks: aboutPreviewText?.length ? aboutPreviewText : null,
    aboutPreviewPlain: FALLBACK_HOME.aboutPreviewPlain,
    aboutPreviewPhotoUrl: buildSanityImageUrl((doc.aboutPreviewPhoto as SanityImageSource) ?? null, 900),
    aboutLearnMoreLabel: (doc.aboutLearnMoreLabel as string) || FALLBACK_HOME.aboutLearnMoreLabel,
    closingCtaHeading: (doc.closingCtaHeading as string) || FALLBACK_HOME.closingCtaHeading,
    closingCtaCopy: (doc.closingCtaCopy as string) || null,
    closingCtaButtonLabel: (doc.closingCtaButtonLabel as string) || FALLBACK_HOME.closingCtaButtonLabel,
  };
});

export const getAboutPage = cache(async (): Promise<AboutPageContent> => {
  if (!hasSanity) {
    return {
      joelPhotoUrl: FALLBACK_ABOUT.joelPhotoUrl,
      bio: FALLBACK_ABOUT.bio,
      teamMembers: FALLBACK_ABOUT.teamMembers,
      credentials: FALLBACK_ABOUT.credentials,
    };
  }
  const doc = await safeSanityFetch<{
    bio?: PortableTextBlock[];
    credentials?: PortableTextBlock[];
    teamMembers?: { name?: string; role?: string; photoUrl?: string | null }[];
    joelPhotoUrl?: string | null;
  }>(aboutQuery, undefined, { tags: ["about-page"] });
  if (!doc) {
    return {
      joelPhotoUrl: FALLBACK_ABOUT.joelPhotoUrl,
      bio: FALLBACK_ABOUT.bio,
      teamMembers: FALLBACK_ABOUT.teamMembers,
      credentials: FALLBACK_ABOUT.credentials,
    };
  }
  return {
    joelPhotoUrl: doc.joelPhotoUrl || FALLBACK_ABOUT.joelPhotoUrl,
    bio: doc.bio?.length ? doc.bio : FALLBACK_ABOUT.bio,
    teamMembers: doc.teamMembers ?? [],
    credentials: doc.credentials?.length ? doc.credentials : null,
  };
});

export const getProcessPage = cache(async (): Promise<ProcessPageContent> => {
  if (!hasSanity) return FALLBACK_PROCESS;
  const doc = await safeSanityFetch<Partial<ProcessPageContent>>(processQuery, undefined, { tags: ["process-page"] });
  if (!doc) return FALLBACK_PROCESS;
  return {
    intro: doc.intro?.trim() || FALLBACK_PROCESS.intro,
    sections: doc.sections?.length ? (doc.sections as ProcessPageContent["sections"]) : FALLBACK_PROCESS.sections,
    capacityCallout: doc.capacityCallout?.trim() || FALLBACK_PROCESS.capacityCallout,
    phaseTwoNote: doc.phaseTwoNote?.trim() ?? FALLBACK_PROCESS.phaseTwoNote,
  };
});

export const getContactPage = cache(async (): Promise<ContactPageContent> => {
  if (!hasSanity) return FALLBACK_CONTACT;
  const doc = await safeSanityFetch<Partial<ContactPageContent>>(contactQuery, undefined, { tags: ["contact-page"] });
  if (!doc) return FALLBACK_CONTACT;
  return {
    intro: doc.intro?.trim() || FALLBACK_CONTACT.intro,
    contactEmail: doc.contactEmail?.trim() || FALLBACK_CONTACT.contactEmail,
    phone: doc.phone?.trim() || FALLBACK_CONTACT.phone,
    licenseBonding: doc.licenseBonding?.length ? doc.licenseBonding : FALLBACK_CONTACT.licenseBonding,
    serviceArea: doc.serviceArea?.length ? doc.serviceArea : FALLBACK_CONTACT.serviceArea,
    minimumProjectSizeNote: doc.minimumProjectSizeNote?.trim() || FALLBACK_CONTACT.minimumProjectSizeNote,
  };
});

export const getWorkPage = cache(async (): Promise<WorkPageContent> => {
  if (!hasSanity) return FALLBACK_WORK;
  const doc = await safeSanityFetch<{ intro?: string }>(workQuery, undefined, { tags: ["work-page"] });
  if (!doc) return FALLBACK_WORK;
  return { intro: doc.intro?.trim() || FALLBACK_WORK.intro };
});

export const getPartnersPage = cache(async (): Promise<PartnersPageContent> => {
  if (!hasSanity) return FALLBACK_PARTNERS;
  const doc = await safeSanityFetch<{ intro?: string }>(partnersQuerySingleton, undefined, { tags: ["partners-page"] });
  if (!doc) return FALLBACK_PARTNERS;
  return { intro: doc.intro?.trim() || FALLBACK_PARTNERS.intro };
});

export const getSiteSettings = cache(async (): Promise<SiteSettingsContent> => {
  if (!hasSanity) return FALLBACK_SITE_SETTINGS;
  const doc = await safeSanityFetch<Partial<SiteSettingsContent>>(siteSettingsQuery, undefined, {
    tags: ["site-settings"],
  });
  if (!doc) return FALLBACK_SITE_SETTINGS;
  return {
    footerTagline: doc.footerTagline || FALLBACK_SITE_SETTINGS.footerTagline,
    licenseBondingText: doc.licenseBondingText || FALLBACK_SITE_SETTINGS.licenseBondingText,
    serviceAreaNote: doc.serviceAreaNote || FALLBACK_SITE_SETTINGS.serviceAreaNote,
  };
});

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!hasSanity) return placeholderProjects;
  const rows = await safeSanityFetch<Parameters<typeof mapSanityProject>[0][]>(projectsQuery, undefined, {
    tags: ["project"],
  });
  return rows?.length ? rows.map(mapSanityProject) : placeholderProjects;
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const fallback = placeholderProjects.filter((p) => p.featured).slice(0, 3);
  if (!hasSanity) return fallback;
  const rows = await safeSanityFetch<Parameters<typeof mapSanityProject>[0][]>(featuredProjectsQuery, undefined, {
    tags: ["project", "home-page"],
  });
  return rows?.length ? rows.map(mapSanityProject) : fallback;
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  if (!hasSanity) return placeholderProjects.find((p) => p.slug === slug);
  const row = await safeSanityFetch<Parameters<typeof mapSanityProject>[0]>(
    projectBySlugQuery,
    { slug },
    { tags: ["project", `project:${slug}`] },
  );
  if (!row) {
    const fallback = placeholderProjects.find((p) => p.slug === slug);
    return fallback;
  }
  return mapSanityProject(row);
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  if (!hasSanity) return placeholderPartners;
  const rows = await safeSanityFetch<Partner[]>(partnersQuery, undefined, { tags: ["partner", "partners-page"] });
  return rows?.length ? rows : placeholderPartners;
});

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  if (!hasSanity) return placeholderProjects.map((project) => project.slug);
  const rows = await safeSanityFetch<{ slug?: string }[]>(projectSlugsQuery, undefined, {
    tags: ["project"],
    revalidate: 3600,
  });
  return rows?.map((row) => row.slug).filter((slug): slug is string => Boolean(slug)) ?? [];
});
