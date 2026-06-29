/** Splash / coming-soon mode: set SPLASH_MODE=true or NEXT_PUBLIC_SPLASH_MODE=true in env. */

/** Paths blocked from indexing while the splash site is live. */
export const SPLASH_DISALLOW_PATHS = [
  "/work/",
  "/about",
  "/process",
  "/partners",
  "/contact",
  "/api/",
] as const;

export function isSplashMode(): boolean {
  if (process.env.SPLASH_MODE === "false") return false;
  if (process.env.SPLASH_MODE === "true") return true;
  return process.env.NEXT_PUBLIC_SPLASH_MODE === "true";
}

export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
