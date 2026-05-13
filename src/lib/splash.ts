/** Splash / coming-soon mode: set NEXT_PUBLIC_SPLASH_MODE=true in env. */
export const isSplashMode = process.env.NEXT_PUBLIC_SPLASH_MODE === "true";

/** Facebook page URL for splash CTAs. */
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/Templetoncustomhomes/";
