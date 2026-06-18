import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Mail,
  Newspaper,
  Phone,
  Quote,
  Users,
} from "lucide-react";
import { AudienceSplit } from "@/components/public/AudienceSplit";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/public/EventCard";
import { FAQ } from "@/components/public/FAQ";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { MemberBenefits } from "@/components/public/MemberBenefits";
import { NewsCard } from "@/components/public/NewsCard";
import { Reveal } from "@/components/public/Reveal";
import { Section } from "@/components/public/Section";
import { SponsorsStrip } from "@/components/public/SponsorsStrip";
import { sponsorsAnuales } from "@/data/sponsors";
import { StatsStrip } from "@/components/public/StatsStrip";
import { Testimonials } from "@/components/public/Testimonials";
import { getFeaturedEvent, listEvents } from "@/server/queries/events";
import { listNews } from "@/server/queries/news";

// Render por request: la DB vive en el server, no en el CI que compila.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description:
    "SPROCh es la Sociedad de Prótesis y Rehabilitación Oral de Chile: sociedad científica fundada en 1952. Cursos, congresos, noticias y comunidad profesional en rehabilitación oral.",
  alternates: { canonical: "/" },
};

const valueProps = [
  {
    icon: GraduationCap,
    title: "Formación continua",
    description:
      "Cursos, talleres y congresos avalados por la sociedad para fortalecer la práctica clínica.",
  },
  {
    icon: Users,
    title: "Comunidad profesional",
    description:
      "Una red iberoamericana de especialistas, académicos y residentes en rehabilitación oral.",
  },
  {
    icon: Newspaper,
    title: "Conocimiento al día",
    description:
      "Noticias, lineamientos y publicaciones que reflejan el avance de la disciplina.",
  },
  {
    icon: BookOpen,
    title: "Investigación clínica",
    description:
      "Espacios para presentar trabajos libres, casos y revisión de literatura.",
  },
];

export default async function HomePage() {
  const [featured, upcoming, latestNews] = await Promise.all([
    getFeaturedEvent(),
    listEvents({ upcomingOnly: true, limit: 3 }),
    listNews({ limit: 3 }),
  ]);

  return (
    <>
      <HeroCarousel featured={featured} />

      <StatsStrip />

      {/* ────────────── POR QUÉ SPROCH — bento asimétrico ────────────── */}
      <Section className="bg-paper">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Por qué SPROCh
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Una sociedad
                <br />
                <span className="text-ink-500">con más de 74 años de historia</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                SPROCh es la Sociedad de Prótesis y Rehabilitación Oral de Chile. Acompañamos a la
                comunidad odontológica chilena e iberoamericana en su desarrollo clínico, académico
                y profesional. Cuatro razones explican por qué seguimos siendo la referencia.
              </p>
            </div>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-12 md:auto-rows-fr">
            {valueProps.map(({ icon: Icon, title, description }, idx) => {
              const layout = [
                "md:col-span-7", // formación — wide
                "md:col-span-5", // comunidad — narrow dark
                "md:col-span-5", // conocimiento — narrow dark
                "md:col-span-7", // investigación — wide
              ][idx];
              const dark = idx === 1 || idx === 2;
              return (
                <Reveal
                  as="li"
                  key={title}
                  delay={idx * 80}
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
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ────────────── DOS CAMINOS ────────────── */}
      <Section className="bg-ink-50">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Para ti
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Dos caminos,
                <br />
                <span className="text-ink-500">una misma sociedad</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Si eres profesional, súmate a la comunidad. Si eres paciente, infórmate antes
                de tu próximo tratamiento.
              </p>
            </div>
          </div>
        </div>
        <AudienceSplit />
      </Section>

      {/* ────────────── PRÓXIMOS EVENTOS ────────────── */}
      <Section className="bg-paper">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Agenda
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Próximos cursos
                <br />
                <span className="text-ink-500">y congresos</span>
              </h2>
            </div>
            <div className="flex md:col-span-4 md:justify-end md:pb-3">
              <Button asChild variant="outline">
                <Link href="/eventos">
                  Ver toda la agenda
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
              <p className="font-display text-2xl uppercase text-ink-900">
                Próximamente nuevas fechas
              </p>
              <p className="mt-3 text-ink-600">
                Estamos preparando la próxima tanda de cursos y congresos.
              </p>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, i) => (
                <Reveal as="li" key={event.id} delay={i * 90}>
                  <EventCard event={event} variant={event.featured ? "featured" : "default"} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* ────────────── MEMBRESÍA (dark) ────────────── */}
      <Section className="grain-overlay relative isolate overflow-hidden bg-brand-fade text-white">
        <div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-600/20 blur-3xl"
        />
        <MemberBenefits />
      </Section>

      {/* ────────────── TESTIMONIOS ────────────── */}
      <Section className="bg-ink-50">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                <Quote size={14} aria-hidden />
                Voces de la comunidad
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Lo que dicen
                <br />
                <span className="text-ink-500">nuestros socios</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-ink-600 md:text-lg">
                Especialistas, docentes y residentes que ya forman parte de SPROCh comparten su
                experiencia.
              </p>
            </div>
          </div>
        </div>
        <Testimonials />
      </Section>

      {/* ────────────── ÚLTIMAS NOTICIAS ────────────── */}
      <Section className="bg-paper">
        <div className="container-page">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                Noticias
              </p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-900 md:text-7xl">
                Lo último
                <br />
                <span className="text-ink-500">de la sociedad</span>
              </h2>
            </div>
            <div className="flex md:col-span-4 md:justify-end md:pb-3">
              <Button asChild variant="outline">
                <Link href="/noticias">
                  Ir a noticias
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((article, i) => (
              <Reveal as="li" key={article.id} delay={i * 90}>
                <NewsCard article={article} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ────────────── FAQ ────────────── */}
      <Section className="bg-ink-50">
        <FAQ />
      </Section>

      {/* ────────────── SPONSORS ANUALES ────────────── */}
      <Section className="bg-paper">
        <div className="container-page">
          <SponsorsStrip sponsors={sponsorsAnuales} title="Nos acompañan todo el año" />
        </div>
      </Section>

      {/* ────────────── CTA FINAL ────────────── */}
      <Section className="bg-paper">
        <div className="container-page">
          <div className="relative isolate grain-overlay overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white shadow-lift md:px-12 md:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_55%,_transparent)_0%,_transparent_70%)]"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 via-brand-600 to-brand-800"
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
                  <span aria-hidden className="h-px w-10 bg-brand-500" />
                  Conversemos
                </p>
                <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                  ¿Tienes una consulta
                  <br />
                  <span className="text-brand-600 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    o quieres colaborar?
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-base text-ink-200 md:text-lg">
                  Alianzas académicas, propuestas de cursos y consultas institucionales. Te
                  respondemos en menos de 48 horas hábiles.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="btn-glow w-full">
                    <Link href="/contacto">
                      Escríbenos ahora
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                  >
                    <Link href="/nosotros">
                      Conoce SPROCh
                      <ArrowUpRight size={16} aria-hidden />
                    </Link>
                  </Button>
                </div>
                <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6 text-sm text-ink-200">
                  <li>
                    <a
                      href="mailto:soc.protesis@gmail.com"
                      className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-500"
                    >
                      <Mail size={15} aria-hidden className="shrink-0 text-brand-600" />
                      <span className="break-all">soc.protesis@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+56223348332"
                      className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-500"
                    >
                      <Phone size={15} aria-hidden className="shrink-0 text-brand-600" />
                      <span>+56 2 2334 8332</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
