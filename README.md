# IWP Splash Page

Next.js App Router marketing site with splash-mode Learn More form.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Vercel Postgres for form submissions
- Google Sheets via Apps Script webhook
- Resend for contact email delivery
- GA4 (optional via env var)

## Contact form (email, Sheets, Postgres)

Submissions go to `POST /api/contact`. Setup, Resend domain checks, Google Apps Script / Sheets troubleshooting, and **Vercel environment variables** are documented in [`docs/forms-verification.md`](docs/forms-verification.md). To verify only the Sheet webhook (uses `.env.local`): `npm run test:sheets`.

## Getting Started

1. Install dependencies: `npm install`
2. Copy env: `cp .env.example .env.local`
3. Dev server: `npm run dev`

## Static content

Marketing page copy and placeholder projects live in [`src/lib/cms.ts`](src/lib/cms.ts) and [`src/lib/content.ts`](src/lib/content.ts). Edit those files to update non-splash pages when `SPLASH_MODE` is disabled.

## Splash mode

Set `SPLASH_MODE=true` and `NEXT_PUBLIC_SPLASH_MODE=true` in `.env.local` to serve the IWP coming-soon homepage only.
