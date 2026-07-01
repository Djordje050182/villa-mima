# Villa Mima — villamima.com

High-end boutique holiday villa in Muo, Bay of Kotor, Montenegro. A real family home —
the site must feel aspirational (Aman-resort calibre) yet warm and personal. This file
is the source of truth for brand, design, and project rules. Stay on-brand in every session.

## The story (all true — use it, never embellish)

- Named after our mum, Mima. A centuries-old stone house (exact age unconfirmed — owner
  chose "centuries-old", never a specific number) on land in the family for over 100 years.
- Our father was born in the house and tended the gardens and herbs his whole life.
- Fully restored: original wooden beams and thick stone walls kept, luxury interiors added.
  Cool in summer, warm in winter.
- 4 bedrooms, 3 bathrooms, sleeps 8 comfortably in beds (two sofa beds take larger
  groups up to 12 — 8 is the headline figure), private pool, 10,000 m² of private land, separate
  annex, panoramic views over the entire Bay of Kotor.
- Behind the house the land climbs into the mountain: private nature trail, views over
  Boka Bay and towards Tivat. **There is no bench up there — none exists. Never mention
  one, and never write copy that implies somewhere to sit at the top (e.g. "take a
  coffee up", "a glass of wine at the viewpoint"). The trail and the views are the story.**
- Hosts on the ground: our cousins Lidija and Miro.
- Muo: the quiet, unspoilt western shore. 20 min walk / 4 min drive to Kotor's UNESCO
  old town. Tivat airport ~20 min.

## Design system

### Palette (derived from the place — never generic cream-and-terracotta)

| Token            | Hex      | Use                                   |
|------------------|----------|---------------------------------------|
| `limestone`      | #ECE7DD  | body background                       |
| `limestone-warm` | #E3DCCD  | alternate section background          |
| `teal`           | #1D4250  | deep Adriatic teal — hero, booking    |
| `bay-night`      | #13303A  | darkest — footer, overlays            |
| `sea-glass`      | #9FC4C0  | accent, links on dark, hover states   |
| `herb`           | #7A8463  | herb green — garden/land sections     |
| `ink`            | #2B2A26  | body text                             |

Defined as Tailwind v4 `@theme` tokens in `src/app/globals.css`. Always use the tokens,
never raw hex in components.

### Type

- **Fraunces** — display. Light weights (300), italics for emphasis. Big, editorial, lots of air.
- **Karla** — body and UI.
- Loaded via `next/font/google` in `src/app/layout.tsx` (`--font-fraunces`, `--font-karla`).

### Aesthetic signature: the vertical slice of hillside

The whole site reads as a cross-section of the hillside — **the bay below, the villa,
the mountain behind**. Recurring structural motif:

- Home-page sections move through these strata (dark bay tones → limestone villa tones →
  herb-green mountain tones → back down to the bay for booking/footer).
- Section transitions use the contour divider (`src/components/ContourDivider.tsx`).
- Desktop shows a subtle fixed "elevation rail" on the left edge
  (`src/components/ElevationRail.tsx`) marking where you are on the hillside
  (Mountain · Villa · Bay) as you scroll.

### Tone of voice

- British English. First-person-plural family voice: "our mum", "our father's gardens".
- Aspirational but never corporate. Personal, quietly confident.
- **Banned:** exclamation marks, the word "nestled", estate-agent clichés
  ("boasts", "stunning", "must-see", "hidden gem").

### Photography

- Full-bleed, photography-led. Owner supplies all photos.
- Build with the `ImageSlot` component (clearly named slot ids); every required shot is
  listed in `public/images/README.md` with recommended dimensions. Drop a real image at
  the documented path and the slot renders it automatically.

### Quality floor

- Fully responsive, Lighthouse 95+ performance & SEO (hard requirement).
- Accessible: semantic HTML, focus states, alt text, colour contrast.
- `prefers-reduced-motion` respected for all animation.

## Pages (keep it tight — 5)

1. `/` Home — single scrolling narrative: hero → story → the villa → the land & mountain → location → reviews → direct booking.
2. `/villa` The Villa — rooms, annex, pool, amenities, gallery.
3. `/explore` Explore — curated local guide (cable car lead item, verified recommendations).
4. `/availability` Availability & Booking — calendar + enquiry form.
5. `/contact` Contact / practical info (getting here, old-road border crossing tip).

## Booking & calendar — hard rules

- Availability syncs via SyncBnB (Hosthub). Public calendar JSON endpoint (availability
  only, no guest data — but it has no CORS headers, so fetch it **server-side only**):
  `https://app.hosthub.com/public/rentals/978101/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD`
  Returns blocked ranges as FullCalendar-style events; dates in compact ISO `YYYYMMDDTHHmmssZ`.
  Blocked nights = start date through end date − 1 (the end date is checkout day, bookable).
  Fetched in `src/lib/availability.ts` with ISR revalidation and an error fallback.
- **NEVER use or request the private iCal URL.** It contains guest personal data and must
  never appear in code, the repo, or env files.
- Primary CTA everywhere: **"Check availability"** → `/availability` (direct enquiry).
- Enquiry form: dates, guests, email, message → stored in Supabase **and** emailed to the
  owner (Resend). API route: `src/app/api/enquiry/route.ts`. Schema: `supabase/schema.sql`.
- Direct booking message: "Book direct with the family — best rate, no platform fees."
  Airbnb / Booking.com links live quietly in the footer only.

## Payments (future)

- **No live payments yet.** Stripe will be added later for DIRECT-booking deposits only.
- Stub lives at `src/lib/payments.ts`; env placeholders (`STRIPE_SECRET_KEY`,
  `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) in `.env.example`.
- **Out of scope, do not touch:** Booking.com cannot pay out to Montenegro, so
  ChargeAutomation collects payments for Booking.com reservations. That channel flow
  stays exactly as-is. Stripe work is for direct bookings only.

## SEO

- schema.org `VacationRental` structured data (`src/lib/structuredData.ts`), OpenGraph,
  per-page metadata, `src/app/sitemap.ts`, `src/app/robots.ts`.
- Target phrases: "luxury villa Kotor", "private villa with pool Montenegro",
  "Kotor Bay holiday villa".

## Stack & conventions

- Next.js (App Router, `src/` dir) + Tailwind v4 (CSS `@theme` config) + TypeScript.
- Static-first: every page statically generated except API routes; availability uses ISR.
- No heavy dependencies; the enquiry route talks to Supabase REST and Resend with plain `fetch`.
- Deploys on Vercel. Env vars documented in `.env.example` and `README.md`.
- Commit in logical chunks with clear messages.
