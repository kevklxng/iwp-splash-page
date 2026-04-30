# Design Direction

Visual and design system guidance for the Templeton Custom Homes site. This document is intentionally directional, not prescriptive — Cursor should make sensible decisions where specifics aren't given.

See [`README.md`](./README.md) for project scope and [`CONTENT.md`](./CONTENT.md) for page-level content.

---

## Overall Feel

**High-end coastal, not flashy.** This is a builder of $1M–$20M homes in Newport Beach. The design should feel like the kind of architectural monograph you'd find on a coffee table in a Corona del Mar living room — confident, restrained, and quietly expensive.

Reference sites (PC Patterson, RDM, Well Done Builders) are **general inspiration only**. Do not match specific layouts or copy patterns. Take the cues from the category — generous whitespace, large editorial photography, restrained typography, low UI density — but make TCH feel distinct.

What this site should *not* feel like:
- A generic SaaS landing page (gradient hero with three feature cards in a row)
- A real estate listing site (dense, photo-heavy grids with overlay text)
- A flashy luxury brand (gold accents, animated transitions, big serifs in italic)
- A typical contractor site (stock photos, "we build dreams" headlines, contact form in a sidebar)

Think: **architectural firm meets editorial magazine**, scaled for a builder.

---

## Color Palette — TBD

Final palette is pending input from Kevin. Use the placeholder system below for v1 and structure CSS so a global swap is straightforward (CSS custom properties or a Tailwind config token layer — Cursor's call).

### Placeholder palette (coastal-neutral)

Use as starting values. Cursor is encouraged to refine these into something that holds together — these are only meant to communicate the *feel*.

```
--color-bg:           #FAFAF7   (warm off-white — primary background)
--color-bg-alt:       #F1EEE8   (slightly darker — section breaks)
--color-ink:          #1F2A2E   (deep charcoal-blue — body text, headings)
--color-ink-muted:    #5C6670   (muted slate — secondary text)
--color-line:         #D9D4CA   (sand — hairlines, dividers)
--color-accent:       #5E7A7D   (deep coastal teal — sparing use, links/CTAs)
--color-accent-deep:  #2E4549   (deeper version for hover/active)
```

Avoid: pure white backgrounds, pure black text, navy-blue stock-photo "professional" palettes, anything beachy-cliché (turquoise, coral, sandy yellows).

---

## Typography

**Direction: all serif** — traditional, high-end, editorial. This is the most opinionated design call in the brief; lean into it.

### Suggested approach

Use one serif family for everything, with weight and size doing the work to differentiate display from body. If a single family doesn't have enough range, pair a display serif with a text serif — but keep both serif. No sans-serif for body copy.

Suggested font candidates (Cursor: pick one set, document the choice):

- **Display + body in one family:** GT Sectra, Canela, Tiempos, Source Serif 4
- **Display / body pair:** Playfair Display + Lora, GT Super + Tiempos Text

### Type scale (suggested, mobile-first)

| Use | Size (mobile → desktop) | Weight | Notes |
| --- | --- | --- | --- |
| Hero / display | 40px → 72px | 400 | Tight tracking, generous line-height |
| H1 | 32px → 48px | 400 | |
| H2 | 24px → 32px | 500 | |
| H3 | 20px → 24px | 500 | |
| Body | 17px → 18px | 400 | 1.6–1.7 line-height |
| Body small | 14px → 15px | 400 | Captions, meta |
| Eyebrow / label | 12px → 13px | 500 | Tracked-out, uppercase, sparing use |

Headlines should not feel like marketing — feel like article titles. Ample line-height, no all-caps headlines (the eyebrow label is the only place uppercase appears).

---

## Logo

Logo files are pending — Joel is pulling source files from Kaylin's contact. Build with a placeholder logo (simple wordmark in the body serif) and structure the header so the swap is a single asset replacement.

The logo, once received, should not be redesigned — keep as-is.

---

## Layout & Spacing

- **Container max-width:** ~1280px for content, with editorial sections breaking wider for full-bleed imagery
- **Generous whitespace** — err on the side of more breathing room than feels comfortable
- **8px spacing scale** (8, 16, 24, 32, 48, 64, 96, 128) — keep rhythm consistent
- **One-column layouts** preferred over multi-column dashboards. This is a reading site, not a tool.

### Grid behavior

- Mobile: single column
- Tablet: occasionally two-column for portfolio grid and partner list
- Desktop: portfolio grid up to 3-up, but never feel cramped — large image tiles with metadata below, not overlay

---

## Imagery

Photography is the visual workhorse of this site. The portfolio shoot hasn't happened yet, so v1 ships with placeholders.

### Placeholder strategy

- Use neutral, architectural-looking placeholders (high-quality stock of similar coastal/modern homes is acceptable for v1 dev, but **must be clearly flagged in code as placeholders**)
- Set up consistent aspect ratios so swapping in real photography later doesn't break layouts
- Recommended ratios:
  - Hero / featured project: 16:9 or 3:2
  - Portfolio grid tiles: 4:5 (vertical) or 3:2 (horizontal) — pick one, stay consistent
  - Detail page galleries: mixed, but with consistent gutters

### Image treatment

- **No overlays of text on photos** except on the home hero, and even there keep text restrained
- **No filters or color treatments** — photography ships as-shot
- **Lazy-load everything below the fold**, modern formats (WebP/AVIF) with appropriate fallbacks

---

## Component Patterns

Cursor: build these as a small, reusable component library. Don't over-engineer — these are the primitives the site needs, not a full design system.

### Navigation

- Top header: logo left, nav links right, "Contact" or "Start a Project" as the only emphasized link
- Sticky on scroll, with subtle background blur or solid fill once scrolled
- Mobile: hamburger to full-screen menu, not a slide-in drawer

### Buttons

Two variants is enough for v1:

- **Primary** — solid accent color, used for the contact CTA only
- **Secondary / link** — underlined text link, used everywhere else

No gradient buttons, no shadowed buttons, no rounded pills. Prefer subtle, restrained: 2–4px border radius, generous padding, serif type matching the site.

### Cards (portfolio tiles, partner tiles)

- Image on top, metadata below — no overlay text
- Title + location + year (or partner name + role) — that's it
- Hover state: very subtle (slight image zoom, or a thin underline appearing on the title). Avoid card-lift shadows.

### Section dividers

- Hairline rules in `--color-line`, not solid blocks
- Use whitespace as the primary divider; rules are accents

### Forms

- Single-column layout, labels above inputs (not floating labels)
- Inputs: 1px border, generous padding, no rounded corners or subtle (2px max)
- Required field indicators (small asterisk or "required" label)
- Inline validation, errors in a muted red below the field
- Submit button is the only primary button on the page

---

## Motion & Interaction

**Restraint.** This site does not need scroll-jacking, parallax, or animated section reveals. It needs to load fast, scroll smoothly, and respect the reader.

Acceptable motion:
- Subtle fade-in on initial load (hero only)
- Hover transitions on interactive elements (150–200ms, ease-out)
- Image zoom on portfolio hover (1.02x scale, slow ease)

Not acceptable:
- Scroll-triggered animations on every section
- Animated counters, typewriter text, marquee scrollers
- Loading spinners or skeleton screens (the site is small and static enough not to need them)

---

## Accessibility

Non-negotiable baseline:
- WCAG AA color contrast (the placeholder palette above passes — verify the final one)
- All interactive elements keyboard-navigable with visible focus states
- Real alt text on every image (not "image" or filename — descriptive)
- Semantic HTML: actual `<nav>`, `<main>`, `<article>`, `<button>`, headings in order
- Form fields with proper labels, error messages associated with inputs (aria-describedby)
- Reduced-motion media query respected — disable hover zoom and fade-ins

---

## Responsive Breakpoints

Suggested (Cursor: adjust to whatever framework convention is in use):

- Mobile: < 640px
- Tablet: 640–1024px
- Desktop: 1024–1440px
- Wide: > 1440px

Mobile-first. The home page should look intentional at 375px width before anything else.

---

## What "Done" Looks Like Visually

A first-time visitor lands on the home page and within 5 seconds gets:
1. This is a real, established custom home builder
2. They work in coastal Orange County
3. The work looks high quality
4. There's a person behind it (Joel)
5. The vibe is honest and confident, not sales-y

If any of those reads aren't immediate, the design isn't doing its job.
