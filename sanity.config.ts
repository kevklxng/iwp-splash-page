import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { deskStructure } from "./sanity/deskStructure";

const FALLBACK_PROJECT_ID = "zh4olrxs";
const FALLBACK_DATASET = "production";

function normalizeEnv(value: string | undefined, fallback: string) {
  const raw = (value ?? "").trim();
  if (!raw) return fallback;
  if (raw.startsWith("<") && raw.endsWith(">")) {
    const unwrapped = raw.slice(1, -1).trim();
    return unwrapped || fallback;
  }
  return raw;
}

export default defineConfig({
  name: "default",
  title: "Templeton Custom Homes",
  // Studio deploys do not automatically read Next.js `.env.local`,
  // so keep a real fallback to avoid deploying with "placeholder".
  projectId: normalizeEnv(
    process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    FALLBACK_PROJECT_ID,
  ),
  dataset: normalizeEnv(
    process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET,
    FALLBACK_DATASET,
  ),
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
