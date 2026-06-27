import type { Metadata } from "next";
import { createElement } from "react";

export const SITE_NAME = "IWP";
export const SITE_TAGLINE = "Bringing Stories to Life";
export const DEFAULT_DESCRIPTION =
  "Itibari, Waynne & Partners — bringing stories to life through visionary investment and creative partnerships.";

const DEFAULT_SITE_URL = "https://www.iwp.fund";

/** Canonical production origin (no trailing slash). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = getSiteUrl();

export const DEFAULT_OG_IMAGE_PATH = "/splash-hero-bg.png";
export const DEFAULT_OG_IMAGE = {
  url: DEFAULT_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
} as const;

export const ORGANIZATION_SAME_AS = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
].filter(Boolean);

export const BUSINESS_CONTACT = {
  email: "info@iwp.fund",
  phone: "",
  telephoneDisplay: "",
} as const;

type BreadcrumbItem = { name: string; path: string };

function formatTelephone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return phone;
}

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${SITE_URL}${normalized}`;
}

export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage,
  ogType = "website",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path: string;
  ogImage?: string | { url: string; width?: number; height?: number; alt?: string };
  ogType?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const image =
    typeof ogImage === "string"
      ? { url: ogImage, width: 1200, height: 630, alt: title }
      : ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: ogType,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [typeof image === "object" && "url" in image ? image.url : image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/iwp-logo.svg"),
    email: BUSINESS_CONTACT.email,
    telephone: BUSINESS_CONTACT.phone,
    sameAs: ORGANIZATION_SAME_AS,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Global",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeAndConstructionBusinessSchema() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    description: DEFAULT_DESCRIPTION,
    email: BUSINESS_CONTACT.email,
    telephone: BUSINESS_CONTACT.phone,
    priceRange: "$$$$",
    sameAs: ORGANIZATION_SAME_AS,
    areaServed: [
      "Newport Beach",
      "Costa Mesa",
      "Corona del Mar",
      "Laguna Beach",
      "Dana Point",
      "San Clemente",
      "Huntington Beach",
      "Anaheim",
      "Irvine",
    ].map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "California" },
    })),
    founder: {
      "@type": "Person",
      name: "Joel Templeton",
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function buildLocalBusinessSchema(options: {
  description: string;
  email: string;
  telephone: string;
}) {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/contact#localbusiness`,
    name: SITE_NAME,
    url: absoluteUrl("/contact"),
    image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    description: options.description,
    email: options.email,
    telephone: formatTelephone(options.telephone),
    priceRange: "$$$$",
    sameAs: ORGANIZATION_SAME_AS,
    areaServed: [
      "Newport Beach",
      "Costa Mesa",
      "Corona del Mar",
      "Laguna Beach",
      "Dana Point",
      "San Clemente",
      "Huntington Beach",
      "Anaheim",
      "Irvine",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Newport Beach",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
}

export function buildCreativeWorkSchema(project: {
  title: string;
  slug: string;
  description: string;
  location: string;
  year: string | number;
  type: string;
  heroImage: string;
}) {
  return {
    "@type": "CreativeWork",
    "@id": `${absoluteUrl(`/work/${project.slug}`)}#project`,
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/work/${project.slug}`),
    image: project.heroImage,
    dateCreated: String(project.year),
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location,
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    creator: { "@id": `${SITE_URL}/#organization` },
    about: project.type,
  };
}

export function buildFaqPageSchema(
  sections: { title: string; body: string }[],
  intro?: string,
) {
  const entities: { "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }[] =
    [];

  if (intro?.trim()) {
    entities.push({
      "@type": "Question",
      name: "How does IWP approach its work?",
      acceptedAnswer: { "@type": "Answer", text: intro.trim() },
    });
  }

  for (const section of sections) {
    entities.push({
      "@type": "Question",
      name: section.title,
      acceptedAnswer: { "@type": "Answer", text: section.body },
    });
  }

  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/process")}#faq`,
    mainEntity: entities,
  };
}

export function buildSchemaGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

type JsonLdData = Record<string, unknown> | { "@context": string; "@graph": unknown[] };

export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
    },
  });
}
