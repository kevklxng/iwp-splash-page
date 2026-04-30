# Templeton Custom Homes Website

Next.js App Router rebuild of the Templeton Custom Homes marketing site with Sanity CMS integration.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Sanity Studio at `/studio`
- Resend for contact email delivery
- GA4 (optional via env var)

## Getting Started

1. Install dependencies:
   - `npm install`
2. Create env file:
   - `cp .env.example .env.local`
3. Run development server:
   - `npm run dev`

## Placeholder Content

- The site ships with fallback placeholder content in `src/lib/content.ts` so it can run before Sanity is connected.
- Once Sanity credentials are added, run `npm run seed:placeholders` to create starter documents in Sanity.

## CMS

- Sanity Studio route: `/studio`
- Primary schemas: project, partner, homePage, aboutPage, processPage, contactPage, siteSettings, formSubmission

