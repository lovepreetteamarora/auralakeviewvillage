import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { FloorPlanVault } from "@/components/FloorPlanVault";
import { RegisterForm } from "@/components/RegisterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PUBLIC_FLOOR_PLANS } from "@/lib/floorplans";
import { POSTS_BY_DATE } from "@/lib/posts";
import {
  ADDRESS,
  BUILDER,
  BUYER_PERSONAS,
  COMMUNITY_FEATURES,
  DEPOSIT_SCHEDULE,
  DEPOSIT_TOTAL,
  GALLERY,
  INCLUDED_FEATURES,
  INVESTMENT_CASE,
  MASTER_PLAN_STATS,
  MEDIA,
  PHASE,
  PRICING,
  PROJECT,
  PURCHASE_FACTS,
  REASONS,
  SALES_CENTRE,
  SCHOOLS,
  TRANSIT,
} from "@/lib/project";

/**
 * One long-form landing page. Registration is the conversion event, and it now
 * has two distinct motivations on the page: the general "send me the price
 * list" form, and the floor plan vault, which trades a specific, high-intent
 * asset for the same details. The vault converts better because the visitor
 * knows exactly what they get.
 *
 * All imagery is Caivan's own from the builder kit. Every rendering is an
 * artist's concept and the page says so wherever they appear.
 */

const HERO_STATS = [
  { value: PRICING.fromDisplay, label: "Starting from" },
  { value: `${PRICING.sqftMin}–${PRICING.sqftMax.toLocaleString("en-CA")}`, label: "Square feet" },
  { value: `${PRICING.bedsMin}–${PRICING.bedsMax}`, label: "Bedrooms" },
  { value: PRICING.occupancyShort, label: "First closing" },
];

export default function HomePage() {
  const latest = POSTS_BY_DATE.slice(0, 3);

  return (
    <>
      <StructuredData />
      <SiteHeader />

      <main>
        {/* ---------------------------------------------------------------- Hero */}
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <Image
            src="/renderings/lakefront-ogden-park.jpg"
            alt="Aura townhomes overlooking Ogden Park with the Lake Ontario shoreline beyond"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-60"
          />
          {/* The form sits on the right half, so the scrim is weighted left to
              keep the headline legible without flattening the rendering. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
            <div>
              <p className="inline-flex items-center gap-2.5 rounded-full bg-lime px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {PROJECT.status}
              </p>

              <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                {PROJECT.name}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {PROJECT.homeType} by {PROJECT.developer} — a two-minute walk from the Lake
                Ontario waterfront in {ADDRESS.city}. {PHASE.homeCount} homes in the final
                release, from {PRICING.fromDisplay}, with underground parking included.
              </p>

              <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 border-t border-white/20 pt-8 sm:grid-cols-4">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="eyebrow text-white/50">{s.label}</dt>
                    <dd className="mt-1.5 font-serif text-lg text-white sm:text-xl">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="register" className="scroll-mt-24">
              <RegisterForm
                idPrefix="hero"
                variant="dark"
                heading="Get the Price List"
                subheading="Current pricing, deposit structure, and all seven floor plans."
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ Trust bar */}
        <section className="border-b border-black/10 bg-cream">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-black/10 px-5 sm:px-8 lg:grid-cols-4">
            {[
              { value: PROJECT.developer, label: "Builder" },
              { value: PROJECT.masterPlan, label: "Master plan" },
              { value: `${PHASE.homeCount} Homes`, label: "Final release" },
              { value: "7 Layouts", label: "Main & upper residences" },
            ].map((item, i) => (
              <div key={item.label} className={`px-4 py-7 ${i === 0 ? "pl-0" : ""}`}>
                <p className="font-serif text-lg text-ink sm:text-xl">{item.value}</p>
                <p className="eyebrow mt-1 text-ash">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ Overview */}
        <section id="overview" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div>
                <p className="eyebrow text-mauve-deep">The Opportunity</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                  Your front door by the lake
                </h2>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-ash">
                <p>
                  {PROJECT.masterPlan} is a 177-acre master-planned waterfront community on the
                  Lake Ontario shoreline in {ADDRESS.city} — homes, parks, trails, public art and
                  culture, shops, restaurants, a revitalized long pier, beaches, and an
                  innovation district, all inside one plan.
                </p>
                <p>
                  Aura is its townhome address. These are {PROJECT.productNote.toLowerCase()}:
                  Main Residences occupying the lower levels and Upper Residences above them,
                  each with its own entry at grade rather than a corridor and an elevator.
                </p>
                <p>
                  The final release is {PHASE.homeCount} homes across {PHASE.blocks.toLowerCase()},
                  fronting Aerodrome Avenue and backing onto Ogden Park. After this release,
                  there is no further builder inventory at Aura.
                </p>
              </div>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-black/10 lg:grid-cols-4">
              {MASTER_PLAN_STATS.map((stat) => (
                <div key={stat.label} className="bg-white px-6 py-8">
                  <dt className="font-serif text-3xl text-ink sm:text-4xl">{stat.value}</dt>
                  <dd className="mt-2 text-sm text-ash">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------------- Gallery */}
        <section id="gallery" className="scroll-mt-20 bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-mauve-deep">Gallery</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                Inside and out
              </h2>
            </div>

            {/* Uniform 4:3 tiles at every breakpoint, captions set below the
                image rather than burned over it — the renderings carry enough
                detail that a gradient scrim across the bottom third was eating
                the part of each shot worth looking at. */}
            <div className="mt-12 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {GALLERY.map((shot, i) => (
                <figure key={shot.src} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 border-t border-black/10 pt-3">
                    <span className="font-serif text-sm text-ash tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-ink">{shot.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 text-xs text-ash">
              Renderings are artist&rsquo;s concepts. Exterior and interior materials,
              specifications, and colour variations are subject to substitution and modification
              without notice and may vary by house type and elevation. E. &amp; O.E.
            </p>

            <div className="mt-14">
              <VideoEmbed
                vimeoId={MEDIA.vimeoId}
                title={MEDIA.videoTitle}
                poster="/renderings/courtyard-patio.jpg"
                posterAlt="The landscaped courtyard at Aura at dusk"
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Site plan */}
        <section id="site-plan" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-mauve-deep">Site Plan</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                  Where the {PHASE.homeCount} homes sit
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-ash">
                  <p>
                    The final release is {PHASE.blocks.toLowerCase()}, running along Dockpoint
                    Drive between Aerodrome Avenue and Marina Vista Street, with Ogden Park and
                    its playground directly across the street.
                  </p>
                  <p>
                    Each block stacks a Main Residence and an Upper Residence per address — the
                    &ldquo;M&rdquo; and &ldquo;U&rdquo; suffixes on the plan — which is how{" "}
                    {PHASE.homeCount} homes fit across {PHASE.mainResidences} addresses.
                  </p>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-black/10 pt-6">
                  <div>
                    <dt className="eyebrow text-ash">Main Residences</dt>
                    <dd className="mt-1.5 font-serif text-2xl text-ink">
                      {PHASE.mainResidences}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ash">Upper Residences</dt>
                    <dd className="mt-1.5 font-serif text-2xl text-ink">
                      {PHASE.upperResidences}
                    </dd>
                  </div>
                </dl>

                <a
                  href={MEDIA.sitePlan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-mauve-deep"
                >
                  Open the full site plan &rarr;
                </a>
              </div>

              <figure>
                <a href={MEDIA.sitePlan} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={MEDIA.sitePlan}
                    alt={`Site plan for ${PROJECT.name} showing ${PHASE.blocks} along Dockpoint Drive, backing onto Ogden Park`}
                    width={1500}
                    height={1925}
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="w-full rounded-xl border border-black/10"
                  />
                </a>
                <figcaption className="mt-3 text-xs text-ash">
                  Artist&rsquo;s rendering only. All measurements and dimensions are approximate
                  and subject to change without notice. E. &amp; O.E.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Floor plans */}
        <section id="plans" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-mauve-deep">Floor Plans</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                Seven layouts, {PRICING.sqftMin} to{" "}
                {PRICING.sqftMax.toLocaleString("en-CA")} sq. ft.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ash">
                Main Residences run 789 to 973 sq. ft. and Upper Residences run 957 to 1,138 sq.
                ft. Several plans allow an added bathroom, a dedicated dining room, or a den in
                place of the third bedroom.
              </p>
            </div>

            <FloorPlanVault plans={PUBLIC_FLOOR_PLANS} />
          </div>
        </section>

        {/* ------------------------------------------------------------ Purchase */}
        <section id="purchase" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-lime">The Purchase</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-[2.75rem]">
                Exactly what buying here involves
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/65">
                Every figure below comes from {PROJECT.developer}&rsquo;s own purchase
                documentation for the final release. All of it is subject to change without
                notice — confirm against your agreement of purchase and sale.
              </p>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="eyebrow text-white/45">Deposit Structure</p>
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {DEPOSIT_SCHEDULE.map((d) => (
                    <li key={d.when} className="flex items-baseline justify-between gap-6 py-3.5">
                      <span className="text-sm text-white/85">{d.when}</span>
                      <span className="font-serif text-lg text-lime">{d.amount}</span>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between gap-6 py-4">
                    <span className="text-sm font-semibold tracking-wide uppercase">Total</span>
                    <span className="font-serif text-xl text-lime">{DEPOSIT_TOTAL}</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-white/40">
                  Initial deposit by bank draft, payable to Bennett Jones LLP, In Trust.
                </p>
              </div>

              <div>
                <p className="eyebrow text-white/45">Terms &amp; Eligibility</p>
                <ul className="mt-5 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
                  {PURCHASE_FACTS.map((f) => (
                    <li key={f.title} className="bg-ink px-5 py-6">
                      <p className="font-serif text-lg text-lime">{f.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{f.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <p className="eyebrow text-white/45">Included Features — Schedule C</p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {INCLUDED_FEATURES.map((group) => (
                  <div key={group.title} className="border-t border-white/15 pt-5">
                    <h3 className="font-serif text-xl text-white">{group.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-white/60">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Why / Reasons */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-mauve-deep">The Case</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                Ten reasons buyers choose Aura
              </h2>
            </div>

            <ol className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {REASONS.map((reason, i) => (
                <li key={reason.title} className="border-t border-black/10 pt-5">
                  <span className="eyebrow text-mauve-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-medium text-ink">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{reason.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ Mid CTA */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/renderings/elevation.jpg"
                  alt="Front elevation of an Aura town block showing gabled rooflines and balconies"
                  width={1600}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>
              <p className="eyebrow mt-8 text-mauve-deep">Priority Access</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                Get the price list before the lots are gone
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ash">
                Registration is free and carries no obligation. You receive the current price
                list, the deposit structure, the full feature list, and immediate access to all
                seven floor plans.
              </p>
            </div>

            <div className="rounded-xl bg-cream p-3 sm:p-5">
              <RegisterForm
                idPrefix="mid"
                heading="Request Current Pricing"
                subheading="Sent within one business day, usually much sooner."
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Location */}
        <section id="location" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-lime">Location</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-[2.75rem]">
                {ADDRESS.street}
              </h2>
              {/* The civic address is what people search; the intersection is
                  what they navigate by. Both, in that order. */}
              <p className="eyebrow mt-3 text-lime">{ADDRESS.crossStreets}</p>
              <p className="mt-5 text-base leading-relaxed text-white/65">
                {ADDRESS.locationNote} — {ADDRESS.neighbourhood} sits at the eastern edge of{" "}
                {ADDRESS.city}, against the Toronto border. Mississauga pricing, Toronto access,
                and a two-minute walk to the water.
              </p>
            </div>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="eyebrow text-white/45">Getting Around</p>
                <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {TRANSIT.map((t) => (
                    <li key={t.place} className="flex items-baseline justify-between gap-6 py-4">
                      <span className="text-sm text-white/85">{t.place}</span>
                      <span className="shrink-0 text-right">
                        <span className="font-serif text-lg text-lime">{t.time}</span>
                        <span className="ml-2 text-[11px] text-white/40 uppercase">{t.mode}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-white/40">
                  Approximate off-peak times. Actual travel varies with traffic and schedule.
                </p>
              </div>

              <div>
                <p className="eyebrow text-white/45">Schools Nearby</p>
                <ul className="mt-5 space-y-2.5">
                  {SCHOOLS.map((school) => (
                    <li
                      key={school}
                      className="rounded-lg bg-white/[0.06] px-4 py-3 text-sm text-white/85"
                    >
                      {school}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-white/40">
                  School catchments are set by the school boards and can change. Confirm current
                  boundaries directly with the board.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="eyebrow text-white/45">In the Community</p>
              <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {COMMUNITY_FEATURES.map((feature) => (
                  <div key={feature.title} className="bg-ink px-6 py-8">
                    <h3 className="font-serif text-xl text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{feature.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Named places from Caivan's own brochure map. Competing pages
                describe the neighbourhood in adjectives and name almost
                nothing, so this is where the local-search wins are. */}
            {/* The map renders without its legend: at page width the numbers
                are illegible, and a legend baked into a picture is text no
                crawler can read. The list below is the legend, in markup. */}
            <figure className="mt-16">
              <a href={MEDIA.areaMapLegend} target="_blank" rel="noopener noreferrer">
                <Image
                  src={MEDIA.areaMap}
                  alt={`Neighbourhood map showing ${PROJECT.name} on the Lake Ontario shoreline, with Long Branch, Dixie, Mimico, Cooksville and Port Credit GO stations, CF Sherway Gardens, Square One and Mississauga Hospital`}
                  width={2400}
                  height={1310}
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  className="w-full rounded-xl border border-white/10"
                />
              </a>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
                <span>
                  {PROJECT.developer} neighbourhood map. Artist&rsquo;s concept, not to scale.
                </span>
                <a
                  href={MEDIA.areaMapLegend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 underline decoration-lime decoration-2 underline-offset-4 hover:text-white"
                >
                  Open the numbered key &rarr;
                </a>
              </figcaption>
            </figure>

          </div>
        </section>

        {/* ------------------------------------------------------------ Personas */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-mauve-deep">Who It Suits</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                Find yourself here
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BUYER_PERSONAS.map((persona) => (
                <article
                  key={persona.title}
                  className="rounded-xl bg-cream p-7 transition hover:bg-mauve-soft/40"
                >
                  <h3 className="font-serif text-2xl text-ink">{persona.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{persona.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Investment */}
        <section id="investment" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-mauve-deep">The Investment Case</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                The case, in documented numbers
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ash">
                Every point below is a term you can check against the builder&rsquo;s own
                paperwork. There are no appreciation forecasts or projected rents here — those
                are opinions, and a brokerage that puts them in writing owns them.
              </p>
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {INVESTMENT_CASE.map((item) => (
                <div key={item.title} className="border-t border-black/10 pt-5">
                  <h3 className="text-base font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{item.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-4xl text-xs leading-relaxed text-ash">
              Nothing here is investment, tax, or legal advice, and pre-construction returns are
              not guaranteed. Review the agreement of purchase and sale and the disclosure
              statement with your own lawyer and accountant before you commit.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- Builder */}
        <section id="builder" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <div>
                <p className="eyebrow text-lime">The Builder</p>
                <Image
                  src="/brand/caivan-white.svg"
                  alt={BUILDER.name}
                  width={260}
                  height={48}
                  className="mt-6 h-8 w-auto"
                />
                <p className="mt-7 max-w-md text-base leading-relaxed text-white/70">
                  {BUILDER.summary}
                </p>
                <p className="mt-6 text-sm text-white/45">
                  {PROJECT.name} is developed by {BUILDER.name}. The exclusive listing brokerage
                  is {PROJECT.listingBrokerage}.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
                {BUILDER.points.map((point) => (
                  <div key={point.title} className="bg-ink px-6 py-7">
                    <h3 className="font-serif text-xl text-lime">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{point.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- Insights */}
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow text-mauve-deep">Insights</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                  Read before you buy
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-mauve-deep"
              >
                All articles &rarr;
              </Link>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {latest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl bg-white p-7 transition hover:shadow-lg hover:shadow-black/5"
                >
                  <p className="eyebrow text-mauve-deep">{post.tag}</p>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-ink group-hover:text-mauve-deep">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ash">
                    {post.description}
                  </p>
                  <p className="mt-5 text-xs text-ash">{post.readMinutes} min read</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- FAQ */}
        <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="eyebrow text-mauve-deep">Questions</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                Everything buyers ask us
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ash">
                Not covered here?{" "}
                <a href="#register" className="text-ink underline underline-offset-4">
                  Register
                </a>{" "}
                and ask directly — a person answers.
              </p>
            </div>
            <Faq />
          </div>
        </section>

        {/* --------------------------------------------------------------- Visit */}
        {/* Light ground on purpose: a Google embed is a bright rectangle, and on
            the dark location section it read as a hole punched in the page. */}
        <section id="visit" className="scroll-mt-20 border-t border-black/10 bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
              <div>
                <p className="eyebrow text-mauve-deep">Visit</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.5rem]">
                  Come and see it
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ash">
                  The homes are at {ADDRESS.street}, on {ADDRESS.crossStreets}. The builder&rsquo;s
                  presentation gallery is a separate address a short drive away.
                </p>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <p className="eyebrow text-ash">{SALES_CENTRE.name}</p>
                  <p className="mt-2 text-sm text-ink">{SALES_CENTRE.address}</p>
                  <dl className="mt-5 space-y-1.5">
                    {SALES_CENTRE.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4 text-sm">
                        <dt className="text-ash">{h.days}</dt>
                        <dd className="text-ink">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <p className="mt-6 text-sm text-ash">
                  Planning a visit?{" "}
                  <a href="#register" className="text-ink underline underline-offset-4">
                    Register first
                  </a>{" "}
                  and we&rsquo;ll go with you.
                </p>
              </div>

              {/* Pinned on the homes, not the gallery. */}
              <figure>
                <div className="overflow-hidden rounded-xl border border-black/10">
                  <iframe
                    src={MEDIA.mapEmbedSrc}
                    title={`Map showing ${ADDRESS.street}, ${ADDRESS.city}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="block h-[360px] w-full border-0 sm:h-[440px]"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-ash">
                  {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- Closing CTA */}
        <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28">
          <Image
            src="/renderings/courtyard-patio.jpg"
            alt="Landscaped interior courtyard at Aura at dusk"
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/50"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-lime">{PHASE.label}</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-[2.75rem]">
                {PHASE.homeCount} homes. Then Aura is complete.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                The final release at Mississauga&rsquo;s waterfront master plan. Register for the
                current price list, the deposit structure, and every floor plan.
              </p>
            </div>
            <RegisterForm
              idPrefix="footer"
              variant="dark"
              heading="Register for Priority Access"
              subheading="Free, no obligation, and no drip campaign."
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
