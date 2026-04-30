# Content & Page Structure

Page-by-page content, copy direction, and CMS schema for the Templeton Custom Homes site.

See [`README.md`](./README.md) for project scope and [`DESIGN.md`](./DESIGN.md) for visual direction.

---

## Voice & Tone Reference

Before writing any copy, internalize these:

- **Confident but not arrogant** — speak to clients as informed equals. They have money and taste; don't condescend.
- **Specific over vague** — use numbers, project counts, and concrete process details. "6–10 simultaneous projects" beats "we manage many projects." "$500K minimum" beats "luxury budgets."
- **Personal** — Joel is the company. His voice should come through, especially on About and Process pages.
- **No fluff** — every sentence earns its place. If a sentence could appear on any builder's website, cut it.

### Avoid

- "Luxury" used as a generic adjective
- "Dream home" anywhere on the site
- "Passion for craftsmanship" or any variant
- "We pride ourselves on..."
- Vague superlatives without proof ("the best," "world-class," "second to none")
- Phrases like "your vision, our expertise"
- "Reach out" — say "call" or "email"

### Lean into

- Specific numbers (project counts, years, percentages)
- Naming the actual practices (itemized bids, monthly invoices with receipts, fee billed as actual % complete)
- Honest constraints ("$500K minimum," "we don't take heavy remodels") — these are positioning strengths
- Joel's first-person voice on About and Process pages

---

## Site Map

```
/                    Home
/work                Portfolio (project list)
/work/[slug]         Project detail (one per project)
/about               About / Joel
/process             Process / Transparency
/partners            Partners
/contact             Contact
```

Footer present on every page. No search, no blog, no social links in v1.

---

## Page 1: Home

### Purpose

Confirm in 5 seconds that TCH is a real, high-end, trustworthy builder. Move qualified visitors toward Work or Contact.

### Structure (top to bottom)

1. **Hero**
   - Full-bleed photograph of a completed TCH project (placeholder for v1)
   - Headline overlaid or below image — short, confident, specific
   - Single subhead with the positioning
   - One CTA: "See our work" (links to /work)

   Suggested headline draft (Cursor / Joel: refine):
   > Custom homes built with open books.

   Suggested subhead:
   > High-end coastal homes and remodels in Newport Beach, Costa Mesa, and Corona del Mar — built with itemized bids, monthly receipts, and direct access to the owner on every project.

2. **Positioning block** — the core statement, given room to breathe
   > Most builders in Newport and Costa Mesa are overpriced and impersonal. Templeton Custom Homes delivers the same coastal luxury at a fair cost — with full transparency, direct owner access, and zero budget surprises.

3. **Selected work** — 3 featured projects (placeholder cards for v1)
   - Image, project title, location, year
   - "View all projects" link to /work

4. **What we do** — short, scannable
   - Custom new builds ($500K–$20M)
   - Remodels, additions, ADUs
   - Service area: Newport Beach, Costa Mesa, Corona del Mar, Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, Irvine
   - One sentence on style: "Style-agnostic — every project is custom-fitted to the client's vision."

5. **The TCH difference** — three pillars, lifted directly from the brand adjectives
   - **High-End** — premium quality without the premium mystery
   - **Honest** — itemized bids, monthly invoices with receipts, fee billed as actual % complete
   - **Dependable** — 6–10 simultaneous projects, direct owner access, personal accountability
   
   Each pillar gets one short paragraph backing it up with specifics, not adjectives.

6. **About preview** — one short paragraph about Joel, photo, link to /about

7. **Contact CTA** — closing block before the footer
   - One sentence
   - Button to /contact

### CMS fields

- Hero image (featured project photo)
- Hero headline (short text)
- Hero subhead (medium text)
- Positioning statement (rich text)
- Selected work projects (relation: 3 projects from portfolio)
- "What we do" copy block (rich text)
- "TCH difference" pillars (3 items: title + description)
- About preview text (rich text)
- About preview photo (image)
- Closing CTA copy (text)

---

## Page 2: Work (Portfolio)

### Purpose

Show the quality of TCH's work. This is what referred prospects come to see.

### Structure

- **Page intro** — one short paragraph
  > Eight projects from across coastal Orange County. New builds, remodels, additions, and ADUs — every one custom-fitted to the client.
- **Filter** (optional, v1.1) — by project type: New Build / Remodel / ADU / All. Skip for v1 if it adds complexity.
- **Project grid** — large image tiles, 2–3 columns on desktop, 1 on mobile
  - Each tile: hero image, project title, location, year, type
  - Click → detail page

### v1 placeholder approach

Build the page with 6–8 placeholder project entries in the CMS. Each placeholder should have:
- A clearly-labeled placeholder name (e.g., "Placeholder Project 01 — Newport Beach")
- A stock or generic architectural image flagged as placeholder
- Lorem-style description content
- Real-feeling metadata (location, year, type)

This way Joel can simply replace the data when the photo shoot is done — no code changes needed.

### CMS schema: Project

- `title` (string)
- `slug` (string, auto-generated)
- `location` (string — e.g., "Corona del Mar, CA")
- `year` (number)
- `type` (enum: New Build / Remodel / Addition / ADU)
- `style` (string, optional — e.g., "Coastal Cape Cod," "Modern")
- `hero_image` (image)
- `gallery` (array of images)
- `description` (rich text)
- `details` (key-value list, optional — square footage, bedrooms, etc.)
- `featured` (boolean — controls home page selection)
- `order` (number — controls grid order)
- `is_placeholder` (boolean — flag for v1, lets us filter or visually mark these)

---

## Page 3: Project Detail (`/work/[slug]`)

### Purpose

A focused look at one project. Photography does the heavy lifting.

### Structure

1. **Hero image** — full-bleed
2. **Project header** — title, location, year, type, style
3. **Description** — 1–3 short paragraphs about the project (the brief, the challenge, the outcome). Written in Joel's voice or third-person — pick one and stay consistent across projects.
4. **Gallery** — large images, single-column scroll or simple grid. No carousel.
5. **Details panel** (optional) — square footage, bedrooms/baths, completion timeline, architectural partner credit
6. **Next project** link at the bottom

### Placeholder copy for v1

For each placeholder project, use a generic but plausible description like:
> [PLACEHOLDER: Project description — 2-3 paragraphs covering the client's brief, the architectural approach, and a notable detail of the build. Replace with real copy when photo shoot is complete.]

---

## Page 4: About / Joel

### Purpose

Introduce the human behind the company. This is a referral business — people are calling because someone they trust mentioned Joel by name. The page should match what they were told.

### Structure

1. **Photo of Joel** — high quality, on-site or in-studio (placeholder for v1)
2. **Bio / origin story** — written in Joel's voice or close third-person
   - Why TCH exists
   - Joel's industry background
   - What's different about how he runs jobs
   - Personal note — what he's like to work with
3. **Team section** (small) — names and roles of key team members
4. **Industry background** — brief callout of credentials, experience, licensing

### v1 placeholder

The brief notes that Joel's origin story is "rough notes only — needs polish." For v1, build the page structure with a clearly-marked placeholder block:

> [PLACEHOLDER: Joel's origin story. Rough notes pending polish — see brief Section 7. Suggested structure: (1) what Joel did before TCH, (2) the moment he decided to start the company, (3) the specific frustration with the industry that drives the TCH approach, (4) what he wants every client experience to feel like.]

Build the page so the bio is a single rich-text CMS field — easy to swap when the final copy is ready.

### CMS fields

- Joel's photo (image)
- Bio (rich text)
- Team members (array: name, role, photo)
- Credentials block (rich text)

---

## Page 5: Process / Transparency

### Purpose

This is the page that closes deals. The TCH brand promise is honesty and transparency — this page proves it with specifics.

### Structure

1. **Page intro**
   > Most contractors guard their numbers. We publish ours. Here's how a Templeton project actually runs — from the first bid to the final invoice.

2. **How we bid** — short section
   > Every subcontractor on a TCH project is itemized in the bid. You see exactly what every line costs and where every dollar is going before any work begins.

3. **How we bill** — short section
   > Monthly invoices with actual receipts attached for every line item. Our fee is billed as actual percentage complete — never front-loaded.

4. **What you get every week** — short section
   > A written owner report covering progress, upcoming work, decisions needed, and any change orders. No surprises at the end of the month or the end of the project.

5. **What's different** — comparison block, lightly worded (not naming competitors)
   > Most builders in this market mark up subcontractor costs and bury the breakdown. Some bill 20% fees front-loaded. Some run a dozen jobs at once and you talk to a project manager, not the owner. We don't.

6. **Project capacity callout**
   > We run 6–10 projects at once. That's a deliberate cap — enough to keep the team sharp, few enough that Joel is on every site, every week.

### v1 note

**Skip the sample PDF embeds for v1** — sample budget, change order log, schedule, and weekly owner report are Phase 2. The Process page should still describe these documents in copy, just without the actual downloads.

When sample docs are added later, the page should support a "See a sample" link block at the bottom of each section.

### CMS fields

- Page intro (rich text)
- Process sections (array: title + body)
- Capacity callout (rich text)
- Sample documents block (Phase 2 — relation to uploaded PDFs)

---

## Page 6: Partners

### Purpose

Trust signal. Show the network of architects, designers, and landscape architects TCH has worked with repeatedly. Mutual referral relationships matter in this market.

### Structure

1. **Page intro**
   > Templeton Custom Homes works closely with the architects, interior designers, and landscape architects who shape coastal Orange County. These are the firms we've built with — often, and well.

2. **Partner grid** — by category:
   - Architects
   - Interior Designers
   - Landscape Architects

   Each partner: name, firm, role, optional logo, optional website link, optional short note from Joel

### v1 placeholder

Joel is compiling the full partner list. For v1, build the page with the grid structure and 2–3 placeholder entries per category. CMS schema must allow easy add/remove.

### CMS schema: Partner

- `name` (string — firm or person)
- `category` (enum: Architect / Interior Designer / Landscape Architect)
- `role` (string, optional)
- `logo` (image, optional)
- `website` (url, optional)
- `note` (text, optional)
- `order` (number)

---

## Page 7: Contact

### Purpose

Capture qualified leads, filter unqualified ones. The form is the qualifier — see [`README.md`](./README.md) for full form spec.

### Structure

1. **Page intro** — short, direct
   > Tell us about your project. Joel reads every inquiry and responds within one business day.

2. **Qualifier form** — fields specified in README.md
   - Form takes the majority of the page
   - Single column, comfortable spacing

3. **Sidebar / below form info block:**
   - Email address (display, not just `mailto`)
   - Phone number (clickable on mobile)
   - License & bonding info (text)
   - Service area summary (one paragraph)
   - Note: "Minimum project size: $500,000."

### Important copy notes

- Be transparent about the $500K minimum on the page itself, not just buried in the form. It's a feature, not a barrier.
- Suggested service area block:
  > We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach, Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.

### CMS fields

- Page intro (rich text)
- Contact email (string — also used as form recipient)
- Phone number (string)
- License & bonding text (rich text)
- Service area copy (rich text)
- Minimum project size note (string)

---

## Footer (every page)

Minimal, restrained. Three sections:

1. **Left:** TCH wordmark + tagline (one short line)
2. **Middle:** Nav links (Work / About / Process / Partners / Contact)
3. **Right:** License & bonding info, service area note, copyright

No social links in v1. No newsletter signup. No "back to top" button.

---

## Page-Level Metadata (SEO)

Every page needs:
- `<title>` — under 60 chars
- Meta description — under 160 chars
- Open Graph image (use hero image for each page)
- Canonical URL

Suggested page titles:

- Home: `Templeton Custom Homes — Newport Beach Custom Builder`
- Work: `Work — Templeton Custom Homes`
- Project detail: `[Project Title] — Templeton Custom Homes`
- About: `About Joel Templeton — Templeton Custom Homes`
- Process: `How We Build — Templeton Custom Homes`
- Partners: `Partners — Templeton Custom Homes`
- Contact: `Start a Project — Templeton Custom Homes`

Add LocalBusiness structured data on the contact page and footer with:
- Business name, address (if public — Joel to confirm), phone, email
- Service area (the cities listed above)
- Price range indicator: `$$$$`
- License number once available

---

## Content Audit Before Launch

Before going live, every page should pass these checks:

- [ ] No "luxury," "dream home," or "passion for craftsmanship" anywhere
- [ ] Every claim is backed by a specific number, process, or example
- [ ] Joel's voice is present on About and Process pages
- [ ] All `[PLACEHOLDER: ...]` blocks have been replaced
- [ ] All placeholder images have been swapped for real photography
- [ ] License & bonding info is accurate and current
- [ ] Form successfully delivers email AND stores submission
- [ ] $500K minimum is enforced in the form and stated on the Contact page
- [ ] All metadata (titles, descriptions, OG images) populated
- [ ] GA4 firing on every page
