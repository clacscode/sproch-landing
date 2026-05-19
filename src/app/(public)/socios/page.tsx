import type { Metadata } from "next";
import { BookOpenCheck, GraduationCap, Library, Medal, Network, Ticket } from "lucide-react";
import { MembershipForm } from "@/components/public/MembershipForm";
import { Section, SectionHeader } from "@/components/public/Section";

export const metadata: Metadata = {
  title: "Hazte socio",
  description:
    "Súmate a la Sociedad de Prótesis y Rehabilitación Oral de Chile. Beneficios, formación continua, red iberoamericana y certificación.",
};

const benefits = [
  { icon: Ticket, label: "Tarifas preferentes en cursos y congresos" },
  { icon: Library, label: "Acceso a publicaciones y revistas científicas" },
  { icon: GraduationCap, label: "Programa anual de formación continua" },
  { icon: Network, label: "Red iberoamericana de sociedades hermanas" },
  { icon: BookOpenCheck, label: "Espacios para presentar trabajos libres" },
  { icon: Medal, label: "Certificación con aval institucional" },
];

export default function SociosPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-mesh text-white">
        <div className="brand-bars" aria-hidden />
        <div className="hero-rays" aria-hidden />
        <div className="container-page relative py-14 md:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-400">
            Hazte socio
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
            Suma tu trayectoria a la
            <span className="block text-brand-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              red científica más antigua del país
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ink-100 md:text-lg">
            Beneficios concretos para tu práctica clínica, acceso a formación continua y a una
            comunidad iberoamericana de especialistas, docentes y residentes.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHeader
              eyebrow="Solicitud"
              title="Únete a SPROCh"
              description="Completa el formulario y te contactaremos en menos de 48 horas hábiles con los próximos pasos."
            />
            <div className="mt-8">
              <MembershipForm />
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
                <h2 className="font-display text-xl uppercase text-ink-900">Qué obtienes</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {benefits.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                        <Icon size={16} aria-hidden />
                      </span>
                      <span className="text-ink-700">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-ink-950 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
                  ¿Tienes dudas?
                </p>
                <p className="mt-3 text-sm text-ink-200">
                  Escríbenos a{" "}
                  <a
                    href="mailto:soc.protesis@gmail.com"
                    className="font-medium text-white underline-offset-2 hover:underline"
                  >
                    soc.protesis@gmail.com
                  </a>{" "}
                  o llámanos al{" "}
                  <a
                    href="tel:+56223348332"
                    className="font-medium text-white underline-offset-2 hover:underline"
                  >
                    +56 2 2334 8332
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
