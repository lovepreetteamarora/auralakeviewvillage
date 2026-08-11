"use client";

import { useState } from "react";

type Variant = "light" | "dark";

/**
 * Registration is the only conversion event on the page, so the form appears
 * three times (hero, mid-page, footer CTA). Each instance needs its own id
 * prefix — duplicate ids would break every <label for> pairing on the page.
 */
export function RegisterForm({
  idPrefix,
  variant = "light",
  heading = "Register for Priority Access",
  subheading = "Be the first to receive floor plans and pricing.",
  onSuccess,
  successBody,
}: {
  idPrefix: string;
  variant?: Variant;
  heading?: string;
  subheading?: string;
  /** Fired once the lead is accepted — the floor plan vault uses this to unlock. */
  onSuccess?: () => void;
  successBody?: React.ReactNode;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const dark = variant === "dark";
  const field = dark
    ? "w-full rounded-md border border-white/20 bg-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/50 focus:border-lime focus:outline-none"
    : "w-full rounded-md border border-black/10 bg-black/[0.03] px-3.5 py-3 text-sm text-ink placeholder:text-ash focus:border-mauve-deep focus:outline-none";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`rounded-xl p-8 text-center ${dark ? "bg-white/10 text-white" : "bg-white shadow-xl shadow-black/5"}`}
      >
        <p className="font-serif text-2xl">You&rsquo;re on the priority list.</p>
        <div className={`mt-3 text-sm ${dark ? "text-white/70" : "text-ash"}`}>
          {successBody ?? (
            <p>
              The floor plans are unlocked on this device, and the current price list and
              deposit structure are on their way to your inbox. We&rsquo;ll follow up
              personally within one business day.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl p-6 sm:p-7 ${dark ? "bg-white/[0.07] ring-1 ring-white/15" : "bg-white shadow-xl shadow-black/10"}`}
    >
      <h2 className={`text-lg font-medium ${dark ? "text-white" : "text-ink"}`}>{heading}</h2>
      <p className={`mt-1 text-xs ${dark ? "text-white/60" : "text-ash"}`}>{subheading}</p>

      <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-first`} className="sr-only">
            First name
          </label>
          <input id={`${idPrefix}-first`} name="firstName" required autoComplete="given-name" placeholder="First Name *" className={field} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-last`} className="sr-only">
            Last name
          </label>
          <input id={`${idPrefix}-last`} name="lastName" required autoComplete="family-name" placeholder="Last Name *" className={field} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="sr-only">
            Email address
          </label>
          <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" placeholder="Email Address *" className={field} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="sr-only">
            Phone number
          </label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" required autoComplete="tel" placeholder="Phone Number *" className={field} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-realtor`} className="sr-only">
            Are you a realtor?
          </label>
          <select id={`${idPrefix}-realtor`} name="isRealtor" defaultValue="" className={field}>
            <option value="" disabled>
              Are you a Realtor?
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-budget`} className="sr-only">
            Budget range
          </label>
          <select id={`${idPrefix}-budget`} name="budget" defaultValue="" className={field}>
            <option value="" disabled>
              Budget Range
            </option>
            <option>Under $600K</option>
            <option>$600K – $700K</option>
            <option>$700K – $800K</option>
            <option>$800K+</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-timeline`} className="sr-only">
            Move-in timeline
          </label>
          <select id={`${idPrefix}-timeline`} name="timeline" defaultValue="" className={field}>
            <option value="" disabled>
              Move-in Timeline
            </option>
            <option>As soon as possible</option>
            <option>Within 12 months</option>
            <option>2027 – 2028</option>
            <option>Investment / not moving in</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-lime px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-ink uppercase transition hover:brightness-95 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Get Priority Access"}
          <span aria-hidden="true">&rarr;</span>
        </button>

        {status === "error" && (
          <p role="alert" className="sm:col-span-2 text-xs text-red-600">
            Something went wrong. Please call us instead and we&rsquo;ll send it over.
          </p>
        )}

        <p className={`sm:col-span-2 text-center text-[11px] ${dark ? "text-white/50" : "text-ash"}`}>
          Your information is secure and kept strictly private.
        </p>
      </form>
    </div>
  );
}
