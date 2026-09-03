import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Compass,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { directorioSantiago, milestones } from "@/data/board";
import { filiales } from "@/data/filiales";

// Sin esto la página es 100% estática y Next emite s-maxage=1 año: el CDN de
// Hostinger (hcdn) la congela y los deploys no se ven. 5 min acota ese caché.
export const revalidate = 300;

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
      <section className="grain-overlay bg-ink-950 relative isolate overflow-hidden text-white">
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
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px] opacity-[0.06]"
        />

        <div className="container-page relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-brand-500 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase">
                <span aria-hidden className="bg-brand-500 h-px w-10" />
                Quiénes somos · Desde 1952
              </p>
              <h1 className="font-display mt-7 text-6xl leading-[0.9] tracking-tight uppercase md:text-[104px] lg:text-[136px]">
                Setenta años
                <span className="text-brand-600 block drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                  rehabilitando
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="text-ink-200 max-w-md text-base md:text-lg">
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
              { k: "74", v: "Años de historia" },
              { k: "05", v: "Filiales regionales" },
              { k: "+1k", v: "Especialistas conectados" },
            ].map((s) => (
              <div key={s.k} className="bg-ink-950 p-6 md:p-7">
                <p className="font-display text-4xl text-white tabular-nums md:text-5xl">{s.k}</p>
                <p className="text-ink-400 mt-2 text-[10px] tracking-[0.18em] uppercase md:text-xs">
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
              <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                Principios
              </p>
              <h2 className="font-display text-ink-900 mt-4 text-5xl leading-[0.92] tracking-tight uppercase md:text-7xl">
                Lo que nos
                <br />
                <span className="text-ink-500">mueve a diario</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Cuatro principios guían nuestra labor científica, académica y gremial. Definen cómo
                construimos comunidad y cómo evaluamos cada iniciativa antes de poner el sello
                SPROCh.
              </p>
            </div>
          </div>

          {/* Bento: dos grandes + dos pequeños */}
          <div className="mt-14 grid gap-5 md:auto-rows-fr md:grid-cols-12">
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
                      : "border-ink-200 text-ink-900 bg-white"
                  } p-8 md:p-10 ${layout}`}
                >
                  {dark && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_45%,_transparent)_0%,_transparent_70%)]"
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${
                          dark
                            ? "text-brand-500 bg-white/10 ring-white/15"
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
                      className={`font-display mt-10 text-3xl leading-tight tracking-tight uppercase md:text-4xl ${
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
            <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
              <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                Historia
              </p>
              <h2 className="font-display text-ink-900 mt-4 text-5xl leading-[0.92] tracking-tight uppercase md:text-6xl">
                Hitos
                <br />
                <span className="text-ink-500">que nos definen</span>
              </h2>
              <p className="text-ink-600 mt-6 max-w-sm">
                Cuatro momentos que marcaron la trayectoria de la sociedad y el rumbo de la
                disciplina en el país.
              </p>
            </div>

            <ol className="md:col-span-8">
              {milestones.map((m, idx) => (
                <li
                  key={m.year}
                  className="border-ink-200 relative grid grid-cols-[auto_1fr] gap-6 border-b py-10 last:border-b-0 md:gap-10 md:py-12"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-display text-brand-700 text-5xl tabular-nums md:text-6xl">
                      {m.year}
                    </span>
                    <span className="text-ink-500 text-[10px] font-semibold tracking-[0.22em] uppercase">
                      Hito · {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:pt-2">
                    <h3 className="font-display text-ink-900 text-2xl leading-tight tracking-tight uppercase md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="text-ink-600 mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
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
      <section className="grain-overlay bg-ink-950 relative isolate overflow-hidden text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 -left-40 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_40%,_transparent)_0%,_transparent_70%)]"
        />
        <div className="container-page relative py-20 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-brand-500 text-xs font-semibold tracking-[0.22em] uppercase">
                Comité directivo
              </p>
              <h2 className="font-display mt-4 text-5xl leading-[0.92] tracking-tight uppercase md:text-7xl">
                El equipo
                <br />
                <span className="text-ink-400">que lidera SPROCh</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-300 md:text-lg">
                Directorio nacional con sede en Santiago. Especialistas reconocidos en la disciplina
                que coordinan las actividades académicas, científicas y gremiales del período.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {directorioSantiago.map((m, idx) => (
              <li
                key={m.name}
                className="group bg-ink-950 relative flex flex-col p-6 transition-colors hover:bg-white/[0.03] md:p-7"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`Retrato de ${m.name}`}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 88vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="font-display text-brand-500/70 flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.07)_0%,transparent_65%)] text-4xl tracking-widest">
                      {initials(m.name)}
                    </div>
                  )}
                  <span
                    aria-hidden
                    className="font-display bg-ink-950/60 absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs text-white/60 tabular-nums backdrop-blur"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 min-w-0">
                  <p className="font-display text-base leading-tight tracking-tight text-white uppercase md:text-lg">
                    {m.name}
                  </p>
                  <p className="text-brand-500 mt-1 text-[11px] tracking-[0.18em] uppercase">
                    {m.role}
                  </p>
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="text-ink-400 hover:text-brand-500 mt-2 inline-flex items-center gap-1.5 text-[11px] break-all transition-colors"
                    >
                      <Mail size={11} aria-hidden />
                      {m.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <p className="text-ink-300 max-w-xl text-sm">
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
              <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                Red nacional
              </p>
              <h2 className="font-display text-ink-900 mt-4 text-5xl leading-[0.92] tracking-tight uppercase md:text-7xl">
                Cinco filiales,
                <br />
                <span className="text-ink-500">un mismo país</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Además del directorio nacional, SPROCh se articula a lo largo de Chile a través de
                filiales regionales que coordinan la actividad académica y gremial en cada
                macrozona.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-5 md:auto-rows-fr md:grid-cols-12">
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
                  className={`card-lift group border-ink-200 relative col-span-12 flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-7 md:p-8 ${layouts[idx]}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-50 text-brand-700 ring-brand-100 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1">
                        <MapPin size={22} aria-hidden />
                      </span>
                      <span className="font-display text-ink-400 text-xs tracking-[0.22em] uppercase tabular-nums">
                        Zona {f.zone} · {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-ink-900 mt-8 text-2xl leading-tight tracking-tight uppercase md:text-3xl">
                      {f.name}
                    </h3>
                    <p className="text-ink-600 mt-3 max-w-md text-sm leading-relaxed md:text-base">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {/* Presidente destacado */}
                    {president && (
                      <div className="border-ink-100 bg-paper rounded-2xl border p-4">
                        <p className="text-brand-700 text-[10px] font-semibold tracking-[0.22em] uppercase">
                          Presidente
                        </p>
                        <p className="text-ink-900 mt-2 font-semibold">{president.name}</p>
                        {president.email && (
                          <a
                            href={`mailto:${president.email}`}
                            className="text-ink-600 hover:text-brand-700 mt-1 inline-flex items-center gap-1.5 text-xs transition-colors"
                          >
                            <Mail size={12} aria-hidden />
                            {president.email}
                          </a>
                        )}
                      </div>
                    )}

                    {/* Comité expandible */}
                    {rest.length > 0 && (
                      <details className="group/details border-ink-100 rounded-2xl border">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm">
                          <span className="text-ink-800 inline-flex items-center gap-2 font-semibold">
                            Ver comité completo
                            <span className="text-ink-500 text-xs tabular-nums">
                              ({rest.length + 1})
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="border-ink-200 text-ink-600 inline-flex h-6 w-6 items-center justify-center rounded-full border transition-transform group-open/details:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <ul className="border-ink-100 border-t px-4 py-3 text-sm">
                          {rest.map((m) => (
                            <li
                              key={m.name}
                              className="border-ink-100 flex flex-col gap-0.5 border-b py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                            >
                              <div className="flex flex-col">
                                <span className="text-ink-900 font-medium">{m.name}</span>
                                <span className="text-ink-500 text-[11px] tracking-[0.16em] uppercase">
                                  {m.role}
                                </span>
                              </div>
                              {m.email && (
                                <a
                                  href={`mailto:${m.email}`}
                                  className="text-ink-600 hover:text-brand-700 text-xs break-all transition-colors"
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
                    <div className="border-ink-100 border-t pt-5">
                      <p className="text-ink-500 text-[10px] font-semibold tracking-[0.22em] uppercase">
                        Cobertura
                      </p>
                      <p className="text-ink-800 mt-2 text-sm font-medium">
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
          <div className="border-ink-200 relative overflow-hidden rounded-3xl border bg-white p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-200)_55%,_transparent)_0%,_transparent_70%)]"
            />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="text-brand-700 text-xs font-semibold tracking-[0.22em] uppercase">
                  Forma parte
                </p>
                <h2 className="font-display text-ink-900 mt-3 text-4xl leading-[0.95] tracking-tight uppercase md:text-5xl">
                  Súmate a la sociedad
                  <br />
                  <span className="text-ink-500">científica con más historia del país</span>
                </h2>
                <p className="text-ink-600 mt-5 max-w-xl">
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
