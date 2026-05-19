import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Mail, Newspaper, Phone, Users } from "lucide-react";
import { AudienceSplit } from "@/components/public/AudienceSplit";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/public/EventCard";
import { FAQ } from "@/components/public/FAQ";
import { HeroCarousel } from "@/components/public/HeroCarousel";
import { MemberBenefits } from "@/components/public/MemberBenefits";
import { NewsCard } from "@/components/public/NewsCard";
import { Reveal } from "@/components/public/Reveal";
import { Section, SectionHeader } from "@/components/public/Section";
import { SponsorsStrip } from "@/components/public/SponsorsStrip";
import { StatsStrip } from "@/components/public/StatsStrip";
import { Testimonials } from "@/components/public/Testimonials";
import { getFeaturedEvent, listEvents } from "@/server/queries/events";
import { listNews } from "@/server/queries/news";

export const revalidate = 60;

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

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Por qué SPROCh"
            title="Una sociedad científica con más de 70 años de tradición"
            description="Acompañamos a la comunidad odontológica chilena e iberoamericana en su desarrollo clínico, académico y profesional."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map(({ icon: Icon, title, description }, idx) => (
              <Reveal
                as="li"
                key={title}
                delay={idx * 80}
                className="group relative overflow-hidden rounded-xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <span
                  aria-hidden
                  className="absolute right-4 top-3 font-display text-3xl text-ink-100 transition-colors group-hover:text-brand-100"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-ink-50">
        <SectionHeader
          eyebrow="Para ti"
          title="Dos caminos, una misma sociedad"
          description="Si eres profesional, súmate a la comunidad. Si eres paciente, infórmate antes de tu próximo tratamiento."
          align="center"
        />
        <AudienceSplit />
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Agenda"
              title="Próximos cursos y congresos"
              description="Reserva tu lugar en las próximas instancias formativas y científicas organizadas por SPROCh."
            />
            <Button asChild variant="outline">
              <Link href="/eventos">
                Ver todos los eventos
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-12 text-ink-500">Pronto anunciaremos nuevas fechas.</p>
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

      <Section className="relative isolate overflow-hidden bg-brand-fade text-white">
        <div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-600/20 blur-3xl"
        />
        <MemberBenefits />
      </Section>

      <Section className="bg-ink-50">
        <SectionHeader
          eyebrow="Voces de la comunidad"
          title="Lo que dicen nuestros socios"
          description="Especialistas, docentes y residentes que ya forman parte de SPROCh."
          align="center"
        />
        <Testimonials />
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Noticias"
              title="Lo último de la sociedad"
              description="Comunicados, novedades académicas y publicaciones del comité directivo."
            />
            <Button asChild variant="outline">
              <Link href="/noticias">
                Ir a noticias
                <ArrowRight size={16} />
              </Link>
            </Button>
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

      <Section className="bg-ink-50">
        <FAQ />
      </Section>

      {featured?.sponsors?.length ? (
        <Section className="bg-white">
          <div className="container-page">
            <SponsorsStrip sponsors={featured.sponsors} title="Auspiciadores Congreso 2026" />
          </div>
        </Section>
      ) : null}

      <Section className="bg-white">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-2xl bg-brand-mesh px-5 py-10 text-white shadow-lift sm:rounded-3xl sm:px-8 md:px-12 md:py-14">
            <div
              aria-hidden
              className="absolute -right-32 -top-24 h-72 w-72 rounded-full bg-brand-600/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 via-brand-600 to-brand-800"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-400">
                  Conversemos
                </p>
                <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] md:text-4xl lg:text-5xl">
                  ¿Tienes una consulta o quieres
                  <span className="block text-brand-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">colaborar con la sociedad?</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-ink-200">
                  Alianzas académicas, propuestas de cursos y consultas institucionales. Te
                  respondemos en menos de 48 horas hábiles.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                  <Button asChild size="lg" className="btn-glow w-full sm:flex-1 lg:flex-none lg:w-full">
                    <Link href="/contacto">Escríbenos</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full border-white/25 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 sm:flex-1 lg:flex-none lg:w-full"
                  >
                    <Link href="/nosotros">Conoce SPROCh</Link>
                  </Button>
                </div>
                <div className="mt-5 flex flex-col gap-2 text-sm">
                  <a
                    href="mailto:soc.protesis@gmail.com"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-400"
                  >
                    <Mail size={16} aria-hidden className="shrink-0 text-brand-400" />
                    <span className="break-all">soc.protesis@gmail.com</span>
                  </a>
                  <a
                    href="tel:+56223348332"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-brand-400"
                  >
                    <Phone size={16} aria-hidden className="shrink-0 text-brand-400" />
                    <span>+56 2 2334 8332</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
