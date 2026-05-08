import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { deskStructure } from "./sanity/deskStructure";

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
  projectId: normalizeEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "placeholder"),
  dataset: normalizeEnv(process.env.NEXT_PUBLIC_SANITY_DATASET, "production"),
  basePath: "/studio",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
