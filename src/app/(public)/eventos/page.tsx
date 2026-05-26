import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, GraduationCap, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventsTabs } from "@/components/public/EventsTabs";
import { formatCLP, formatDateRange } from "@/lib/format";
import { listEvents } from "@/server/queries/events";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cursos y Congresos",
  description:
    "Cursos, talleres y congresos organizados por la Sociedad de Prótesis y Rehabilitación Oral de Chile.",
};

export default async function EventsListingPage() {
  const [todos, cursos, congresos] = await Promise.all([
    listEvents(),
    listEvents({ category: "CURSO" }),
    listEvents({ category: "CONGRESO" }),
  ]);

  const featured = todos.find((e) => e.featured) ?? todos[0] ?? null;

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
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
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
        />

        <div className="container-page relative pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-44">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
                <span aria-hidden className="h-px w-10 bg-brand-500" />
                Agenda académica · {new Date().getFullYear()}
              </p>
              <h1 className="mt-7 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[104px] lg:text-[136px]">
                Cursos
                <span className="block text-brand-600 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  & congresos
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="max-w-md text-base text-ink-200 md:text-lg">
                Instancias formativas y científicas, presenciales y virtuales. Pensadas para
                especialistas, residentes y estudiantes que buscan mantenerse a la vanguardia.
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:mt-20 md:grid-cols-4">
            {[
              { k: String(todos.length).padStart(2, "0"), v: "Total publicados" },
              { k: String(congresos.length).padStart(2, "0"), v: "Congresos" },
              { k: String(cursos.length).padStart(2, "0"), v: "Cursos y talleres" },
              { k: "CL", v: "Sede principal" },
            ].map((s) => (
              <div key={s.v} className="bg-ink-950 p-6 md:p-7">
                <p className="font-display text-4xl text-white tabular-nums md:text-5xl">{s.k}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ink-400 md:text-xs">
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Próximo destacado
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink-900 md:text-5xl">
                  No te lo pierdas
                </h2>
              </div>
              <Link
                href="#agenda"
                className="hidden items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:inline-flex"
              >
                Ver toda la agenda
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>

            <Link
              href={`/eventos/${featured.slug}`}
              className="card-lift group relative grid overflow-hidden rounded-3xl border border-ink-200 bg-white md:grid-cols-12"
            >
              <div className="relative col-span-12 aspect-[16/10] overflow-hidden md:col-span-7 md:aspect-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_60%),linear-gradient(140deg,#0c0c10_0%,#16161c_70%)] transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute -left-2 inset-y-0 w-3 bg-brand-600 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-10 [background-image:linear-gradient(60deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]"
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
                  <div>
                    <p className="font-display text-7xl uppercase leading-none tracking-tight text-white/15 transition-colors group-hover:text-white/25 md:text-8xl">
                      SPROCh
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex flex-col justify-center gap-5 p-8 md:col-span-5 md:p-10">
                <h3 className="font-display text-3xl uppercase leading-tight tracking-tight text-ink-900 md:text-4xl">
                  {featured.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-600 md:text-lg">
                  {featured.summary}
                </p>
                <ul className="grid gap-2.5 text-sm">
                  <li className="flex items-center gap-2.5 text-ink-700">
                    <CalendarDays size={16} className="text-brand-600" aria-hidden />
                    {formatDateRange(featured.startDate, featured.endDate)}
                  </li>
                  <li className="flex items-center gap-2.5 text-ink-700">
                    <MapPin size={16} className="text-brand-600" aria-hidden />
                    {featured.location}
                  </li>
                  {featured.capacity ? (
                    <li className="flex items-center gap-2.5 text-ink-700">
                      <Users size={16} className="text-brand-600" aria-hidden />
                      {featured.capacity} cupos
                    </li>
                  ) : null}
                </ul>
                <div className="mt-2 flex items-center justify-between gap-4 border-t border-ink-100 pt-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                      {featured.priceCLP === 0 ? "Acceso" : "Inversión"}
                    </p>
                    <p className="font-display text-2xl uppercase tracking-tight text-ink-900">
                      {featured.priceCLP === 0 ? "Sin costo" : formatCLP(featured.priceCLP)}
                    </p>
                  </div>
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
      <section id="agenda" className="border-t border-ink-100 bg-paper">
        <div className="container-page py-16 md:py-24">
          <div className="mb-10 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Agenda completa
              </p>
              <h2 className="mt-3 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Toda la
                <br />
                <span className="text-ink-500">programación SPROCh</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Filtra por tipo de instancia y revisa fechas, inversión y cupos disponibles.
                Los socios acceden con tarifa preferente en todas las actividades.
              </p>
            </div>
          </div>

          <EventsTabs todos={todos} cursos={cursos} congresos={congresos} />
        </div>
      </section>

      {/* ──────────────── CTA / ¿Postular? ──────────────── */}
      <section className="bg-paper">
        <div className="container-page pb-20 md:pb-28">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Postular */}
            <div className="card-lift relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
              />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                <GraduationCap size={22} aria-hidden />
              </span>
              <h3 className="relative mt-8 font-display text-3xl uppercase leading-tight tracking-tight text-ink-900 md:text-4xl">
                ¿Quieres dictar
                <br />
                un curso o charla?
              </h3>
              <p className="relative mt-4 max-w-md text-ink-600">
                Las postulaciones a cursos y congresos se gestionan por convocatoria oficial.
                Escríbenos y te avisamos cuando se abra la próxima ventana de envío.
              </p>
              <Button asChild className="relative mt-8 btn-glow">
                <Link href="/contacto">
                  Postular ahora
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </Button>
            </div>

            {/* Socio */}
            <div className="grain-overlay relative overflow-hidden rounded-3xl border border-ink-900 bg-ink-950 p-8 text-white md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-32 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
              />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-500 ring-1 ring-white/15">
                <Users size={22} aria-hidden />
              </span>
              <h3 className="relative mt-8 font-display text-3xl uppercase leading-tight tracking-tight md:text-4xl">
                Tarifa preferente
                <br />
                <span className="text-brand-500">para socios</span>
              </h3>
              <p className="relative mt-4 max-w-md text-ink-300">
                Los socios activos acceden con descuento a cursos, talleres y congresos, y
                tienen prioridad de inscripción en actividades con cupo limitado.
              </p>
              <Button asChild variant="outline" className="relative mt-8 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40">
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
