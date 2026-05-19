import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/public/Section";
import { NewsCard } from "@/components/public/NewsCard";
import { listAllTags, listNews } from "@/server/queries/news";

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-pressed={active}
      className={
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all " +
        (active
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700")
      }
    >
      {children}
    </Link>
  );
}

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
      <section className="relative isolate overflow-hidden bg-brand-fade text-white">
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
              Filtrar por temática
            </p>
            <p className="text-xs text-ink-500">
              {articles.length} {articles.length === 1 ? "noticia" : "noticias"}
              {params.tag && (
                <>
                  {" "}con la etiqueta{" "}
                  <span className="font-semibold text-ink-900">{params.tag}</span>
                </>
              )}
            </p>
          </div>

          <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <FilterPill href="/noticias" active={!params.tag}>
              Todas
            </FilterPill>
            {tags.map((tag) => (
              <FilterPill
                key={tag}
                href={`/noticias?tag=${encodeURIComponent(tag)}`}
                active={params.tag === tag}
              >
                {tag}
              </FilterPill>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="mt-12 rounded-xl border border-dashed border-ink-200 bg-ink-50 px-6 py-12 text-center">
              <p className="text-base text-ink-700">No hay noticias con este filtro.</p>
              <Link
                href="/noticias"
                className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Ver todas las noticias →
              </Link>
            </div>
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
