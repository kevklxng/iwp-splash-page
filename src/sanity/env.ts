export const apiVersion = "2025-04-01";

function normalizeEnv(value: string | undefined, fallback: string) {
  const raw = (value ?? "").trim();
  if (!raw) return fallback;

  // Common copy/paste mistake: wrapping values in angle brackets from docs/templates.
  if (raw.startsWith("<") && raw.endsWith(">")) {
    const unwrapped = raw.slice(1, -1).trim();
    return unwrapped || fallback;
  }

  return raw;
}

const rawDataset = normalizeEnv(process.env.NEXT_PUBLIC_SANITY_DATASET, "production");
const rawProjectId = normalizeEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "placeholder");

const isValidDataset = /^[a-z0-9_-]+$/i.test(rawDataset);
const isValidProjectId = /^[a-z0-9]+$/i.test(rawProjectId) && rawProjectId !== "placeholder";

export const dataset = isValidDataset ? rawDataset : "production";
export const projectId = isValidProjectId ? rawProjectId : "placeholder";
export const useCdn = process.env.NODE_ENV === "production";
export const hasSanity = isValidDataset && isValidProjectId;
