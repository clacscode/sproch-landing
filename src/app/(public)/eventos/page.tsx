import type { Metadata } from "next";
import { EventsTabs } from "@/components/public/EventsTabs";
import { Section } from "@/components/public/Section";
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

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-fade text-white">
        <div className="container-page pb-16 pt-24 md:pb-20 md:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            Agenda académica
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Cursos y congresos
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Instancias formativas y científicas presenciales y virtuales para
            especialistas, residentes y estudiantes.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page">
          <EventsTabs todos={todos} cursos={cursos} congresos={congresos} />
        </div>
      </Section>
    </>
  );
}
