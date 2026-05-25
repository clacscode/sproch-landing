import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/public/NewsCard";
import { NewsSearch } from "@/components/public/NewsSearch";
import { formatDate } from "@/lib/format";
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

  const [featured, ...rest] = articles;

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <Image
          src="/brand/DSC05470.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="absolute inset-0 object-cover object-center opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,12,16,0.94)_0%,rgba(12,12,16,0.82)_45%,rgba(12,12,16,0.6)_75%,rgba(40,4,8,0.5)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_42%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_28%,_transparent)_0%,_transparent_55%)]"
        />
        <div className="brand-bars" aria-hidden />
        <div className="hero-rays" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
        />

        <div className="container-page relative pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-44">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300">
                <span aria-hidden className="h-px w-10 bg-brand-500" />
                Noticias · Comunicados oficiales
              </p>
              <h1 className="mt-7 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[104px] lg:text-[140px]">
                La sociedad
                <span className="block text-brand-400 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  al día
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="max-w-md text-base text-ink-200 md:text-lg">
                Comunicados oficiales, novedades académicas, publicaciones científicas y
                actividad gremial. Todo lo que pasa en SPROCh, en un solo lugar.
              </p>
            </div>
          </div>

          {/* Strip print-like */}
          <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.22em] text-ink-300 md:mt-20 md:gap-x-6 md:text-sm">
            <span className="inline-flex items-center gap-2">
              <Newspaper size={14} className="text-brand-400" aria-hidden />
              {articles.length} {articles.length === 1 ? "publicación" : "publicaciones"}
            </span>
            <span aria-hidden className="text-ink-600">
              ·
            </span>
            <span>{tags.length} categorías</span>
            <span aria-hidden className="text-ink-600">
              ·
            </span>
            <span>Actualización continua</span>
          </div>
        </div>
      </section>

      {/* ──────────────── FILTROS ──────────────── */}
      <section className="bg-paper">
        <div className="container-page py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Filtrar y buscar
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight text-ink-900 md:text-4xl">
                Explora {articles.length}{" "}
                {articles.length === 1 ? "publicación" : "publicaciones"}
                {params.tag && (
                  <>
                    {" "}
                    <span className="text-ink-500">con etiqueta</span>{" "}
                    <span className="text-brand-700">{params.tag}</span>
                  </>
                )}
                {params.q && (
                  <>
                    {" "}
                    <span className="text-ink-500">para</span>{" "}
                    <span className="text-brand-700">&ldquo;{params.q}&rdquo;</span>
                  </>
                )}
              </h2>
            </div>
            <NewsSearch initialQuery={params.q ?? ""} initialTag={params.tag} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="-mx-4 flex flex-1 gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              <FilterPill href={params.q ? `/noticias?q=${encodeURIComponent(params.q)}` : "/noticias"} active={!params.tag}>
                Todas
              </FilterPill>
              {tags.map((tag) => {
                const sp = new URLSearchParams();
                sp.set("tag", tag);
                if (params.q) sp.set("q", params.q);
                return (
                  <FilterPill
                    key={tag}
                    href={`/noticias?${sp.toString()}`}
                    active={params.tag === tag}
                  >
                    {tag}
                  </FilterPill>
                );
              })}
            </div>
            {(params.tag || params.q) && (
              <Link
                href="/noticias"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Limpiar filtros
                <ArrowRight size={14} aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURED ──────────────── */}
      {!params.tag && !params.q && featured && (
        <section className="bg-paper">
          <div className="container-page pb-12 md:pb-16">
            <Link
              href={`/noticias/${featured.slug}`}
              className="card-lift group relative grid overflow-hidden rounded-3xl border border-ink-200 bg-white md:grid-cols-12"
            >
              {/* Visual side */}
              <div className="relative col-span-12 aspect-[16/10] overflow-hidden md:col-span-7 md:aspect-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-900 to-ink-950 transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]"
                />
                <div aria-hidden className="brand-bars" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                      Destacado
                    </Badge>
                    {featured.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="dark"
                        className="bg-white/10 text-white backdrop-blur"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="font-display text-6xl uppercase leading-none tracking-tight text-white/15 transition-colors group-hover:text-white/25 md:text-8xl">
                    SPROCh
                  </span>
                </div>
              </div>
              {/* Text side */}
              <div className="col-span-12 flex flex-col justify-center gap-5 p-8 md:col-span-5 md:p-10">
                <p className="inline-flex items-center gap-2 text-xs font-medium text-ink-500">
                  <CalendarDays size={14} className="text-brand-600" aria-hidden />
                  {formatDate(featured.publishedAt)}
                </p>
                <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-ink-900 md:text-4xl">
                  {featured.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-600 md:text-lg">
                  {featured.excerpt}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2.5 group-hover:text-brand-800">
                  Leer noticia destacada
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ──────────────── GRID ──────────────── */}
      <section className="bg-paper">
        <div className="container-page pb-20 md:pb-28">
          {articles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
              <p className="font-display text-2xl uppercase text-ink-900">
                Sin resultados
              </p>
              <p className="mt-3 text-ink-600">
                {params.q
                  ? <>No encontramos publicaciones que coincidan con <strong>&ldquo;{params.q}&rdquo;</strong>{params.tag ? <> en la categoría <strong>{params.tag}</strong></> : null}.</>
                  : "Probemos limpiar el filtro o explorar otra etiqueta."}
              </p>
              <Button asChild className="mt-6">
                <Link href="/noticias">
                  Ver todas las noticias
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {(!params.tag && !params.q && rest.length > 0) || params.tag || params.q ? (
                <div className="mb-8 flex items-center justify-between border-b border-ink-200 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-500">
                    {params.tag || params.q ? "Resultados" : "Más publicaciones"}
                  </p>
                  <p className="text-xs text-ink-500 tabular-nums">
                    {params.tag || params.q ? articles.length : rest.length} resultados
                  </p>
                </div>
              ) : null}

              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(params.tag || params.q ? articles : rest).map((article) => (
                  <li key={article.id}>
                    <NewsCard article={article} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
