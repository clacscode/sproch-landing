import { Award, CalendarRange, GraduationCap, Globe2 } from "lucide-react";
import { StatCounter } from "@/components/public/StatCounter";
import { stats } from "@/data/membership";

const ICONS = [Award, Globe2, CalendarRange, GraduationCap];

export function StatsStrip() {
  return (
    <section
      id="main-stats"
      aria-label="Cifras de la sociedad"
      className="relative border-y border-ink-100 bg-white"
    >
      {/* Línea roja decorativa muy sutil arriba */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-600/50 to-transparent"
      />
      <ul className="container-page grid grid-cols-2 divide-ink-100 py-10 sm:py-12 md:grid-cols-4 md:divide-x">
        {stats.map((stat, i) => {
          const Icon = ICONS[i] ?? Award;
          return (
            <li
              key={stat.label}
              className="flex flex-col items-center gap-3 px-2 py-4 text-center md:items-start md:px-6 md:text-left"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <p className="font-display text-4xl leading-none text-ink-900 sm:text-5xl">
                  <span className="text-brand-600">
                    <StatCounter value={stat.value} />
                  </span>
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  {stat.label}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
