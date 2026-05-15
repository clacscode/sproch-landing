import { stats } from "@/data/membership";

export function StatsStrip() {
  return (
    <section aria-label="Cifras de la sociedad" className="border-y border-ink-100 bg-white">
      <ul className="container-page grid grid-cols-2 gap-y-8 py-10 sm:py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="font-display text-4xl leading-none text-brand-700 sm:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-500">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
