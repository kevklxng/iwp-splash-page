export type Project = {
  _id: string;
  title: string;
  slug: string;
  location: string;
  year: number;
  type: string;
  style?: string;
  heroImage: string;
  description: string;
  gallery?: string[];
  details?: { label: string; value: string }[];
  featured?: boolean;
  isPlaceholder?: boolean;
};

export type Partner = {
  _id: string;
  name: string;
  category: "Architect" | "Interior Designer" | "Landscape Architect";
  role?: string;
  website?: string;
  note?: string;
};

export const placeholderProjects: Project[] = [
  {
    _id: "p1",
    title: "Placeholder Project 01 - Newport Beach",
    slug: "placeholder-project-01-newport-beach",
    location: "Newport Beach, CA",
    year: 2026,
    type: "New Build",
    style: "Coastal Contemporary",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    description:
      "[PLACEHOLDER: Project description - 2-3 paragraphs covering the client's brief, the architectural approach, and a notable detail of the build. Replace with real copy when photo shoot is complete.]",
    featured: true,
    isPlaceholder: true,
  },
  {
    _id: "p2",
    title: "Placeholder Project 02 - Corona del Mar",
    slug: "placeholder-project-02-corona-del-mar",
    location: "Corona del Mar, CA",
    year: 2025,
    type: "Remodel",
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80",
    description: "[PLACEHOLDER: Project description pending.]",
    featured: true,
    isPlaceholder: true,
  },
  {
    _id: "p3",
    title: "Placeholder Project 03 - Costa Mesa",
    slug: "placeholder-project-03-costa-mesa",
    location: "Costa Mesa, CA",
    year: 2024,
    type: "Addition",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
    description: "[PLACEHOLDER: Project description pending.]",
    featured: true,
    isPlaceholder: true,
  },
  {
    _id: "p4",
    title: "Placeholder Project 04 - Laguna Beach",
    slug: "placeholder-project-04-laguna-beach",
    location: "Laguna Beach, CA",
    year: 2023,
    type: "ADU",
    heroImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2000&q=80",
    description: "[PLACEHOLDER: Project description pending.]",
    isPlaceholder: true,
  },
  {
    _id: "p5",
    title: "Placeholder Project 05 - Dana Point",
    slug: "placeholder-project-05-dana-point",
    location: "Dana Point, CA",
    year: 2023,
    type: "New Build",
    heroImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2000&q=80",
    description: "[PLACEHOLDER: Project description pending.]",
    isPlaceholder: true,
  },
  {
    _id: "p6",
    title: "Placeholder Project 06 - Huntington Beach",
    slug: "placeholder-project-06-huntington-beach",
    location: "Huntington Beach, CA",
    year: 2022,
    type: "Remodel",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80",
    description: "[PLACEHOLDER: Project description pending.]",
    isPlaceholder: true,
  },
];

export const placeholderPartners: Partner[] = [
  { _id: "a1", name: "Placeholder Architect Studio", category: "Architect", role: "Principal Architect" },
  { _id: "a2", name: "Coastal Forms Architecture", category: "Architect", role: "Residential Architecture" },
  { _id: "i1", name: "Placeholder Interiors Group", category: "Interior Designer", role: "Interior Designer" },
  { _id: "i2", name: "Harbor Interior Atelier", category: "Interior Designer", role: "Principal Designer" },
  { _id: "l1", name: "Placeholder Landscape Studio", category: "Landscape Architect", role: "Landscape Architect" },
  { _id: "l2", name: "Pacific Outdoor Design", category: "Landscape Architect", role: "Landscape Designer" },
];
