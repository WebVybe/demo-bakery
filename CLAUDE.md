# demo-bakery — Wildflour Bakehouse (WebVybe portfolio demo)

**This is not a real business.** Wildflour Bakehouse is a fictional
neighborhood bakery & coffee bar invented to showcase WebVybe's
bakery/cafe client-site template. Do not present anything here as a real
operating business (no fabricated review counts, no fake press logos, no
claim of a real physical presence beyond the demo copy).

## Why this vertical

Picked from the "Leads — San Diego Metro" Notion database using the same
logic as the salon demo: after Salon/Spa (4 leads, already built), the
Restaurant/Cafe category has the next-highest real lead signal (Shanghai
Cafe — Subpar, high confidence; Cafe Bolero — No Website, medium
confidence) — ahead of Retail (1 lead) and Service (1 lead). It also has a
verified design benchmark already in
`webvybe/toolkit/new-client-site/references/design-benchmarks.md` (Levain
Bakery), and keeps demo complexity reasonable: a menu + order-ahead
contact form, no real e-commerce/inventory/ordering system needed.

## Stack

- Vite + React 19 + TypeScript + Tailwind v4 (matches `webvybe/agency-site`
  and `webvybe/demo-salon` conventions — same button/nav-link component
  classes, same `@theme` token pattern in `src/index.css`).
- `react-router-dom` v7 for routing.
- No backend. The contact form (`src/pages/Contact.tsx`) shows a success
  state client-side only — it does not send anywhere.
- Deployed to Cloudflare Pages as a static build (`npm run build` → `dist/`).

## Design tokens

Brand palette lives in `src/index.css` under `@theme` (`--color-crust`,
`--color-wheat`, `--color-linen`, `--color-flour`, `--color-berry`,
`--color-oat`, `--color-ink`) — a toasted-crust / golden-wheat / jammy-berry
bakery-case palette. Deliberately distinct from WebVybe's own blue/green
brand AND from the clay/terracotta/pine palette used on the Salt & Stone
Wellness (salon) demo — this is this client's own identity. No hardcoded
hex values outside that token block.

## Content

All bakery-specific copy (menu, pricing, hours, address, FAQs) lives in
`src/content/bakery.ts` as a single source of truth — edit there, not
inline in components.

## Known placeholders (flagged, not hidden)

- Gallery/hero imagery is CSS gradient art (`src/components/DecorPanel.tsx`),
  explicitly labeled as placeholder, not real photography.
- `robots.txt` disallows all crawling — this demo should not get indexed.
