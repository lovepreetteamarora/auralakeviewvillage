import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS,
  CONTACT,
  DISCLAIMER,
  NAV,
  PHASE,
  PRICING,
  PROJECT,
  SALES_CENTRE,
} from "@/lib/project";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/aura-black.svg"
              alt={PROJECT.name}
              width={140}
              height={47}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
              {PROJECT.homeType} by {PROJECT.developer} in the {PROJECT.masterPlan}{" "}
              master-planned waterfront community. {PHASE.label}, from {PRICING.fromDisplay}.
            </p>
            <address className="mt-5 text-sm text-ash not-italic">
              {ADDRESS.street}
              <br />
              {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
              <br />
              <span className="text-xs">{ADDRESS.locationNote}</span>
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-ash">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink transition-colors hover:text-mauve-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-ash">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`tel:${CONTACT.phone}`} className="text-ink hover:text-mauve-deep">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-ink hover:text-mauve-deep">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-1 text-ash">{CONTACT.brokerage}</li>
            </ul>

            <p className="eyebrow mt-8 text-ash">Sales Gallery</p>
            <p className="mt-3 text-sm text-ash">
              {SALES_CENTRE.name}
              <br />
              {SALES_CENTRE.address}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8">
          <p className="max-w-4xl text-[11px] leading-relaxed text-ash">{DISCLAIMER}</p>
          <p className="mt-5 text-[11px] text-ash">
            &copy; {new Date().getFullYear()} {CONTACT.brokerage}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
