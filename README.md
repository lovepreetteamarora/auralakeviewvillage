# Aura at Lakeview Village

Lead-generation site for the final release at Aura at Lakeview Village
(Caivan Communities), operated by Team Arora Realty.

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · bun

```bash
bun install
bun dev            # http://localhost:3000
bun run build      # production build
```

---

## Before this goes live

Three things are placeholders or unverified. The first two are blockers.

### 1. Brokerage email — placeholder

The phone number in `lib/project.ts` → `CONTACT` is confirmed:
**(416) 910-8923**. The inbox, `info@auralakeviewvillage.org`, is still
invented — replace it before launch. It appears in the footer and in the
`RealEstateAgent` JSON-LD.

### 2. `ACCESS_SECRET` — required in production

Signs the cookie that unlocks the floor plans. The app **throws on boot in
production** without it, deliberately: the development fallback is a fixed
string, and shipping that would let anyone forge a token and pull the plans
without registering.

```bash
openssl rand -base64 32
```

### 3. Lead delivery — currently log-only

With `LEAD_WEBHOOK_URL` unset, `/api/register` validates the lead, unlocks the
floor plans, and writes the lead to the server log. **Nothing is persisted.**
Point it at the CRM before you spend a dollar on traffic. See `.env.example`.

### Also worth confirming

The drive times in `TRANSIT` (`lib/project.ts`) are not from the builder kit.
The 2-minute walk to the waterfront is Caivan's own claim; the rest are
plausible estimates carried over from the earlier draft of this site. Verify or
drop them — the page labels them approximate, which is a caveat, not a defence.

---

## Where the facts come from

Every factual claim on the site reads from `lib/project.ts` and
`lib/floorplans.ts`. The visible copy and the JSON-LD both read from those same
constants, so a price cannot drift between what a buyer sees and what Google
parses.

Everything in them is transcribed from Caivan's own material in
`Mississauga - Aura - Lakeview Village/`:

| Source document | What it establishes |
| --- | --- |
| `Aura-Final-Release-Quick-Facts.pdf` | Location, size range, beds, baths, parking |
| `FAQ - Aura.pdf` | Closing window, maintenance fees, HST rebate, conditional period, eligibility |
| `Deposit Structure - Aura Towns.pdf` | The $65,000 deposit schedule, sales gallery |
| `Included Features - Aura Towns.pdf` | Schedule C standard specifications |
| `Floorplans/*.pdf` | Per-model square footage, beds, baths |
| `Designer Choice Price Lists - Aura Towns.pdf` | Per-model upgrade options and prices |
| `Site Plan - Aura Towns.pdf` | 88 units across blocks 13–15, Ogden Park frontage |

### Corrections made against the earlier draft

The site as first scaffolded carried figures from competitor marketing pages.
The builder kit contradicts several of them, and they have been removed:

- **Product type.** The copy described "ground-oriented townhomes … not stacked
  single-level condo suites." Caivan's FAQ and Schedule C both state plainly
  that Aura Towns *are* stacked townhomes, with ground level entry. This was the
  most serious error — a buyer could have made a decision on it.
- **Address.** Briefly changed to the Lakeshore/Cawthra–Dixie corridor while
  `800 Hydro Road` could not be sourced from the kit, then **restored**: the
  brokerage confirmed 800 Hydro Road is the project's civic address. The kit
  gives only the corridor, so this is the one location fact sourced from us
  rather than from Caivan — see the note on `ADDRESS` in `lib/project.ts`. The
  sales gallery at 985 Jim Tovey Boulevard is a separate address and is kept in
  `SALES_CENTRE`; do not merge the two. The postal code is still unconfirmed.
- **Sizes.** 800–1,000 sq. ft. → 789–1,138 sq. ft.
- **Bathrooms.** "up to 2" → 1.5–2.5.
- **Price.** An exact `$528,309` → the "high $500s" band Caivan actually
  publishes.
- **Occupancy.** "Early 2028" → first tentative closing December 2027 – March 2028.
- **Floor plans.** Three invented models → the seven real ones.
- **Incentives.** A list of eight promotional incentives (a $70,000 discount, a
  $0 development charge cap, an appliance voucher, free assignment) appeared in
  no builder document. It has been replaced by `PURCHASE_FACTS` — deposit
  structure, maintenance fees, the HST rebate, the conditional period — all of
  which are documented. **Do not restore the old list without a written
  incentive sheet to back it.**
- **Phasing.** "Phase 5, 4 phases sold out" → "Final Release", which is what the
  builder calls it. The 88-home count survived: it is corroborated by the unit
  labels on the site plan.

One blog post ("What a $0 Development Charge Cap Is Actually Worth") was built
entirely on an unverifiable incentive and was replaced.

---

## The floor plan gate

Floor plans are the highest-intent asset on the site, so they are traded for a
registration rather than given away.

```
Locked   → public teaser (182px wide, blurred) + specs + "Unlock Plan"
Register → POST /api/register issues a signed httpOnly cookie
Unlocked → full-resolution sheet inline + PDF download
```

**The PDFs are not in `public/`.** They live in `assets/floorplans/` and are
reachable only through `/api/floorplans/[slug]`, which verifies the cookie. A
visitor cannot guess a static URL and skip the form, and the drawings cannot be
linked around the gate.

- `lib/access.ts` — HMAC-SHA256 signed token, 30-day expiry, constant-time compare
- `app/api/floorplans/[slug]/route.ts` — gated PDF
- `app/api/floorplans/[slug]/preview/route.ts` — gated full-resolution image
- `app/api/access/route.ts` — unlock status, so the homepage can stay static

This is a marketing gate, not a security boundary — the same PDFs are handed out
at the sales centre. It is built to stop casual circumvention, nothing more.

### What is deliberately *not* gated

Every model's name, square footage, bed and bath count, and designer choice
pricing renders in the server HTML for everyone. Those are the terms a buyer
searches for; hiding them would cost the ranking that brings the buyer here in
the first place. Only the drawing is behind the form.

The public teaser is a 400px square crop — enough to show the shape of the plan,
too coarse to read a dimension off. That is what lets it be crawled without
giving the asset away.

### Regenerating the previews

If a floor plan PDF changes, rebuild both preview tiers (requires poppler:
`brew install poppler`):

```bash
for f in assets/floorplans/*.pdf; do
  slug=$(basename "$f" .pdf)

  # Gated tier: full sheet at 150dpi, shown inline once unlocked.
  pdftoppm -jpeg -jpegopt quality=88 -r 150 -f 2 -l 2 -singlefile "$f" \
    "assets/floorplans/preview/$slug"

  # Public tier: square crop of the drawing area, then downscaled. The crop
  # keeps every card the same shape; the downscale is what makes it unreadable.
  sips -c 1275 1275 --cropOffset 210 0 \
    "assets/floorplans/preview/$slug.jpg" --out "/tmp/sq-$slug.jpg"
  sips -Z 400 -s format jpeg -s formatOptions 58 \
    "/tmp/sq-$slug.jpg" --out "public/floorplans/preview/$slug.jpg"
done
```

Page 2 of each PDF is the drawing sheet; page 1 is the cover. The sheets are
1275×2100 at 150dpi, and the crop offset of 210px skips the title block so the
square lands on the main and lower level drawings. If Caivan changes the sheet
layout, re-check that offset before trusting the output.

---

## Structure

```
app/
  page.tsx                     Landing page — hero, gallery, plans, purchase, location, FAQ
  blog/                        Insights index and posts
  api/register/                Lead capture; issues the access cookie
  api/access/                  Unlock status
  api/floorplans/[slug]/       Gated PDF + gated preview image
  opengraph-image.tsx          Social card, generated from lib/project.ts
components/
  FloorPlanVault.tsx           The gate — locked previews, unlock form, downloads
  RegisterForm.tsx             Lead form; three instances, each with its own id prefix
  StructuredData.tsx           All JSON-LD, single source
lib/
  project.ts                   Every factual claim about the project
  floorplans.ts                The seven models
  posts.ts                     Blog content as structured blocks
  access.ts                    Floor plan gate tokens
assets/floorplans/             Gated PDFs and full-resolution previews — NOT public
public/renderings/             Caivan renderings, resized to 2000px
public/floorplans/preview/     Low-resolution public teasers
```

## SEO

- One `<h1>` per page; sections carry stable `id` anchors used by the nav
- JSON-LD `@graph`: WebSite, RealEstateAgent, ApartmentComplex, Product,
  Place, FAQPage, BreadcrumbList — plus Article on each post
- `FAQPage` schema is corroborated by FAQ text that ships in the server HTML,
  rendered with `<details>` so it is present without JavaScript
- `robots.txt` disallows `/api/`; gated routes also send `X-Robots-Tag: noindex`
- No `aggregateRating` or `review` markup: there is no genuine review corpus,
  and fabricating one is both a Google spam violation and a RECO advertising
  problem

## Compliance

`DISCLAIMER` in `lib/project.ts` renders in the footer of every page. It states
that this is an independent brokerage site, that it is not the official site of
Caivan, Lakeview Village, or RARE Real Estate (the exclusive listing brokerage),
that figures are preliminary and subject to change, that renderings are artist's
concepts, and that the site is not intended to solicit buyers or sellers already
under contract. Keep it in the footer.
