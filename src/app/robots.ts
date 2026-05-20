import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { isSplashMode, SPLASH_DISALLOW_PATHS } from "@/lib/splash";

export const dynamic = "force-dynamic";

const FULL_SITE_DISALLOW = ["/api/", "/studio/"] as const;

function buildRules(disallow: readonly string[]): MetadataRoute.Robots["rules"] {
  const agents = ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"] as const;
  return agents.map((userAgent) => ({
    userAgent,
    allow: "/",
    disallow: [...disallow],
  }));
}

export default function robots(): MetadataRoute.Robots {
  const disallow = isSplashMode() ? SPLASH_DISALLOW_PATHS : FULL_SITE_DISALLOW;

  return {
    rules: buildRules(disallow),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
