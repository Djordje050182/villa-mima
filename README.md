# Villa Mima — villamima.com

The website for Villa Mima, a restored centuries-old stone villa in Muo, Bay of Kotor,
Montenegro. Next.js (App Router) + Tailwind v4, static-first, deployed on Vercel.
Brand and design rules live in [CLAUDE.md](./CLAUDE.md). The photo shot list lives in
[public/images/README.md](./public/images/README.md).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Resend keys (see below)
npm run dev                  # http://localhost:3000
```

The site runs fine with no env vars at all — the enquiry form will just report that it
could not send, and everything else works. The availability calendar needs no keys
(it reads Hosthub's public calendar, which contains no guest data).

## 1 · Supabase setup (enquiry storage) — ~5 minutes

1. Go to [supabase.com](https://supabase.com) → New project. Name it `villa-mima`,
   choose the **Frankfurt (eu-central-1)** region (closest to most guests), set a
   strong database password (you won't need it day-to-day).
2. When the project is ready, open **SQL Editor** → New query, paste the entire
   contents of [`supabase/schema.sql`](./supabase/schema.sql), and click **Run**.
3. Go to **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (under "Project API keys" — click reveal) → `SUPABASE_SERVICE_ROLE_KEY`
4. Put both in `.env.local` (local) and in Vercel env vars (production).

**Viewing enquiries:** Supabase dashboard → **Table Editor** → `enquiries`. Newest
first. Use the `status` column (`new` / `replied` / `booked` / `closed`) to keep track.

> The service-role key bypasses row-level security — it must only ever live in env
> vars, never in code, and never with a `NEXT_PUBLIC_` prefix.

## 2 · Resend setup (enquiry emails) — ~5 minutes

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day, plenty).
2. Create an API key → `RESEND_API_KEY`.
3. Set `ENQUIRY_TO_EMAIL` to your inbox (defaults to dj1982@outlook.com).
4. To send from `enquiries@villamima.com` instead of the Resend sandbox sender:
   Resend → Domains → Add `villamima.com` → add the DNS records they show you
   (do this after the DNS cutover) → then set
   `ENQUIRY_FROM_EMAIL="Villa Mima <enquiries@villamima.com>"`.

Until the domain is verified, leave the default `onboarding@resend.dev` sender —
emails still arrive, just from the sandbox address.

## 3 · Deploy on Vercel

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repo.
   Vercel auto-detects Next.js; no build settings need changing.
3. Before the first deploy, add the env vars (Settings → Environment Variables →
   Production): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
   `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`.
4. Deploy. Check the preview URL: pages, calendar, and a test enquiry.

The availability calendar revalidates hourly (ISR) — new bookings on any channel show
up on the site within the hour, with no rebuild needed.

## 4 · DNS cutover from Squarespace (villamima.com)

Do this last, once you're happy with the Vercel preview.

1. **Find where the domain is registered** (Squarespace Domains, or a third-party
   registrar pointing at Squarespace). Log in to that registrar's DNS panel.
2. In Vercel: Project → **Settings → Domains** → add `villamima.com` and
   `www.villamima.com`. Vercel shows the exact records it wants; currently:
   - `villamima.com` → **A record** → `76.76.21.21`
   - `www` → **CNAME** → `cname.vercel-dns.com`
3. In the registrar: delete the existing Squarespace records for `@` and `www`
   (Squarespace's A records point at `198.185.159.x` / `198.49.23.x`) and add the two
   Vercel records above. Leave any MX/email records untouched.
4. Wait for DNS to propagate (minutes to a few hours). Vercel issues the SSL
   certificate automatically and `www` redirects to the apex.
5. Verify: `https://villamima.com` loads the new site, padlock valid, and
   `https://villamima.com/sitemap.xml` responds.
6. Only then cancel the Squarespace site subscription (keep the domain registration
   if the domain itself is registered with Squarespace — cancelling the *site* must
   not release the *domain*).
7. Afterwards: add the domain in Resend (step 2.4) and submit the sitemap in
   [Google Search Console](https://search.google.com/search-console).

## Photos

Drop images into `public/images/` using the exact filenames in
[public/images/README.md](./public/images/README.md), commit, push — done. Slots
render tinted placeholders until their file exists.

## Architecture notes

- **Availability**: server-side fetch of Hosthub's public calendar JSON
  (`src/lib/availability.ts`). No keys, no guest data. The **private iCal URL must
  never be used anywhere in this project** (it contains guest personal data).
- **Enquiries**: `src/app/api/enquiry/route.ts` validates, stores in Supabase, emails
  via Resend (plain `fetch`, no SDKs), with a honeypot field for spam.
- **Payments**: not live. `src/lib/payments.ts` is a documented stub for future
  Stripe deposits on direct bookings only. The Booking.com → ChargeAutomation flow is
  out of scope and must not be touched.
- **SEO**: per-page metadata, `VacationRental` JSON-LD, `sitemap.xml`, `robots.txt`,
  OpenGraph (needs `public/images/og.jpg`).
