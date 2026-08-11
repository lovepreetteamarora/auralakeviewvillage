"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { RegisterForm } from "@/components/RegisterForm";
import type { PublicFloorPlan } from "@/lib/floorplans";
import { teaserSrc } from "@/lib/floorplans";

type Status = "checking" | "locked" | "unlocked";

/**
 * Floor plan vault.
 *
 * Locked, each card shows the real drawing sheet behind frosted glass — the
 * shape of the plan is legible, the dimensions are not. That is the point: a
 * visitor can see there is something specific behind the form, which converts
 * far better than a bare "download" button, while the teaser image itself is
 * too low-resolution to be useful without registering.
 *
 * Specs stay in the server HTML for everyone. Those are the words a buyer
 * searches for, and gating them would cost the ranking that brings the buyer
 * here in the first place. The gate is on the drawing, never on the facts.
 */
export function FloorPlanVault({ plans }: { plans: PublicFloorPlan[] }) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/access")
      .then((r) => (r.ok ? r.json() : { unlocked: false }))
      .then((d: { unlocked?: boolean }) => {
        if (!cancelled) setStatus(d.unlocked ? "unlocked" : "locked");
      })
      .catch(() => {
        // A failed check must not strand the visitor on a spinner. Show the
        // gate; registering again is cheap and re-issues the cookie.
        if (!cancelled) setStatus("locked");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const unlock = useCallback(() => setStatus("unlocked"), []);
  const locked = status !== "unlocked";

  return (
    <div className="mt-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.slug}
            className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition hover:border-mauve-deep/40 hover:shadow-lg hover:shadow-black/5"
          >
            {/* ------------------------------------------------ Drawing sheet */}
            {/* Fixed square box in every state. The teaser is pre-cropped to a
                square so it fills edge to edge; the full sheet is letterboxed
                inside the same box, so card heights never differ between the
                locked and unlocked view or between models. */}
            <div className="relative aspect-square overflow-hidden bg-[#f7f6f4]">
              {locked ? (
                <>
                  <Image
                    src={teaserSrc(plan.slug)}
                    alt={`${plan.name} ${plan.residence} floor plan — ${plan.sqftDisplay} sq. ft.`}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full scale-110 object-cover blur-[6px] select-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-white/40" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-lg">
                      <LockIcon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase">
                      Plan Locked
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ash">
                      Register to view dimensions
                    </p>
                  </div>
                </>
              ) : (
                <a
                  href={`/api/floorplans/${plan.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                  aria-label={`Open the ${plan.name} ${plan.residence} floor plan PDF`}
                >
                  {/* Unoptimized: the source is a private, no-store route, so
                      it must not be pulled through the shared image cache. */}
                  <Image
                    src={`/api/floorplans/${plan.slug}/preview`}
                    alt={`${plan.name} ${plan.residence} floor plan — ${plan.sqftDisplay} sq. ft.`}
                    width={1275}
                    height={2100}
                    unoptimized
                    className="h-full w-full object-contain p-3 transition duration-500 hover:scale-[1.02]"
                  />
                  <span className="pointer-events-none absolute right-3 bottom-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                    Open PDF
                  </span>
                </a>
              )}
            </div>

            {/* ------------------------------------------------------- Specs */}
            <div className="flex flex-1 flex-col p-6">
              <p className="eyebrow text-mauve-deep">{plan.residence}</p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{plan.name}</h3>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-black/10 py-4">
                <div>
                  <dt className="eyebrow text-ash">Sq. Ft.</dt>
                  <dd className="mt-1 font-serif text-lg text-ink">{plan.sqftDisplay}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ash">Beds</dt>
                  <dd className="mt-1 font-serif text-lg text-ink">{plan.beds}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ash">Baths</dt>
                  <dd className="mt-1 font-serif text-lg text-ink">{plan.baths}</dd>
                </div>
              </dl>

              {plan.options.length > 0 && (
                <div className="mt-4">
                  <p className="eyebrow text-ash">Designer choices</p>
                  <ul className="mt-2 space-y-1">
                    {plan.options.map((opt) => (
                      <li key={opt} className="text-xs text-ash">
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* mt-auto so the button sits on the card's baseline regardless
                  of how many designer choices a model has. */}
              <div className="mt-auto pt-6">
                {locked ? (
                  <a
                    href="#plan-gate"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-black/15 px-4 py-3 text-[11px] font-semibold tracking-[0.16em] text-ash uppercase transition hover:border-ink hover:text-ink"
                  >
                    <LockIcon className="h-3.5 w-3.5" />
                    Unlock Plan
                  </a>
                ) : (
                  <a
                    href={`/api/floorplans/${plan.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-lime px-4 py-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition hover:brightness-95"
                  >
                    Download PDF
                    <span aria-hidden="true">&darr;</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {locked ? (
        <div
          id="plan-gate"
          className="mt-10 grid scroll-mt-24 gap-8 rounded-xl bg-ink p-7 text-white sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center"
        >
          <div>
            <p className="eyebrow inline-flex items-center gap-2 text-lime">
              <LockIcon className="h-3.5 w-3.5" />
              Floor plans locked
            </p>
            <h3 className="mt-4 font-serif text-2xl leading-tight sm:text-3xl">
              Register once to open all seven plans
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Full PDF packages with dimensioned main and lower level drawings, designer choice
              options, and elevations. One registration unlocks every plan on this device — no
              re-entering your details per download.
            </p>
          </div>

          <RegisterForm
            idPrefix="vault"
            variant="dark"
            heading="Unlock the Floor Plans"
            subheading="Free, no obligation. Plans open the moment you submit."
            onSuccess={unlock}
            successBody={
              <p>
                All seven plans are unlocked below. The current price list and deposit structure
                are on their way to your inbox.
              </p>
            }
          />
        </div>
      ) : (
        <p className="mt-8 rounded-xl bg-cream px-6 py-5 text-sm text-ash">
          <span className="font-medium text-ink">All seven plans are unlocked.</span> Sizes are
          approximate and measured per Tarion Bulletin #22; actual living area varies from the
          area stated. Prices and specifications are subject to change without notice.
        </p>
      )}
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}
