import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { POSTS_BY_DATE } from "@/lib/posts";
import { PROJECT } from "@/lib/project";

export const metadata: Metadata = {
  title: "Insights",
  description: `Buying guides and community notes on ${PROJECT.name} and the ${PROJECT.masterPlan} waterfront master plan in Mississauga.`,
  alternates: { canonical: "/blog" },
};

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function BlogIndexPage() {
  const [lead, ...rest] = POSTS_BY_DATE;

  return (
    <>
      <SiteHeader />

      <main className="bg-white">
        <section className="border-b border-black/10 bg-cream">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <p className="eyebrow text-mauve-deep">Insights</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Notes on Aura, Lakeview Village, and buying pre-construction
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash">
              Plain explanations of the things that actually decide a pre-construction purchase —
              what is in the release, what the incentives are worth, and what the location does
              for you day to day.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href={`/blog/${lead.slug}`}
            className="group grid gap-8 rounded-xl border border-black/10 p-8 transition hover:border-mauve-deep/40 hover:shadow-lg hover:shadow-black/5 lg:grid-cols-[1.3fr_1fr] lg:p-10"
          >
            <div>
              <p className="eyebrow text-mauve-deep">{lead.tag}</p>
              <h2 className="mt-3 font-serif text-3xl leading-snug text-ink group-hover:text-mauve-deep sm:text-4xl">
                {lead.title}
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-base leading-relaxed text-ash">{lead.description}</p>
              <p className="mt-6 text-xs text-ash">
                <time dateTime={lead.published}>
                  {dateFormat.format(new Date(lead.published))}
                </time>{" "}
                &middot; {lead.readMinutes} min read
              </p>
            </div>
          </Link>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl bg-cream p-7 transition hover:bg-mauve-soft/40"
              >
                <p className="eyebrow text-mauve-deep">{post.tag}</p>
                <h2 className="mt-3 font-serif text-xl leading-snug text-ink group-hover:text-mauve-deep">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ash">{post.description}</p>
                <p className="mt-auto pt-6 text-xs text-ash">
                  <time dateTime={post.published}>
                    {dateFormat.format(new Date(post.published))}
                  </time>{" "}
                  &middot; {post.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
