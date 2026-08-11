import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegisterForm } from "@/components/RegisterForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPost, POSTS, POSTS_BY_DATE, type PostBlock } from "@/lib/posts";
import { CONTACT, PHASE, SITE_URL } from "@/lib/project";

type Params = { slug: string };

/** Every post is known at build time, so all of /blog prerenders as static HTML. */
export function generateStaticParams(): Params[] {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 font-serif text-2xl leading-snug text-ink sm:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ash">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime ring-4 ring-lime/25"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <aside className="mt-10 rounded-xl border-l-2 border-lime bg-cream px-6 py-5 text-sm leading-relaxed text-ash">
          {block.text}
        </aside>
      );
    default:
      return <p className="mt-6 text-ash">{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS_BY_DATE.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: "en-CA",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: { "@type": "Organization", name: CONTACT.brokerage, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#brokerage` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteHeader />

      <main className="bg-white">
        <article>
          <header className="border-b border-black/10 bg-cream">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
              <nav aria-label="Breadcrumb" className="eyebrow text-ash">
                <Link href="/blog" className="hover:text-ink">
                  Insights
                </Link>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <span>{post.tag}</span>
              </nav>

              <h1 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-[2.75rem]">
                {post.title}
              </h1>

              <p className="mt-6 text-sm text-ash">
                <time dateTime={post.published}>
                  {dateFormat.format(new Date(post.published))}
                </time>{" "}
                &middot; {post.readMinutes} min read &middot; {CONTACT.brokerage}
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-3xl px-5 py-14 text-base leading-relaxed sm:px-8 sm:py-16">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>

        <section className="border-t border-black/10 bg-ink py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-lime">{PHASE.label}</p>
              <h2 className="mt-4 font-serif text-2xl leading-tight sm:text-3xl">
                Get the current price list and floor plans
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
                {PHASE.homeCount} homes in the final release. Registration is free and carries no
                obligation.
              </p>
            </div>
            <RegisterForm
              idPrefix={`post-${post.slug}`}
              variant="dark"
              subheading="Price list, floor plans, and the written incentive sheet."
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-2xl text-ink">Keep reading</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-xl bg-cream p-7 transition hover:bg-mauve-soft/40"
              >
                <p className="eyebrow text-mauve-deep">{p.tag}</p>
                <h3 className="mt-3 font-serif text-lg leading-snug text-ink group-hover:text-mauve-deep">
                  {p.title}
                </h3>
                <p className="mt-auto pt-6 text-xs text-ash">{p.readMinutes} min read</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
