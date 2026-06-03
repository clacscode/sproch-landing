import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SponsorsStrip } from "@/components/public/SponsorsStrip";
import { formatDateRange, formatEventPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getEventBySlug, listEvents } from "@/server/queries/events";

export const revalidate = 60;

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const items = await listEvents();
  return items.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Evento no encontrado" };
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article",
    },
  };
}

function isWebpayConfigured() {
  return Boolean(process.env.WEBPAY_COMMERCE_CODE && process.env.WEBPAY_API_KEY);
}

export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const isExternal = Boolean(event.registrationUrl);
  const enrollDisabled = !isExternal && (!isWebpayConfigured() || event.priceCLP === 0);
  const priceLabel = formatEventPrice(event.priceCLP, { from: event.priceFrom });

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.location, address: event.location },
    organizer: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url },
    image: `${siteConfig.url}/eventos/${event.slug}/opengraph-image`,
    offers:
      event.priceCLP > 0
        ? {
            "@type": "Offer",
            price: event.priceCLP,
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
            url: event.registrationUrl ?? `${siteConfig.url}/eventos/${event.slug}`,
          }
        : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteConfig.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cursos y Congresos",
        item: `${siteConfig.url}/eventos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: event.title,
        item: `${siteConfig.url}/eventos/${event.slug}`,
      },
    ],
  };

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_28%,_transparent)_0%,_transparent_55%)]"
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
              { label: "Cursos y Congresos", href: "/eventos" },
              { label: event.title },
            ]}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
              {event.category}
            </Badge>
            {event.featured && (
              <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                Destacado
              </Badge>
            )}
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.92] tracking-tight md:text-7xl lg:text-[88px]">
            {event.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base text-ink-200 md:text-lg">{event.summary}</p>

          {/* Quick facts strip */}
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-3">
            <div className="bg-ink-950 p-5 md:p-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                Fechas
              </dt>
              <dd className="mt-3 flex items-start gap-2.5 text-sm font-medium text-white md:text-base">
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                <span>{formatDateRange(event.startDate, event.endDate)}</span>
              </dd>
            </div>
            <div className="bg-ink-950 p-5 md:p-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                Sede
              </dt>
              <dd className="mt-3 flex items-start gap-2.5 text-sm font-medium text-white md:text-base">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                <span>{event.location}</span>
              </dd>
            </div>
            <div className="col-span-2 bg-ink-950 p-5 md:col-span-1 md:p-6">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                Inversión
              </dt>
              <dd className="mt-3 flex items-center gap-2.5 text-white">
                <Ticket size={16} className="shrink-0 text-brand-600" aria-hidden />
                <span className="font-display text-xl uppercase tracking-tight md:text-2xl">
                  {priceLabel}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {enrollDisabled ? (
              <Button size="lg" disabled className="cursor-not-allowed opacity-70">
                Inscripción próximamente
              </Button>
            ) : isExternal ? (
              <Button asChild size="lg" className="btn-glow">
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Inscribirme en Welcu
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-glow">
                <Link href={`/eventos/${event.slug}/inscripcion`}>
                  Inscribirme ahora
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
              <Link href="/contacto">
                Consultar
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            </Button>
            {!isExternal && !isWebpayConfigured() && event.priceCLP > 0 && (
              <p className="text-xs text-ink-400">
                La pasarela de pago WebPay se habilitará próximamente.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── CONTENIDO + SIDEBAR ─────────── */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Article */}
            <article className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Acerca del evento
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-5xl">
                Programa
                <br />
                <span className="text-ink-500">académico</span>
              </h2>

              <div
                className="mt-10 max-w-none text-base leading-relaxed text-ink-700 [&_a]:text-brand-700 [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:text-ink-900 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900 [&_li]:my-2 [&_p]:my-5 [&_strong]:font-semibold [&_strong]:text-ink-900 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 md:text-lg"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: event.content }}
              />

              <div className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Programa día a día
                </p>
                <h3 className="mt-3 font-display text-3xl uppercase leading-tight tracking-tight text-ink-900 md:text-4xl">
                  Cronograma
                </h3>
                {event.program?.length ? (
                  <ol className="mt-8 space-y-4">
                    {event.program.map((day, idx) => (
                      <li
                        key={day.day}
                        className="overflow-hidden rounded-2xl border border-ink-200 bg-white"
                      >
                        <div className="flex items-baseline gap-5 border-b border-ink-100 bg-paper px-6 py-4 md:px-8">
                          <span className="font-display text-2xl text-brand-700 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-display text-xl uppercase tracking-tight text-ink-900 md:text-2xl">
                            {day.day}
                          </h4>
                        </div>
                        <ul className="divide-y divide-ink-100 px-6 md:px-8">
                          {day.items.map((item, i) => (
                            <li key={i} className="flex items-baseline gap-5 py-4 text-sm md:gap-8">
                              <span className="w-20 shrink-0 font-mono text-xs uppercase tracking-wider text-brand-600 tabular-nums">
                                {item.time}
                              </span>
                              <span className="text-ink-800 md:text-base">{item.title}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="mt-8 rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-12 text-center">
                    <p className="font-display text-xl uppercase tracking-tight text-ink-900">
                      Programa próximamente
                    </p>
                    <p className="mx-auto mt-3 max-w-md text-ink-600">
                      Estamos finalizando la agenda día a día del congreso. Muy pronto publicaremos
                      el cronograma completo de conferencias y talleres.
                    </p>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="md:col-span-4">
              <div className="md:sticky md:top-32 md:self-start space-y-5">
                {/* Inscripción card */}
                <div className="card-lift overflow-hidden rounded-3xl border border-ink-200 bg-white p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    Inscripción
                  </p>
                  <p className="mt-3 font-display text-3xl uppercase tracking-tight text-ink-900">
                    {priceLabel}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-500">
                    {event.priceCLP === 0
                      ? "Acceso libre con registro"
                      : event.priceFrom
                        ? "Según categoría · ver todas las tarifas"
                        : "Por persona · IVA incluido"}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm">
                    <li className="flex items-start gap-2.5 text-ink-700">
                      <CalendarDays size={15} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                      {formatDateRange(event.startDate, event.endDate)}
                    </li>
                    <li className="flex items-start gap-2.5 text-ink-700">
                      <MapPin size={15} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                      {event.location}
                    </li>
                    {event.capacity ? (
                      <li className="flex items-start gap-2.5 text-ink-700">
                        <Users size={15} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                        {event.capacity} cupos · inscripción anticipada recomendada
                      </li>
                    ) : null}
                  </ul>

                  {enrollDisabled ? (
                    <Button disabled className="mt-6 w-full cursor-not-allowed opacity-70">
                      Inscripción próximamente
                    </Button>
                  ) : isExternal ? (
                    <Button asChild className="btn-glow mt-6 w-full">
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                        Inscribirme en Welcu
                        <ArrowUpRight size={15} aria-hidden />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="btn-glow mt-6 w-full">
                      <Link href={`/eventos/${event.slug}/inscripcion`}>
                        Inscribirme
                        <ArrowRight size={15} aria-hidden />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Expositores */}
                {event.speakers?.length ? (
                  <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white p-6 md:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                      Expositores
                    </p>
                    <ul className="mt-5 divide-y divide-ink-100">
                      {event.speakers.map((s, idx) => (
                        <li key={s.name} className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
                          <span className="font-display text-base text-ink-400 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                            {s.country && (
                              <p className="text-xs uppercase tracking-[0.16em] text-ink-500">
                                {s.country}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* CTA contacto */}
                <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    ¿Dudas?
                  </p>
                  <p className="mt-3 font-display text-lg uppercase tracking-tight text-ink-900">
                    Habla con el equipo
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    Si necesitas información adicional sobre cupos, alianzas o facturación,
                    escríbenos directamente.
                  </p>
                  <Button asChild variant="secondary" size="sm" className="mt-4">
                    <Link href="/contacto">
                      Contactar
                      <ArrowRight size={14} aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {event.sponsors?.length ? (
        <section className="bg-ink-50">
          <div className="container-page py-16 md:py-20">
            <SponsorsStrip sponsors={event.sponsors} title="Auspiciadores" variant="marquee" />
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
