import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

  return (
    <>
      <section className="bg-ink-950 text-white">
        <div className="container-page py-16 md:py-20">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Volver a noticias
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="dark" className="bg-white/10">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-300">
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
          <p className="text-lg leading-relaxed text-ink-700">{article.excerpt}</p>
          <div
            className="prose prose-neutral mt-8 max-w-none text-ink-800 [&_p]:my-4 [&_strong]:text-ink-900"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </Section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
