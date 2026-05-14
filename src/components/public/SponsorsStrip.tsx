import type { EventSponsor } from "@/lib/types";

interface SponsorsStripProps {
  sponsors: EventSponsor[];
  title?: string;
}

export function SponsorsStrip({ sponsors, title = "Auspiciadores" }: SponsorsStripProps) {
  if (!sponsors.length) return null;
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
        {title}
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.name}
            className="flex h-16 items-center justify-center rounded-md border border-ink-100 bg-white px-4 text-sm font-medium text-ink-600 transition-colors hover:border-brand-200 hover:text-ink-900"
          >
            {sponsor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
