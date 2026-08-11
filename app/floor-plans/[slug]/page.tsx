import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlanSheet } from "@/components/PlanSheet";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getFloorPlan, PUBLIC_FLOOR_PLANS } from "@/lib/floorplans";
import {
  ADDRESS,
  DEPOSIT_TOTAL,
  PHASE,
  PRICING,
  PROJECT,
  SITE_URL,
} from "@/lib/project";

/**
 * One page per model.
 *
 * Every competing site for this project gates the entire floor plan section
 * behind a form, which means nobody ranks for "aura the nova corner floor plan"
 * or "aura echo end square footage". These pages publish the specs — the part a
 * buyer searches for — and gate only the drawing.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PUBLIC_FLOOR_PLANS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = getFloorPlan(slug);
  if (!plan) return {};

  const title = `${plan.name} — ${plan.residence}, ${plan.sqftDisplay} sq. ft.`;
  const description = `${plan.name} at ${PROJECT.name}: ${plan.sqftDisplay} sq. ft., ${plan.beds} bedroom, ${plan.baths} bath ${plan.residence.toLowerCase()} by ${PROJECT.developer} in ${ADDRESS.city}. Dimensions, designer choice options, and the full floor plan PDF.`;

  return {
    title,
    description,
    alternates: { canonical: `/floor-plans/${plan.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/floor-plans/${plan.slug}`,
    },
  };
}

export default async function FloorPlanPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const plan = getFloorPlan(slug);
  if (!plan) notFound();

  // `file` must never reach the client — it is the on-disk name behind the gate.
  const { file: _file, ...publicPlan } = plan;
  const others = PUBLIC_FLOOR_PLANS.filter((p) => p.slug !== plan.slug);
  const sameType = others.filter((p) => p.residence === plan.residence);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Accommodation",
        "@id": `${SITE_URL}/floor-plans/${plan.slug}#plan`,
        name: `${plan.name} — ${plan.residence}`,
        description: `${plan.residence} floor plan at ${PROJECT.name} by ${PROJECT.developer}.`,
        url: `${SITE_URL}/floor-plans/${plan.slug}`,
        accommodationCategory: PROJECT.homeType,
        floorSize: {
          "@type": "QuantitativeValue",
          value: plan.sqft,
          unitCode: "FTK",
        },
        numberOfBedrooms: Number.parseFloat(plan.beds),
        numberOfBathroomsTotal: Number.parseFloat(plan.baths),
        isPartOf: { "@id": `${SITE_URL}/#development` },
        address: {
          "@type": "PostalAddress",
          streetAddress: ADDRESS.street,
          addressLocality: ADDRESS.city,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postalCode,
          addressCountry: ADDRESS.country,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Floor Plans",
            item: `${SITE_URL}/floor-plans`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: plan.name,
            item: `${SITE_URL}/floor-plans/${plan.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />

      <main className="bg-white">
        <header className="border-b border-black/10 bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
            <nav aria-label="Breadcrumb" className="eyebrow text-ash">
              <Link href="/floor-plans" className="hover:text-ink">
                Floor Plans
              </Link>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span>{plan.residence}</span>
            </nav>

            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              {plan.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ash">
              A {plan.sqftDisplay} sq. ft. {plan.residence.toLowerCase()} at {PROJECT.name},{" "}
              {PROJECT.developer}&rsquo;s final release of {PHASE.homeCount} stacked towns on the{" "}
              {ADDRESS.city} waterfront.
            </p>

            <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-black/10 pt-7 sm:grid-cols-4">
              <div>
                <dt className="eyebrow text-ash">Square feet</dt>
                <dd className="mt-1.5 font-serif text-2xl text-ink">{plan.sqftDisplay}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ash">Bedrooms</dt>
                <dd className="mt-1.5 font-serif text-2xl text-ink">{plan.beds}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ash">Bathrooms</dt>
                <dd className="mt-1.5 font-serif text-2xl text-ink">{plan.baths}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ash">Residence</dt>
                <dd className="mt-1.5 font-serif text-2xl text-ink">
                  {plan.residence.replace(" Residence", "")}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* --------------------------------------------------------- The drawing */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <PlanSheet plan={publicPlan} />
        </section>

        {/* ---------------------------------------------------- Designer choices */}
        {plan.options.length > 0 && (
          <section className="border-t border-black/10 bg-cream py-14 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="max-w-2xl">
                <p className="eyebrow text-mauve-deep">Designer Choices</p>
                {/* Model names already begin with "The" — no article here. */}
                <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-ink">
                  How {plan.name} can be configured
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ash">
                  Options available on this plan, priced by the builder. All prices exclude HST,
                  and options must be selected within 45 days of the sale date.
                </p>
              </div>

              <ul className="mt-8 grid max-w-3xl gap-px overflow-hidden rounded-xl bg-black/10">
                {plan.options.map((opt) => (
                  <li
                    key={opt}
                    className="flex items-baseline justify-between gap-6 bg-cream px-5 py-4 text-sm"
                  >
                    <span className="text-ink">{opt.split(" — ")[0]}</span>
                    <span className="shrink-0 font-serif text-lg text-mauve-deep">
                      {opt.split(" — ")[1]}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 max-w-3xl text-xs text-ash">
                Not all options are available in combination. Confirm availability on your lot
                with a sales consultant before you rely on any configuration shown here.
              </p>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------- Buying context */}
        <section className="border-t border-black/10 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink">
              What this home costs to buy and hold
            </h2>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Starting from", d: PRICING.fromDisplay, n: "Builder's published band for the final release" },
                { t: "Total deposit", d: DEPOSIT_TOTAL, n: "Staged across eight instalments" },
                { t: "Maintenance", d: "$199.99 / mo", n: "Plus $64.95 / mo for parking" },
                { t: "First closing", d: PRICING.occupancyShort, n: "Tentative; the agreement governs" },
              ].map((row) => (
                <div key={row.t} className="bg-white px-5 py-6">
                  <dt className="eyebrow text-ash">{row.t}</dt>
                  <dd className="mt-2 font-serif text-xl text-ink">{row.d}</dd>
                  <dd className="mt-2 text-xs text-ash">{row.n}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-ash">
              Pricing is set per lot and per model.{" "}
              <Link
                href="/#purchase"
                className="text-ink underline decoration-lime decoration-2 underline-offset-4"
              >
                See the full deposit structure and purchase terms
              </Link>
              , or{" "}
              <Link
                href="/blog/deposit-structure-and-carrying-costs"
                className="text-ink underline decoration-lime decoration-2 underline-offset-4"
              >
                read how the carrying costs break down
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------- Compare */}
        <section className="border-t border-black/10 bg-cream py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink">
              Compare with the other {PUBLIC_FLOOR_PLANS.length - 1} plans
            </h2>
            {sameType.length > 0 && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">
                {plan.residence}s enter{" "}
                {plan.residence === "Main Residence"
                  ? "at grade and occupy the lower levels of the block."
                  : "at ground level and rise two storeys above the Main Residence below."}
              </p>
            )}

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[42rem] text-sm">
                <thead>
                  <tr className="border-b border-black/15 text-left">
                    <th scope="col" className="eyebrow py-3 text-ash">Plan</th>
                    <th scope="col" className="eyebrow py-3 text-ash">Residence</th>
                    <th scope="col" className="eyebrow py-3 text-right text-ash">Sq. Ft.</th>
                    <th scope="col" className="eyebrow py-3 text-right text-ash">Beds</th>
                    <th scope="col" className="eyebrow py-3 text-right text-ash">Baths</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {PUBLIC_FLOOR_PLANS.map((p) => {
                    const current = p.slug === plan.slug;
                    return (
                      <tr key={p.slug} className={current ? "bg-white" : ""}>
                        <th scope="row" className="py-3.5 text-left font-normal">
                          {current ? (
                            <span className="font-medium text-ink">{p.name} (this plan)</span>
                          ) : (
                            <Link
                              href={`/floor-plans/${p.slug}`}
                              className="text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-mauve-deep"
                            >
                              {p.name}
                            </Link>
                          )}
                        </th>
                        <td className="py-3.5 text-ash">{p.residence}</td>
                        <td className="py-3.5 text-right font-serif text-base text-ink">
                          {p.sqftDisplay}
                        </td>
                        <td className="py-3.5 text-right text-ash">{p.beds}</td>
                        <td className="py-3.5 text-right text-ash">{p.baths}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-xs text-ash">
              Square footages are approximate, are measured in accordance with Tarion Bulletin
              #22, and include finished space in the lower level. Actual usable floor area varies
              from the areas stated. E. &amp; O.E.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
