import { groq } from "next-sanity";
import { cache } from "react";
import { sanityClient } from "../sanity/client";
import { hasSanity } from "../sanity/env";
import { placeholderPartners, placeholderProjects, type Partner, type Project } from "./content";

const projectsQuery = groq`*[_type == "project"] | order(order asc, year desc){
  _id,title,"slug":slug.current,location,year,type,style,description,featured,isPlaceholder,
  "heroImage": heroImage.asset->url
}`;

const partnersQuery = groq`*[_type == "partner"] | order(order asc){
  _id,name,category,role,website,note
}`;

const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc, year desc)[0...3]{
  _id,title,"slug":slug.current,location,year,type,style,description,featured,isPlaceholder,
  "heroImage": heroImage.asset->url
}`;

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!hasSanity) return placeholderProjects;
  const rows = await sanityClient.fetch<Project[]>(projectsQuery);
  return rows?.length ? rows : placeholderProjects;
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const fallback = placeholderProjects.filter((p) => p.featured).slice(0, 3);
  if (!hasSanity) return fallback;
  const rows = await sanityClient.fetch<Project[]>(featuredProjectsQuery);
  return rows?.length ? rows : fallback;
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
});

export const getPartners = cache(async (): Promise<Partner[]> => {
  if (!hasSanity) return placeholderPartners;
  const rows = await sanityClient.fetch<Partner[]>(partnersQuery);
  return rows?.length ? rows : placeholderPartners;
});

export const defaultPageContent = {
  home: {
    heroHeadline: "Custom homes built with open books.",
    heroSubhead:
      "High-end coastal homes and remodels in Newport Beach, Costa Mesa, and Corona del Mar - built with itemized bids, monthly receipts, and direct access to the owner on every project.",
    positioning:
      "Most builders in Newport and Costa Mesa are overpriced and impersonal. Templeton Custom Homes delivers the same coastal luxury at a fair cost - with full transparency, direct owner access, and zero budget surprises.",
    whatWeDo:
      "Custom new builds ($500K-$20M), remodels, additions, and ADUs. Service area: Newport Beach, Costa Mesa, Corona del Mar, Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine. Style-agnostic - every project is custom-fitted to the client's vision.",
  },
};
