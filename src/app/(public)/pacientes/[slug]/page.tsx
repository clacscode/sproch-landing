import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Calendar, Mail, Share2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/public/NewsCard";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getPatientBySlug, listPatients } from "@/server/queries/patients";

export const revalidate = 60;

interface Params {
  slug: string;
}

// Sin prerender en build: el CI compila sin DB. Las páginas se generan
// on-demand (ISR) en el primer request, donde la DB sí está disponible.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPatientBySlug(slug);
  if (!article) return { title: "Artículo no encontrado" };
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

export default async function PatientArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getPatientBySlug(slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.authorName ?? siteConfig.legalName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/logo.png`,
      },
    },
    image: `${siteConfig.url}/pacientes/${article.slug}/opengraph-image`,
    mainEntityOfPage: `${siteConfig.url}/pacientes/${article.slug}`,
    keywords: article.tags.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name: "Pacientes", item: `${siteConfig.url}/pacientes` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${siteConfig.url}/pacientes/${article.slug}`,
      },
    ],
  };

  const related = (await listPatients({ limit: 4 }))
    .filter((p) => p.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
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

        <div className="container-page relative pb-16 pt-24 md:pb-24 md:pt-32 lg:pt-40">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Pacientes", href: "/pacientes" },
              { label: article.title },
            ]}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="dark"
                className="bg-white/10 text-white backdrop-blur"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.92] tracking-tight md:text-7xl lg:text-[88px]">
            {article.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
            <span className="inline-flex items-center gap-2">
              <Calendar size={15} className="text-brand-600" aria-hidden />
              {formatDate(article.publishedAt)}
            </span>
            {article.authorName && (
              <>
                <span aria-hidden className="text-ink-600">·</span>
                <span className="inline-flex items-center gap-2">
                  <User size={15} className="text-brand-600" aria-hidden />
                  {article.authorName}
                </span>
              </>
            )}
            <span aria-hidden className="text-ink-600">·</span>
            <span className="uppercase tracking-[0.18em] text-ink-400">
              Lectura · {Math.max(1, Math.ceil(article.content.length / 1400))} min
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── ARTICLE BODY ─────────── */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Article content */}
            <article className="md:col-span-8">
              <p className="border-l-4 border-brand-600 pl-6 font-display text-xl uppercase leading-tight tracking-tight text-ink-900 md:text-3xl">
                {article.excerpt}
              </p>
              <div
                className="mt-12 max-w-none text-base leading-relaxed text-ink-700 [&_a]:text-brand-700 [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900 [&_li]:my-2 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 md:text-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Footer del artículo */}
              <div className="mt-16 border-t border-ink-200 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-ink-500">
                    Publicado el {formatDate(article.publishedAt)}
                  </p>
                  <Link
                    href="/pacientes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    <ArrowRight size={14} aria-hidden className="rotate-180" />
                    Volver a pacientes
                  </Link>
                </div>
              </div>
            </article>

            {/* Sticky aside */}
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-32 md:self-start space-y-5">
                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="rounded-2xl border border-ink-200 bg-white p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                      Temáticas
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <li key={tag}>
                          <Link
                            href={`/pacientes?tag=${encodeURIComponent(tag)}`}
                            className="inline-flex items-center rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
                          >
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Share / contacto */}
                <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
                  <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    <Share2 size={14} aria-hidden />
                    Comparte
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">
                    Comparte esta información con quien la necesite.
                  </p>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${siteConfig.url}/pacientes/${article.slug}`)}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    <Mail size={14} aria-hidden />
                    Enviar por correo
                  </a>
                </div>

                {/* Contacto */}
                <div className="grain-overlay overflow-hidden rounded-2xl border border-ink-900 bg-ink-950 p-6 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-500">
                    ¿Tienes dudas?
                  </p>
                  <p className="mt-3 font-display text-xl uppercase tracking-tight">
                    Escríbenos
                  </p>
                  <p className="mt-2 text-sm text-ink-300">
                    Resolvemos tus consultas sobre prótesis y rehabilitación oral.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-4 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
                    <Link href="/contacto">
                      Contactar
                      <ArrowUpRight size={14} aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─────────── RELATED ─────────── */}
      {related.length > 0 && (
        <section className="bg-ink-50">
          <div className="container-page py-16 md:py-24">
            <div className="grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Sigue leyendo
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-6xl">
                  Más para
                  <br />
                  <span className="text-ink-500">pacientes</span>
                </h2>
              </div>
              <div className="flex md:col-span-4 md:justify-end md:pb-2">
                <Button asChild variant="outline">
                  <Link href="/pacientes">
                    Ver todo
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <NewsCard article={r} basePath="/pacientes" readLabel="Leer artículo" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
