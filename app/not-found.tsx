import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT, PROJECT } from "@/lib/project";

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="eyebrow text-mauve-deep">404</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            That page isn&rsquo;t here
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ash">
            The link may be out of date. Everything about {PROJECT.name} — pricing, floor plans,
            incentives, and location — is on the main page.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-md bg-ink px-6 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-mauve-deep"
            >
              Back to Aura
            </Link>
            <a
              href={`tel:${CONTACT.phone}`}
              className="rounded-md border border-black/15 px-6 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition hover:border-ink"
            >
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
