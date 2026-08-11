import Image from "next/image";
import Link from "next/link";
import { CONTACT, NAV, PROJECT } from "@/lib/project";

/**
 * Server component on purpose — the mobile menu is a checkbox/peer CSS toggle
 * rather than React state, so the whole header ships as static HTML with no
 * client bundle. The nav is the same markup at every breakpoint, which keeps
 * the link set crawlable.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${PROJECT.name} — home`}>
          <Image
            src="/brand/aura-purple.svg"
            alt={PROJECT.name}
            width={132}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] text-ash transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={`tel:${CONTACT.phone}`}
            className="hidden text-[13px] font-medium text-ink sm:block"
          >
            {CONTACT.phoneDisplay}
          </a>
          <a
            href="#register"
            className="rounded-md bg-ink px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-mauve-deep"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
