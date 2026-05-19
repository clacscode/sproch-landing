import Link from "next/link";
import { ArrowRight, HeartPulse, Stethoscope } from "lucide-react";

const cards = [
  {
    icon: Stethoscope,
    eyebrow: "Profesionales",
    title: "Comunidad clínica y académica",
    description:
      "Cursos, congresos, trabajos libres y publicaciones para fortalecer tu práctica especializada.",
    bullets: [
      "Tarifas preferentes para socios al día",
      "Aval institucional en formación continua",
      "Red iberoamericana de sociedades hermanas",
    ],
    cta: { label: "Explorar agenda", href: "/eventos" },
    tone: "dark" as const,
  },
  {
    icon: HeartPulse,
    eyebrow: "Pacientes",
    title: "Información confiable",
    description:
      "Conoce qué es la rehabilitación oral y por qué elegir profesionales con formación continua y respaldo gremial.",
    bullets: [
      "Especialistas con foco en evidencia",
      "Actualización clínica permanente",
      "Sociedad con más de 70 años de historia",
    ],
    cta: { label: "Conocer SPROCh", href: "/nosotros" },
    tone: "light" as const,
  },
];

export function AudienceSplit() {
  return (
    <ul className="container-page mt-12 grid gap-6 md:grid-cols-2">
      {cards.map(({ icon: Icon, eyebrow, title, description, bullets, cta, tone }) => {
        const isDark = tone === "dark";
        return (
          <li
            key={eyebrow}
            className={
              isDark
                ? "relative isolate overflow-hidden rounded-2xl bg-ink-950 p-8 text-white md:p-10"
                : "relative isolate overflow-hidden rounded-2xl border border-ink-100 bg-white p-8 text-ink-900 md:p-10"
            }
          >
            {isDark && (
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"
              />
            )}
            <span
              className={
                isDark
                  ? "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-brand-400"
                  : "inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-700"
              }
            >
              <Icon size={22} />
            </span>
            <p
              className={
                "mt-6 text-xs font-semibold uppercase tracking-[0.18em] " +
                (isDark ? "text-brand-400" : "text-brand-700")
              }
            >
              {eyebrow}
            </p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-tight md:text-4xl">
              {title}
            </h3>
            <p className={"mt-4 text-base " + (isDark ? "text-ink-200" : "text-ink-600")}>
              {description}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className={
                      "mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full " +
                      (isDark ? "bg-brand-500" : "bg-brand-600")
                    }
                  />
                  <span className={isDark ? "text-ink-100" : "text-ink-700"}>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={cta.href}
              className={
                "mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors " +
                (isDark ? "text-white hover:text-brand-400" : "text-brand-700 hover:text-brand-800")
              }
            >
              {cta.label}
              <ArrowRight size={16} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
