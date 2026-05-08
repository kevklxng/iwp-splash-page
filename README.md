# Templeton Custom Homes Website

Next.js App Router marketing site with embedded Sanity Studio and CMS-driven pages.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Sanity CMS + embedded Studio at `/studio`
- Resend for contact email delivery
- GA4 (optional via env var)

## Getting Started

1. Install dependencies: `npm install`
2. Copy env: `cp .env.example .env.local`
3. Dev server: `npm run dev`

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (dataset name `production` is typical).
2. In **Project settings → API**: add CORS origin `http://localhost:3000` (allow credentials). Add your production URL when you deploy.
3. Create an **Editor** or **token with write access** for scripts and optional form submissions.
4. Put these in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=yourWriteToken
```

5. Seed starter documents (projects, partners, and all page singletons):

```bash
npm run seed:placeholders
```

6. Open **Studio**: [http://localhost:3000/studio](http://localhost:3000/studio) and edit content.

### Studio desk layout

Custom desk lives in [`sanity/deskStructure.ts`](sanity/deskStructure.ts) (not `sanity/structure.ts`) so it does not shadow the npm package path `sanity/structure`.

## Fallback content

If Sanity env vars are missing, the site still builds and renders using built-in fallbacks in [`src/lib/cms.ts`](src/lib/cms.ts) and placeholders in [`src/lib/content.ts`](src/lib/content.ts).

## CMS document types

- Singletons (fixed IDs): `home-page`, `about-page`, `process-page`, `contact-page`, `work-page`, `partners-page`, `site-settings`
- Collections: `project`, `partner`, `formSubmission` (contact form writes here when a write token is set)
