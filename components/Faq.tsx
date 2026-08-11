import { FAQS } from "@/lib/project";

/**
 * Built on native <details>/<summary> rather than a JS accordion: the answer
 * text ships in the server HTML either way, which is what the FAQPage schema
 * has to corroborate. It also works with no JS and is keyboard-accessible for
 * free.
 */
export function Faq() {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {FAQS.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm text-ink marker:hidden">
            <span className="pr-4">{f.q}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-lg text-ash transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-sm leading-relaxed text-ash">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
