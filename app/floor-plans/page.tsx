import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PUBLIC_FLOOR_PLANS, teaserSrc } from "@/lib/floorplans";
import { ADDRESS, PHASE, PRICING, PROJECT, SITE_URL } from "@/lib/project";

const title = `Floor Plans — All ${PUBLIC_FLOOR_PLANS.length} Models, ${PRICING.sqftMin}–${PRICING.sqftMax} sq. ft.`;
const description = `Every ${PROJECT.name} floor plan: ${PUBLIC_FLOOR_PLANS.map((p) => p.name).join(", ")}. Square footage, bedrooms, bathrooms, and designer choice pricing for all ${PUBLIC_FLOOR_PLANS.length} models by ${PROJECT.developer} in ${ADDRESS.city}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/floor-plans" },
  openGraph: { type: "website", title, description, url: `${SITE_URL}/floor-plans` },
};

export default function FloorPlansIndexPage() {
  const main = PUBLIC_FLOOR_PLANS.filter((p) => p.residence === "Main Residence");
  const upper = PUBLIC_FLOOR_PLANS.filter((p) => p.residence === "Upper Residence");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${PROJECT.name} floor plans`,
    numberOfItems: PUBLIC_FLOOR_PLANS.length,
    itemListElement: PUBLIC_FLOOR_PLANS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.name} — ${p.residence}`,
      url: `${SITE_URL}/floor-plans/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-black/10 bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="eyebrow text-mauve-deep">Floor Plans</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              All {PUBLIC_FLOOR_PLANS.length} plans at {PROJECT.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash">
              {main.length} Main Residences and {upper.length} Upper Residences, from{" "}
              {PRICING.sqftMin} to {PRICING.sqftMax} sq. ft. Specifications are published in full
              below — square footage, bedrooms, bathrooms, and the priced designer choices for
              each model. The dimensioned drawings open once you register.
            </p>
          </div>
        </section>

        {[
          { label: "Main Residences", plans: main, note: "Ground level entry, with living space on the entry level and bedrooms on the finished lower level." },
          { label: "Upper Residences", plans: upper, note: "Their own door at ground level and a private stair up to two storeys of living space above." },
        ].map((group) => (
          <section key={group.label} className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink">
                {group.label}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ash">{group.note}</p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.plans.map((plan) => (
                <Link
                  key={plan.slug}
                  href={`/floor-plans/${plan.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-black/10 transition hover:border-mauve-deep/40 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="relative aspect-square w-full bg-cream">
                    <Image
                      src={teaserSrc(plan.slug)}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-3 blur-[2px]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-xl text-ink group-hover:text-mauve-deep">
                      {plan.name}
                    </h3>
                    <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-black/10 pt-4">
                      <div>
                        <dt className="eyebrow text-ash">Sq. Ft.</dt>
                        <dd className="mt-1 font-serif text-base text-ink">{plan.sqftDisplay}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ash">Beds</dt>
                        <dd className="mt-1 font-serif text-base text-ink">{plan.beds}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-ash">Baths</dt>
                        <dd className="mt-1 font-serif text-base text-ink">{plan.baths}</dd>
                      </div>
                    </dl>
                    <span className="mt-5 text-[11px] font-semibold tracking-[0.16em] text-mauve-deep uppercase">
                      View plan &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section className="border-t border-black/10 bg-ink py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-lime">{PHASE.label}</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Open all {PUBLIC_FLOOR_PLANS.length} drawings at once
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                One registration unlocks every plan on this device, and we send the current price
                list and deposit structure by email. {PHASE.homeCount} homes in the final release.
              </p>
            </div>
            <RegisterForm
              idPrefix="plans-index"
              variant="dark"
              heading="Unlock the Floor Plans"
              subheading="Free, no obligation. Plans open the moment you submit."
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
