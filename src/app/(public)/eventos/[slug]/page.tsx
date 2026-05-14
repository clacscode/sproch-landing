import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Ticket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/public/Section";
import { SponsorsStrip } from "@/components/public/SponsorsStrip";
import { formatCLP, formatDateRange } from "@/lib/format";
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

  const enrollDisabled = !isWebpayConfigured() || event.priceCLP === 0;

  const jsonLd = {
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
    offers:
      event.priceCLP > 0
        ? {
            "@type": "Offer",
            price: event.priceCLP,
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/eventos/${event.slug}`,
          }
        : undefined,
  };

  return (
    <>
      <section className="relative bg-ink-950 text-white">
        <div className="brand-bars" aria-hidden />
        <div className="container-page relative py-16 md:py-20">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Volver a eventos
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
              {event.category}
            </Badge>
            {event.featured && <Badge variant="dark">Destacado</Badge>}
          </div>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            {event.title}
          </h1>
          <p className="mt-6 max-w-2xl text-ink-200">{event.summary}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Fechas
              </dt>
              <dd className="mt-2 flex items-center gap-2 text-sm text-white">
                <CalendarDays size={16} className="text-brand-500" />
                {formatDateRange(event.startDate, event.endDate)}
              </dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Sede
              </dt>
              <dd className="mt-2 flex items-center gap-2 text-sm text-white">
                <MapPin size={16} className="text-brand-500" />
                {event.location}
              </dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <dt className="text-xs font-semibold uppercase tracking-widest text-ink-400">
                Valor
              </dt>
              <dd className="mt-2 flex items-center gap-2 text-sm text-white">
                <Ticket size={16} className="text-brand-500" />
                {event.priceCLP === 0 ? "Sin costo" : formatCLP(event.priceCLP)}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            {enrollDisabled ? (
              <Button size="lg" disabled className="cursor-not-allowed opacity-70">
                Inscripción próximamente disponible
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href={`/eventos/${event.slug}/inscripcion`}>Inscribirme ahora</Link>
              </Button>
            )}
            {!isWebpayConfigured() && event.priceCLP > 0 && (
              <p className="mt-3 text-xs text-ink-400">
                Estamos habilitando la pasarela de pago WebPay. Te avisaremos cuando se abran
                las inscripciones.
              </p>
            )}
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page grid gap-12 md:grid-cols-3">
          <article className="md:col-span-2">
            <SectionHeader eyebrow="Acerca del evento" title="Programa académico" />
            <div
              className="prose prose-neutral mt-6 max-w-none text-ink-700"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: event.content }}
            />

            {event.program?.length ? (
              <ol className="mt-10 space-y-6">
                {event.program.map((day) => (
                  <li key={day.day} className="rounded-xl border border-ink-100 p-6">
                    <h3 className="font-display text-2xl text-brand-700">{day.day}</h3>
                    <ul className="mt-4 divide-y divide-ink-100">
                      {day.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4 py-3 text-sm">
                          <span className="w-16 shrink-0 font-mono text-ink-500">{item.time}</span>
                          <span className="text-ink-800">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : null}
          </article>

          <aside className="md:col-span-1">
            {event.capacity ? (
              <div className="rounded-xl border border-ink-100 bg-ink-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Cupos
                </p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-ink-900">
                  <Users size={20} className="text-brand-600" />
                  {event.capacity}
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Cupos limitados. Te recomendamos inscribirte con anticipación.
                </p>
              </div>
            ) : null}

            {event.speakers?.length ? (
              <div className="mt-6 rounded-xl border border-ink-100 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Expositores
                </p>
                <ul className="mt-4 space-y-3">
                  {event.speakers.map((s) => (
                    <li key={s.name} className="text-sm">
                      <p className="font-semibold text-ink-900">{s.name}</p>
                      {s.country && <p className="text-xs text-ink-500">{s.country}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      {event.sponsors?.length ? (
        <Section className="bg-ink-50">
          <div className="container-page">
            <SponsorsStrip sponsors={event.sponsors} title="Auspiciadores" />
          </div>
        </Section>
      ) : null}

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
