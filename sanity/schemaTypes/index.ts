import { defineArrayMember, defineField, defineType } from "sanity";

const richText = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "type", type: "string", options: { list: ["New Build", "Remodel", "Addition", "ADU"] }, validation: (r) => r.required() }),
    defineField({ name: "style", type: "string" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({ name: "description", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "details", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "value", type: "string" })] })] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "isPlaceholder", type: "boolean", initialValue: true }),
  ],
});

const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["Architect", "Interior Designer", "Landscape Architect"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "note", type: "text" }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
});

const pageType = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineType({ name, title, type: "document", fields });

const homePage = pageType("homePage", "Home Page", [
  defineField({ name: "heroHeadline", type: "string" }),
  defineField({ name: "heroSubhead", type: "text" }),
  defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
  defineField({ name: "positioningStatement", type: "text" }),
  defineField({ name: "selectedWork", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })] }),
  defineField({ name: "whatWeDo", type: "array", of: [defineArrayMember({ type: "block" })] }),
  defineField({
    name: "differencePillars",
    type: "array",
    of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" })] })],
  }),
  defineField({ name: "aboutPreviewText", type: "array", of: [defineArrayMember({ type: "block" })] }),
  defineField({ name: "aboutPreviewPhoto", type: "image", options: { hotspot: true } }),
  defineField({ name: "closingCtaCopy", type: "string" }),
]);

const aboutPage = pageType("aboutPage", "About Page", [
  defineField({ name: "joelPhoto", type: "image", options: { hotspot: true } }),
  defineField({ name: "bio", type: "array", of: [defineArrayMember({ type: "block" })] }),
  defineField({ name: "teamMembers", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" }), defineField({ name: "photo", type: "image", options: { hotspot: true } })] })] }),
  defineField({ name: "credentials", type: "array", of: [defineArrayMember({ type: "block" })] }),
]);

const processPage = pageType("processPage", "Process Page", [
  defineField({ name: "intro", type: "text" }),
  defineField({ name: "sections", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "body", type: "text" })] })] }),
  defineField({ name: "capacityCallout", type: "text" }),
]);

const contactPage = pageType("contactPage", "Contact Page", [
  defineField({ name: "intro", type: "text" }),
  defineField({ name: "contactEmail", type: "string" }),
  defineField({ name: "phone", type: "string" }),
  defineField({ name: "licenseBonding", type: "array", of: [defineArrayMember({ type: "block" })] }),
  defineField({ name: "serviceArea", type: "array", of: [defineArrayMember({ type: "block" })] }),
  defineField({ name: "minimumProjectSizeNote", type: "string" }),
]);

const workPage = pageType("workPage", "Work Page", [defineField({ name: "intro", type: "text" })]);
const partnersPage = pageType("partnersPage", "Partners Page", [defineField({ name: "intro", type: "text" })]);

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "footerTagline", type: "string" }),
    defineField({ name: "licenseBondingText", type: "string" }),
    defineField({ name: "serviceAreaNote", type: "text" }),
  ],
});

const formSubmission = defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "projectType", type: "string" }),
    defineField({ name: "budgetRange", type: "string" }),
    defineField({ name: "timeline", type: "string" }),
    defineField({ name: "drawingsStatus", type: "string" }),
    defineField({ name: "projectLocation", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "sourcePage", type: "string" }),
    defineField({ name: "submittedAt", type: "datetime" }),
  ],
});

export const schemaTypes = [
  project,
  partner,
  homePage,
  aboutPage,
  processPage,
  contactPage,
  workPage,
  partnersPage,
  siteSettings,
  formSubmission,
  richText,
];
