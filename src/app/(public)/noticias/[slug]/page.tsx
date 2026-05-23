import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { NewsCard } from "@/components/public/NewsCard";
import { Section } from "@/components/public/Section";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getNewsBySlug, listNews } from "@/server/queries/news";

export const revalidate = 60;

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const items = await listNews();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Noticia no encontrada" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.authorName ?? siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/noticias/${article.slug}`,
  };

  const related = (await listNews({ limit: 4 })).filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-fade text-white">
        <div className="container-page pb-14 pt-24 md:pb-20 md:pt-32">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Noticias", href: "/noticias" },
              { label: article.title },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="dark" className="bg-white/10">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-200">
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-brand-500" />
              {formatDate(article.publishedAt)}
            </span>
            {article.authorName && (
              <span className="inline-flex items-center gap-2">
                <User size={16} className="text-brand-500" />
                {article.authorName}
              </span>
            )}
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <article className="container-page max-w-3xl">
          <p className="border-l-4 border-brand-600 pl-5 text-xl leading-relaxed text-ink-800 md:text-2xl">
            {article.excerpt}
          </p>
          <div
            className="mt-10 max-w-none text-base leading-relaxed text-ink-700 [&_a]:text-brand-700 [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-ink-900 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900 [&_li]:my-2 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="bg-ink-50">
          <div className="container-page">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Sigue leyendo
                </p>
                <h2 className="mt-1 font-display text-3xl uppercase text-ink-900 md:text-4xl">
                  Otras noticias
                </h2>
              </div>
              <Link
                href="/noticias"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Ver todas
                <ArrowRight size={14} />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <NewsCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
