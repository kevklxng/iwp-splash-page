export const apiVersion = "2025-04-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const useCdn = process.env.NODE_ENV === "production";

export const hasSanity = projectId !== "placeholder";
