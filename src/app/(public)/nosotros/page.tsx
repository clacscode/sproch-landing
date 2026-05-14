import type { Metadata } from "next";
import { Award, Compass, HeartHandshake, Lightbulb } from "lucide-react";
import { Section, SectionHeader } from "@/components/public/Section";
import { boardMock, milestones } from "@/data/board";

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

export default function NosotrosPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div className="brand-bars" aria-hidden />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              Quiénes somos
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight md:text-7xl">
              Más de 70 años al servicio de la rehabilitación oral en Chile
            </h1>
            <p className="mt-6 max-w-2xl text-base text-ink-200 md:text-lg">
              Desde 1952, la Sociedad de Prótesis y Rehabilitación Oral de Chile (SPROCh) reúne
              a especialistas y académicos comprometidos con la formación continua, la
              investigación clínica y la innovación en la disciplina.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Principios"
            title="Lo que nos mueve"
            description="Cuatro principios guían nuestra labor científica, académica y gremial."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, description }) => (
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
          <SectionHeader
            eyebrow="Historia"
            title="Hitos de la sociedad"
            description="Una trayectoria de aprendizaje, transformación y aporte a la odontología iberoamericana."
          />
          <ol className="relative mt-12 grid gap-8 md:grid-cols-2">
            {milestones.map((milestone, idx) => (
              <li
                key={milestone.year}
                className="relative rounded-xl border border-ink-100 bg-white p-6 shadow-card"
              >
                <span
                  className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-full bg-brand-600 px-3 text-xs font-semibold text-white"
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-3xl text-brand-700">{milestone.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink-900">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader
            eyebrow="Directorio"
            title="Comité directivo"
            description="El equipo que lidera las actividades académicas, científicas y gremiales de SPROCh."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMock.map((member) => (
              <li
                key={member.name}
                className="flex items-center gap-4 rounded-xl border border-ink-100 bg-white p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 font-display text-brand-700">
                  {member.name
                    .split(" ")
                    .filter((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p))
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-ink-900">{member.name}</p>
                  <p className="text-sm text-ink-600">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
