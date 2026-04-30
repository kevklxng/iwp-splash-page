# Templeton Custom Homes — Website Build

Handoff brief for Cursor. This is a marketing site for a high-end custom home builder serving Newport Beach, Costa Mesa, and surrounding Orange County coastal markets.

This document is the entry point. See also:
- [`DESIGN.md`](./DESIGN.md) — visual direction, design system, component patterns
- [`CONTENT.md`](./CONTENT.md) — page-by-page content, copy, and structure

---

## What This Site Is For

The site is a **validation tool, not a lead-gen machine**. TCH gets business through word-of-mouth and referrals. When a referred prospect Googles the company before calling, the site's job is to confirm TCH is real, credible, and worth the call.

A qualified lead is someone who:
- Has a project budget of $500K minimum
- Has architectural/structural drawings already submitted (or nearly submitted) to the city
- Is ready to start within 1–3 months
- Understands quality-first means not chasing the lowest bid

The site should filter *out* tire-kickers as much as it pulls in qualified prospects.

---

## Brand Snapshot

Three adjectives that drive every decision:

1. **High-End** — premium quality without the premium mystery
2. **Honest** — open books, no front-loading, no surprises
3. **Dependable** — direct owner access, personal accountability

Positioning statement to anchor the home page:

> Most builders in Newport and Costa Mesa are overpriced and impersonal. Templeton Custom Homes delivers the same coastal luxury at a fair cost — with full transparency, direct owner access, and zero budget surprises.

What TCH is **not**: delay-prone, over-budget, impersonal, lowest-bid-chasing.

Words to avoid (overused luxury-builder clichés): "luxury" (unqualified), "dream home," "passion for craftsmanship," vague superlatives without proof.

---

## Tech Stack

**Framework: Cursor's choice.** Recommend either Next.js (App Router) or Astro — both are strong fits for a content-driven marketing site with a CMS. Pick whichever pairs best with the CMS choice and is easier to hand off long-term.

**CMS: Required.** Joel needs to edit content himself after launch. Recommend Sanity or Payload (self-hosted option). Whatever's chosen, the following must be CMS-managed:
- Portfolio projects (title, description, photos, metadata)
- Joel's bio and team page content
- Partner list (architects, designers, landscape architects)
- Home page hero copy and key positioning blocks
- Contact info, license/bonding numbers, service area

Static/code-controlled is fine for: navigation structure, footer scaffolding, the Process page methodology copy (changes rarely).

**Hosting: Open.** Vercel, Netlify, or Cloudflare Pages all work. Pick whatever pairs cleanly with the framework + CMS choice. Document the decision in the repo.

**Form handling:** Contact form submissions must do two things:
1. Email Joel immediately
2. Store the submission in the CMS or a connected database so nothing is lost

Recommend Resend or Postmark for email delivery, and either CMS-native form storage or a lightweight DB.

**Analytics:** Google Analytics 4. Install on every page.

**Domain:** Currently on Wix. Domain transfer is a separate task Joel is handling — assume the new site will be deployed to a staging URL first, then swapped over.

---

## Scope: v1 vs Later

### v1 (this build)

- Home page with full positioning
- About / Joel page (bio uses placeholder content — see CONTENT.md)
- Portfolio shell — page exists, project detail page template exists, but populated with **placeholder/skeleton projects** until the photo shoot is done. The CMS schema must be ready so projects can be added without code changes.
- Process / Transparency page — methodology and billing approach explained in copy. **Skip the sample PDF embeds** (budget, change order log, etc.) for v1.
- Partners page — list of names and roles, logos when available
- Contact page with the qualifier form (see below)
- Footer with license/bonding info, service area note
- Google Analytics 4 installed
- Responsive (mobile-first), accessible (WCAG AA target)

### Explicitly out of scope for v1

- Blog / journal
- Podcast section or integration
- Sample document PDFs on the Process page
- Per-city service area landing pages (Newport Beach, Costa Mesa, etc. as separate routes)
- Testimonials section
- Social media footer links
- Press/awards section

### Phase 2 / future

- Real portfolio photography swap-in (8 projects)
- Sample PDFs on Process page (budget, CO log, schedule, weekly owner report)
- Per-city service area pages for local SEO
- Testimonials section once collected
- Press/awards once secured (pursuing Dwell, OC Riviera, Lux OC)
- Podcast integration
- Social links in footer

---

## Contact Form Specification

The form is the single functional piece that has to work on day one. It's also the qualifier — the form's job is to filter.

### Required fields

- **Name** (text, required)
- **Email** (email, required)
- **Phone** (tel, required)
- **Project type** (select, required): New Custom Build / Remodel / Addition / ADU / Not sure yet
- **Budget range** (select, required) — **must start at $500K**:
  - $500K–$1M
  - $1M–$3M
  - $3M–$7M
  - $7M–$15M
  - $15M+
- **Timeline** (select, required): Ready to start in 1–3 months / 3–6 months / 6–12 months / Just exploring
- **Drawings status** (select, required): Submitted to city / In progress with architect / Haven't started / Not sure
- **Project location** (text, required) — city/neighborhood
- **Message** (textarea, optional) — anything else Joel should know

### Behavior

- All required fields validate inline before submit.
- Budget dropdown does **not** include any option below $500K. There's no "under $500K" choice — this is intentional friction.
- On submit:
  1. Send formatted email to Joel (configurable address in CMS or env var)
  2. Store submission in CMS/DB with timestamp and source page
  3. Show a clear success state on the page — no redirect
- Honeypot or similar lightweight spam protection. No CAPTCHA unless spam becomes a problem.
- Confirmation message should reinforce the brand: confident, specific, no fluff. Something like "Got it. Joel will be in touch within one business day." (Cursor: refine the exact wording.)

---

## Open Items / Pending Inputs

These are flagged as TBD and need real content before launch. The build should use placeholders that are clearly marked so they're easy to swap later.

| Item | Owner | Status |
| --- | --- | --- |
| Color palette (hex codes) | Kevin | TBD — use placeholder coastal palette |
| Logo files (SVG preferred) | Joel | TBD — pulling from Kaylin's contact |
| Joel's full bio / origin story | Joel + Kevin | Rough notes only, needs polish |
| Professional project photography (8 projects) | Joel + Kevin | Shoot pending |
| Partner list (names, roles, logos) | Joel | Pending |
| Sample redacted PDFs | Joel | Pending — Phase 2 |
| Final license/bonding numbers for footer | Joel | Pending |
| Form submission email address | Joel | Pending |
| GA4 measurement ID | Kevin | Pending |
| Domain + hosting credentials | Joel | Currently on Wix, transfer pending |

---

## Project Conventions

- **Approach:** requirements-focused. This brief specifies *what* the site needs to do and contain. Architecture, file structure, component naming, and tooling decisions are Cursor's call — pick sensible conventions and document them in the repo.
- **Accessibility:** WCAG AA minimum. Real alt text on all images, semantic HTML, keyboard navigable.
- **Performance:** Lighthouse score 90+ on mobile for the home page at minimum. Lazy-load images, use modern formats (WebP/AVIF).
- **SEO basics:** proper meta tags, OG images, sitemap, robots.txt, structured data (LocalBusiness schema for the contact/footer info).
- **Placeholder content:** anywhere real content is pending, use clearly marked placeholders (e.g., `[PLACEHOLDER: Joel's origin story — see CONTENT.md]`) so they're greppable later.
