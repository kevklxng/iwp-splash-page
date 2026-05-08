import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = imageUrlBuilder({ projectId, dataset });

type ImageArg = Parameters<typeof builder.image>[0];

/** Builder for Sanity image URLs (hotspot, crops). Use when you have an image field reference, not just a string URL. */
export function urlFor(source: ImageArg | null | undefined) {
  if (!source) return null;
  return builder.image(source);
}
