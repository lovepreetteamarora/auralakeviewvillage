"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RegisterForm } from "@/components/RegisterForm";
import { teaserSrc, type PublicFloorPlan } from "@/lib/floorplans";

type Status = "checking" | "locked" | "unlocked";

/**
 * The gated drawing for a single plan, used on /floor-plans/[slug].
 *
 * Same gate as the homepage vault, but scoped to one model: a visitor who
 * landed here from a search for this specific plan should not have to hunt for
 * the form. Unlock state is fetched on mount so the page itself stays a static
 * prerender — the specs above it are what the page ranks for.
 */
export function PlanSheet({ plan }: { plan: PublicFloorPlan }) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/access")
      .then((r) => (r.ok ? r.json() : { unlocked: false }))
      .then((d: { unlocked?: boolean }) => {
        if (!cancelled) setStatus(d.unlocked ? "unlocked" : "locked");
      })
      .catch(() => {
        if (!cancelled) setStatus("locked");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const locked = status !== "unlocked";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      <figure className="overflow-hidden rounded-xl border border-black/10 bg-white">
        <div className="relative aspect-[4/5] w-full bg-cream">
          {locked ? (
            <>
              <Image
                src={teaserSrc(plan.slug)}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-contain p-4 blur-[3px]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/45 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
                  <LockIcon />
                </span>
                <p className="eyebrow text-ink">Plan locked</p>
                <p className="max-w-[16rem] text-xs text-ash">
                  Register to view the dimensioned drawing for {plan.name}.
                </p>
              </div>
            </>
          ) : (
            <Image
              src={`/api/floorplans/${plan.slug}/preview`}
              alt={`Dimensioned floor plan for ${plan.name}, ${plan.residence} at Aura`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-contain p-4"
            />
          )}
        </div>

        <figcaption className="flex items-center justify-between gap-4 border-t border-black/10 px-5 py-4">
          <span className="text-xs text-ash">
            {plan.name} &middot; {plan.residence}
          </span>
          {!locked && (
            <a
              href={`/api/floorplans/${plan.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-lime px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition hover:brightness-95"
            >
              Download PDF
              <span aria-hidden="true">&darr;</span>
            </a>
          )}
        </figcaption>
      </figure>

      {locked ? (
        <div id="unlock" className="scroll-mt-24 rounded-xl bg-ink p-6 text-white sm:p-8">
          <p className="eyebrow inline-flex items-center gap-2 text-lime">
            <LockIcon />
            Floor plans locked
          </p>
          {/* Model names already begin with "The", so no article here. */}
          <h2 className="mt-4 font-serif text-2xl leading-tight">
            Open the drawing for {plan.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            One registration unlocks all seven plans on this device — the dimensioned main and
            lower level drawings, the designer choice options, and the elevations.
          </p>

          <div className="mt-6">
            <RegisterForm
              idPrefix={`plan-${plan.slug}`}
              variant="dark"
              heading="Unlock the Floor Plans"
              subheading="Free, no obligation. Plans open the moment you submit."
              onSuccess={() => setStatus("unlocked")}
              successBody={
                <p>
                  All seven plans are unlocked. The current price list and deposit structure are
                  on their way to your inbox.
                </p>
              }
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-cream p-6 sm:p-8">
          <p className="font-serif text-2xl text-ink">All seven plans are unlocked.</p>
          <p className="mt-3 text-sm leading-relaxed text-ash">
            Sizes are approximate, are measured in accordance with Tarion Bulletin #22, and
            include finished space in the lower level. Actual usable floor area varies from the
            area stated. Prices and specifications are set by the builder and are subject to
            change without notice.
          </p>
        </div>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}
