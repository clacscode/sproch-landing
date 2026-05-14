import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/public/Section";
import { NewsCard } from "@/components/public/NewsCard";
import { Badge } from "@/components/ui/badge";
import { listAllTags, listNews } from "@/server/queries/news";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Comunicados, novedades académicas y publicaciones de la Sociedad de Prótesis y Rehabilitación Oral de Chile.",
};

interface SearchParams {
  tag?: string;
  q?: string;
}

export default async function NewsListingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [articles, tags] = await Promise.all([
    listNews({ tag: params.tag, q: params.q }),
    listAllTags(),
  ]);

  return (
    <>
      <section className="bg-ink-950 text-white">
        <div className="container-page py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            Noticias
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Comunicados y novedades
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Mantente al día con la actividad académica, gremial y científica de la sociedad.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/noticias">
              <Badge variant={params.tag ? "outline" : "brand"}>Todas</Badge>
            </Link>
            {tags.map((tag) => (
              <Link key={tag} href={`/noticias?tag=${encodeURIComponent(tag)}`}>
                <Badge variant={params.tag === tag ? "brand" : "outline"}>{tag}</Badge>
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="mt-12 text-ink-500">No hay noticias publicadas con este filtro.</p>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.id}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </>
  );
}
