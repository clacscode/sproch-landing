import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, GraduationCap, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventsTabs } from "@/components/public/EventsTabs";
import { formatDateRange, formatEventPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { listEvents } from "@/server/queries/events";

// Render por request: la DB vive en el server, no en el CI que compila.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cursos y Congresos",
  description:
    "Cursos, talleres y congresos organizados por la Sociedad de Prótesis y Rehabilitación Oral de Chile.",
};

export default async function EventsListingPage() {
  // La agenda muestra lo que viene; lo ya realizado vive en la pestaña "Eventos pasados".
  const [todos, cursos, congresos, pasados] = await Promise.all([
    listEvents({ upcomingOnly: true }),
    listEvents({ category: "CURSO", upcomingOnly: true }),
    listEvents({ category: "CONGRESO", upcomingOnly: true }),
    listEvents({ pastOnly: true }),
  ]);

  const featured = todos.find((e) => e.featured) ?? todos[0] ?? null;

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section className="grain-overlay bg-ink-950 relative isolate overflow-hidden text-white">
        <Image
          src="/brand/ABR07703.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="absolute inset-0 object-cover object-center opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,12,16,0.92)_0%,rgba(12,12,16,0.78)_45%,rgba(12,12,16,0.55)_75%,rgba(40,4,8,0.55)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_color-mix(in_oklab,_var(--color-brand-900)_28%,_transparent)_0%,_transparent_55%)]"
        />
        <div className="brand-bars" aria-hidden />
        <div className="hero-rays" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px] opacity-[0.06]"
        />

        <div className="container-page relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-brand-500 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase">
                <span aria-hidden className="bg-brand-500 h-px w-10" />
                Agenda académica · {new Date().getFullYear()}
              </p>
              <h1 className="font-display mt-7 text-6xl leading-[0.9] tracking-tight uppercase md:text-[104px] lg:text-[136px]">
                Cursos
                <span className="text-brand-600 block drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  & congresos
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="text-ink-200 max-w-md text-base md:text-lg">
                Instancias formativas y científicas, presenciales y virtuales. Pensadas para
                especialistas, residentes y estudiantes que buscan mantenerse a la vanguardia.
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:mt-20 md:grid-cols-4">
            {[
              { k: String(todos.length).padStart(2, "0"), v: "En agenda" },
              { k: String(congresos.length).padStart(2, "0"), v: "Congresos" },
              { k: String(cursos.length).padStart(2, "0"), v: "Cursos y talleres" },
              { k: String(pasados.length).padStart(2, "0"), v: "Eventos pasados" },
            ].map((s) => (
              <div key={s.v} className="bg-ink-950 p-6 md:p-7">
                <p className="font-display text-4xl text-white tabular-nums md:text-5xl">{s.k}</p>
                <p className="text-ink-400 mt-2 text-[10px] tracking-[0.18em] uppercase md:text-xs">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURED EVENT ──────────────── */}
      {featured && (
        <section className="bg-paper">
          <div className="container-page py-16 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
              <div>
                <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                  Próximo destacado
                </p>
                <h2 className="font-display text-ink-900 mt-3 text-4xl leading-[0.95] tracking-tight uppercase md:text-5xl">
                  No te lo pierdas
                </h2>
              </div>
              <Link
                href="#agenda"
                className="text-brand-700 hover:text-brand-800 hidden items-center gap-1.5 text-sm font-semibold sm:inline-flex"
              >
                Ver toda la agenda
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>

            <Link
              href={`/eventos/${featured.slug}`}
              className="card-lift group border-ink-200 relative grid overflow-hidden rounded-3xl border bg-white md:grid-cols-12"
            >
              <div className="bg-ink-950 relative col-span-12 aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,_var(--color-brand-700)_55%,_transparent)_0%,_transparent_60%),linear-gradient(140deg,#0c0c10_0%,#16161c_70%)]"
                />
                <div
                  aria-hidden
                  className="bg-brand-600 absolute inset-y-0 -left-2 w-3 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)]"
                />
                <Image
                  src={featured.coverImage}
                  alt={`Afiche ${featured.title}`}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.02] md:p-8"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={featured.category === "CONGRESO" ? "brand" : "dark"}>
                      {featured.category}
                    </Badge>
                    <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                      Destacado
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex flex-col justify-center gap-5 p-8 md:col-span-5 md:p-10">
                <h3 className="font-display text-ink-900 text-3xl leading-tight tracking-tight uppercase md:text-4xl">
                  {featured.title}
                </h3>
                <p className="text-ink-600 text-base leading-relaxed md:text-lg">
                  {featured.summary}
                </p>
                <ul className="grid gap-2.5 text-sm">
                  <li className="text-ink-700 flex items-center gap-2.5">
                    <CalendarDays size={16} className="text-brand-600" aria-hidden />
                    {formatDateRange(featured.startDate, featured.endDate)}
                  </li>
                  <li className="text-ink-700 flex items-center gap-2.5">
                    <MapPin size={16} className="text-brand-600" aria-hidden />
                    {featured.location}
                  </li>
                  {featured.capacity ? (
                    <li className="text-ink-700 flex items-center gap-2.5">
                      <Users size={16} className="text-brand-600" aria-hidden />
                      {featured.capacity} cupos
                    </li>
                  ) : null}
                </ul>
                <div className="border-ink-100 mt-2 flex items-center justify-between gap-4 border-t pt-5">
                  {featured.hidePrice ? (
                    <span aria-hidden />
                  ) : (
                    <div>
                      <p className="text-ink-500 text-[10px] font-semibold tracking-[0.18em] uppercase">
                        {featured.priceCLP === 0 ? "Acceso" : "Inversión"}
                      </p>
                      <p className="font-display text-ink-900 text-2xl tracking-tight uppercase">
                        {formatEventPrice(featured.priceCLP, { from: featured.priceFrom })}
                      </p>
                    </div>
                  )}
                  <Button asChild size="sm" className="btn-glow">
                    <span>
                      Ver detalle
                      <ArrowUpRight size={14} aria-hidden />
                    </span>
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ──────────────── AGENDA (tabs) ──────────────── */}
      <section id="agenda" className="border-ink-100 bg-paper border-t">
        <div className="container-page py-16 md:py-24">
          <div className="mb-10 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                Agenda completa
              </p>
              <h2 className="font-display text-ink-900 mt-3 text-5xl leading-[0.92] tracking-tight uppercase md:text-7xl">
                Toda la
                <br />
                <span className="text-ink-500">programación SPROCh</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Filtra por tipo de instancia y revisa fechas, inversión y cupos disponibles. En
                “Eventos pasados” queda el registro de las actividades ya realizadas. Los socios
                acceden con tarifa preferente en todas las actividades.
              </p>
            </div>
          </div>

          <EventsTabs
            todos={todos}
            cursos={cursos}
            congresos={congresos}
            pasados={pasados}
            comingSoon={siteConfig.features.eventsComingSoon}
          />
        </div>
      </section>

      {/* ──────────────── CTA / ¿Postular? ──────────────── */}
      <section className="bg-paper">
        <div className="container-page pb-20 md:pb-28">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Postular */}
            <div className="card-lift border-ink-200 relative overflow-hidden rounded-3xl border bg-white p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
              />
              <span className="bg-brand-50 text-brand-700 ring-brand-100 relative inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1">
                <GraduationCap size={22} aria-hidden />
              </span>
              <h3 className="font-display text-ink-900 relative mt-8 text-3xl leading-tight tracking-tight uppercase md:text-4xl">
                ¿Quieres dictar
                <br />
                un curso o charla?
              </h3>
              <p className="text-ink-600 relative mt-4 max-w-md">
                Las postulaciones a cursos y congresos se gestionan por convocatoria oficial.
                Escríbenos y te avisamos cuando se abra la próxima ventana de envío.
              </p>
              <Button asChild className="btn-glow relative mt-8">
                <Link href="/contacto">
                  Postular ahora
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </Button>
            </div>

            {/* Socio */}
            <div className="grain-overlay border-ink-900 bg-ink-950 relative overflow-hidden rounded-3xl border p-8 text-white md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
              />
              <span className="text-brand-500 relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Users size={22} aria-hidden />
              </span>
              <h3 className="font-display relative mt-8 text-3xl leading-tight tracking-tight uppercase md:text-4xl">
                Tarifa preferente
                <br />
                <span className="text-brand-500">para socios</span>
              </h3>
              <p className="text-ink-300 relative mt-4 max-w-md">
                Los socios activos acceden con descuento a cursos, talleres y congresos, y tienen
                prioridad de inscripción en actividades con cupo limitado.
              </p>
              <Button
                asChild
                variant="outline"
                className="relative mt-8 border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
              >
                <Link href="/socios">
                  Hazte socio
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
