import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import { isSplashMode } from "@/lib/splash";

const STATIC_PATHS = ["", "/work", "/about", "/process", "/partners", "/contact"] as const;

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  if (isSplashMode()) {
    return [
      {
        url: SITE_URL,
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }

  const slugs = await getProjectSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
