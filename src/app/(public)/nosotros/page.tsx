import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Award, Compass, HeartHandshake, Lightbulb, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directorioSantiago, milestones } from "@/data/board";
import { filiales } from "@/data/filiales";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión y directiva de la Sociedad de Prótesis y Rehabilitación Oral de Chile.",
};

const principles = [
  {
    icon: Compass,
    title: "Misión",
    description:
      "Promover el conocimiento, la enseñanza y el ejercicio profesional de la prótesis y rehabilitación oral en Chile e Iberoamérica.",
  },
  {
    icon: Lightbulb,
    title: "Visión",
    description:
      "Ser referente científico y académico latinoamericano, integrando práctica clínica, investigación y tecnologías emergentes.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description:
      "Aplicamos estándares clínicos y académicos rigurosos en todas nuestras actividades formativas y publicaciones.",
  },
  {
    icon: HeartHandshake,
    title: "Comunidad",
    description:
      "Construimos red entre especialistas, residentes y estudiantes para fortalecer la disciplina en el largo plazo.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p))
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export default function NosotrosPage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <Image
          src="/brand/DSC05591.jpg"
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
                Quiénes somos · Desde 1952
              </p>
              <h1 className="mt-7 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-[104px] lg:text-[136px]">
                Setenta años
                <span className="block text-brand-600 drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  rehabilitando
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="max-w-md text-base text-ink-200 md:text-lg">
                Desde 1952 reunimos a especialistas y académicos comprometidos con la formación
                continua, la investigación clínica y la innovación en prótesis y rehabilitación
                oral.
              </p>
            </div>
          </div>

          {/* Editorial stats row */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:mt-20 md:grid-cols-4">
            {[
              { k: "1952", v: "Año de fundación" },
              { k: "+74", v: "Años de historia" },
              { k: "05", v: "Filiales regionales" },
              { k: "+1k", v: "Especialistas conectados" },
            ].map((s) => (
              <div key={s.k} className="bg-ink-950 p-6 md:p-7">
                <p className="font-display text-4xl text-white tabular-nums md:text-5xl">{s.k}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ink-400 md:text-xs">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── PRINCIPIOS (bento asimétrico) ───────────────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Principios
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Lo que nos
                <br />
                <span className="text-ink-500">mueve a diario</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Cuatro principios guían nuestra labor científica, académica y gremial. Definen
                cómo construimos comunidad y cómo evaluamos cada iniciativa antes de poner el
                sello SPROCh.
              </p>
            </div>
          </div>

          {/* Bento: dos grandes + dos pequeños */}
          <div className="mt-14 grid gap-5 md:grid-cols-12 md:auto-rows-fr">
            {principles.map(({ icon: Icon, title, description }, idx) => {
              const layout = [
                "md:col-span-7", // Misión — wide
                "md:col-span-5", // Visión — narrow
                "md:col-span-5", // Excelencia — narrow
                "md:col-span-7", // Comunidad — wide
              ][idx];
              const dark = idx === 0 || idx === 3;
              return (
                <article
                  key={title}
                  className={`card-lift ${dark ? "grain-overlay" : ""} group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border ${
                    dark
                      ? "border-ink-900 bg-ink-950 text-white"
                      : "border-ink-200 bg-white text-ink-900"
                  } p-8 md:p-10 ${layout}`}
                >
                  {dark && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                          dark
                            ? "bg-white/10 text-brand-500 ring-white/15"
                            : "bg-brand-50 text-brand-700 ring-brand-100"
                        }`}
                      >
                        <Icon size={22} aria-hidden />
                      </span>
                      <span
                        aria-hidden
                        className={`font-display text-2xl tabular-nums ${
                          dark ? "text-ink-500" : "text-ink-300"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`mt-10 font-display text-3xl uppercase leading-tight tracking-tight md:text-4xl ${
                        dark ? "text-white" : "text-ink-900"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-4 max-w-md leading-relaxed ${
                        dark ? "text-ink-200" : "text-ink-600"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────── HISTORIA (timeline editorial) ───────────────────── */}
      <section className="bg-ink-50">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Historia
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-6xl">
                Hitos
                <br />
                <span className="text-ink-500">que nos definen</span>
              </h2>
              <p className="mt-6 max-w-sm text-ink-600">
                Cuatro momentos que marcaron la trayectoria de la sociedad y el rumbo de la
                disciplina en el país.
              </p>
            </div>

            <ol className="md:col-span-8">
              {milestones.map((m, idx) => (
                <li
                  key={m.year}
                  className="relative grid grid-cols-[auto_1fr] gap-6 border-b border-ink-200 py-10 last:border-b-0 md:gap-10 md:py-12"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-display text-5xl text-brand-700 tabular-nums md:text-6xl">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                      Hito · {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:pt-2">
                    <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-ink-900 md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
                      {m.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────────────────── DIRECTORIO ───────────────────── */}
      <section className="grain-overlay relative isolate overflow-hidden bg-ink-950 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_40%,_transparent)_0%,_transparent_70%)]"
        />
        <div className="container-page relative py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                Comité directivo
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight md:text-7xl">
                El equipo
                <br />
                <span className="text-ink-400">que lidera SPROCh</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-300 md:text-lg">
                Directorio nacional con sede en Santiago. Especialistas reconocidos en la
                disciplina que coordinan las actividades académicas, científicas y gremiales
                del período.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {directorioSantiago.map((m, idx) => (
              <li
                key={m.name}
                className="group relative flex items-start gap-5 bg-ink-950 p-6 transition-colors hover:bg-white/[0.03] md:p-7"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-900 font-display text-xl text-white shadow-[inset_0_-8px_24px_rgba(0,0,0,0.25)]">
                  {initials(m.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base uppercase leading-tight tracking-tight text-white md:text-lg">
                    {m.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-brand-500">
                    {m.role}
                  </p>
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="mt-2 inline-flex items-center gap-1.5 break-all text-[11px] text-ink-400 transition-colors hover:text-brand-500"
                    >
                      <Mail size={11} aria-hidden />
                      {m.email}
                    </a>
                  )}
                </div>
                <span
                  aria-hidden
                  className="font-display text-base text-ink-700 tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <p className="max-w-xl text-sm text-ink-300">
              ¿Quieres saber más sobre cómo se eligen los cargos o cómo postular al comité? El
              proceso está abierto a socios activos.
            </p>
            <Button asChild className="btn-glow">
              <Link href="/socios">
                Conoce el proceso
                <ArrowRight size={15} aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────────────────── FILIALES (mapa nacional) ───────────────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Red nacional
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Cinco filiales,
                <br />
                <span className="text-ink-500">un mismo país</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Además del directorio nacional, SPROCh se articula a lo largo de Chile a través
                de filiales regionales que coordinan la actividad académica y gremial en cada
                macrozona.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-12 md:auto-rows-fr">
            {filiales.map((f, idx) => {
              const layouts = [
                "md:col-span-6 lg:col-span-4",
                "md:col-span-6 lg:col-span-8",
                "md:col-span-6 lg:col-span-8",
                "md:col-span-6 lg:col-span-4",
                "md:col-span-12",
              ];
              const president = f.board.find((m) => /presidente/i.test(m.role));
              const rest = f.board.filter((m) => m !== president);
              return (
                <li
                  key={f.slug}
                  className={`card-lift group relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border border-ink-200 bg-white p-7 md:p-8 ${layouts[idx]}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                        <MapPin size={22} aria-hidden />
                      </span>
                      <span className="font-display text-xs uppercase tracking-[0.22em] text-ink-400 tabular-nums">
                        Zona {f.zone} · {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl uppercase leading-tight tracking-tight text-ink-900 md:text-3xl">
                      {f.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600 md:text-base">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {/* Presidente destacado */}
                    {president && (
                      <div className="rounded-2xl border border-ink-100 bg-paper p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                          Presidente
                        </p>
                        <p className="mt-2 font-semibold text-ink-900">{president.name}</p>
                        {president.email && (
                          <a
                            href={`mailto:${president.email}`}
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-600 transition-colors hover:text-brand-700"
                          >
                            <Mail size={12} aria-hidden />
                            {president.email}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Comité expandible */}
                    {rest.length > 0 && (
                      <details className="group/details rounded-2xl border border-ink-100">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 list-none p-4 text-sm">
                          <span className="inline-flex items-center gap-2 font-semibold text-ink-800">
                            Ver comité completo
                            <span className="text-xs text-ink-500 tabular-nums">
                              ({rest.length + 1})
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-transform group-open/details:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <ul className="border-t border-ink-100 px-4 py-3 text-sm">
                          {rest.map((m) => (
                            <li
                              key={m.name}
                              className="flex flex-col gap-0.5 border-b border-ink-100 py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-ink-900">{m.name}</span>
                                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-500">
                                  {m.role}
                                </span>
                              </div>
                              {m.email && (
                                <a
                                  href={`mailto:${m.email}`}
                                  className="break-all text-xs text-ink-600 transition-colors hover:text-brand-700"
                                >
                                  {m.email}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}

                    {/* Ciudades */}
                    <div className="border-t border-ink-100 pt-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-500">
                        Cobertura
                      </p>
                      <p className="mt-2 text-sm font-medium text-ink-800">
                        {f.cities.join(" · ")}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────────────── CTA FINAL ───────────────────── */}
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                  Forma parte
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink-900 md:text-5xl">
                  Súmate a la sociedad
                  <br />
                  <span className="text-ink-500">científica con más historia del país</span>
                </h2>
                <p className="mt-5 max-w-xl text-ink-600">
                  Acceso a cursos preferentes, certificaciones, publicaciones y la red
                  iberoamericana de sociedades hermanas.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
                <Button asChild size="lg" className="btn-glow">
                  <Link href="/socios">
                    Hazte socio
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contacto">
                    Contactar al equipo
                    <ArrowUpRight size={15} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
