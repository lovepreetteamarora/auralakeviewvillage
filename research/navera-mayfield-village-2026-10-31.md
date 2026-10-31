# Navera article evidence

Checked October 31, 2026. Destination: the existing Aura blog. Scope: an original Navera buyer guide with an Aura comparison and contextual links to the user-supplied Navera domain. No push or production deployment.

## Intent and sources

Primary editorial intent: Navera at Mayfield Village detached homes in Brampton. Supporting intent: Navera vs. Aura, community location, advertised pricing, plans and questions before purchase. Intent is selected from the task and source content; search volume, rankings and traffic were not measured.

- https://digreenhomes.com/navera--lp — opened in the web reader. DiGreen names 38 and 41 Series detached homes at Countryside Drive and Torbram Road in Brampton and advertises a $999,999 starting price. The page qualifies prices, specifications and lot/configuration premiums. It invites requests for floor plans and release information but does not publish a complete model package, deposit schedule or lot-specific closing timetable. Its future-launch language does not establish current inventory; the article does not infer launch or sales status.
- https://naveraatmayfieldvillage.com/ — user-supplied destination; campaign parameters removed for editorial links. Web reader failed, so the public page was fetched over HTTPS with curl (HTTP 200) and its visible text parsed. Confirms independent Team Arora operation, the same basic project facts and an information enquiry rather than a reservation. Its own source-check date is October 28, 2026; the builder page was checked separately this turn.
- https://caivan.com/aura/ — opened in the web reader. Caivan describes waterfront townhomes, two-storey living, underground parking and up to three bedrooms.
- https://caivan.com/greater-toronto-area/aura/aura-towns/ — primary builder model page, returned in live search. Main and Upper Residence names and individual plan details. Existing Aura floor-plan content and the supplied builder-kit provenance in lib/project.ts corroborate the stacked format.

## Boundaries

No invented Navera model names, square footage, bedroom counts, lot widths, freehold tenure, suites, deposits, closing dates or inventory. No assumed rebate eligibility, returns, commute duration or school placement. Starting price is dated and qualified. Aura pricing is omitted to avoid comparing a historic recorded band with a newly checked Navera advertisement. No new images or image-licensing assumptions.

The existing POSTS registry supplies the blog index, latest homepage articles, static route parameters, article metadata/schema and sitemap. Existing rendering components are reused.

## Validation

- `bun install --frozen-lockfile` restored dependencies without changing the lockfile.
- `npm run build`, `npx tsc --noEmit` and `git diff --check` passed. The new article was statically generated.
- Local production server on `127.0.0.1:3097`: article, blog index, homepage, sitemap, floor-plan index and linked Main/Upper guide all returned HTTP 200.
- Parsed the article HTML and confirmed one H1, its preferred-host canonical, Article headline/date/mainEntityOfPage, one semantic comparison table and clean Navera destination links without campaign parameters.
- Confirmed the new route appears in the homepage, blog index and sitemap. Navera pricing returned HTTP 200; the enquiry fragment matches the live page’s `hero-enquiry` element.
- Existing presentation components are unchanged. No visual browser check or production deployment was performed.
