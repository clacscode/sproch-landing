import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Newspaper, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/public/EventCard";
import { Hero } from "@/components/public/Hero";
import { NewsCard } from "@/components/public/NewsCard";
import { Section, SectionHeader } from "@/components/public/Section";
import { SponsorsStrip } from "@/components/public/SponsorsStrip";
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
      <Hero featured={featured} />

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Por qué SPROCh"
            title="Una sociedad científica con más de 70 años de tradición"
            description="Acompañamos a la comunidad odontológica chilena e iberoamericana en su desarrollo clínico, académico y profesional."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-ink-50">
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
              {upcoming.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} variant={event.featured ? "featured" : "default"} />
                </li>
              ))}
            </ul>
          )}
        </div>
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
            {latestNews.map((article) => (
              <li key={article.id}>
                <NewsCard article={article} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {featured?.sponsors?.length ? (
        <Section className="bg-ink-50">
          <div className="container-page">
            <SponsorsStrip sponsors={featured.sponsors} title="Auspiciadores Congreso 2026" />
          </div>
        </Section>
      ) : null}

      <Section className="bg-ink-950 text-white">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl uppercase leading-tight md:text-5xl">
              ¿Tienes una consulta o quieres colaborar con la sociedad?
            </h2>
            <p className="mt-4 max-w-lg text-ink-200">
              Estamos abiertos a alianzas académicas, propuestas de cursos y consultas
              institucionales. Escríbenos y te responderemos en menos de 48 horas hábiles.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button asChild size="lg">
              <Link href="/contacto">Escríbenos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Link href="/nosotros">Conoce más</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
