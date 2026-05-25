import Image from "next/image";
import type { EventSponsor } from "@/lib/types";

interface SponsorsStripProps {
  sponsors: EventSponsor[];
  title?: string;
}

export function SponsorsStrip({ sponsors, title = "Auspiciadores" }: SponsorsStripProps) {
  if (!sponsors.length) return null;

  // Duplicamos la lista para que el loop sea visualmente continuo.
  const loop = [...sponsors, ...sponsors];
  // Ajustamos velocidad según cantidad: ~3.5s por logo, mínimo 24s.
  const duration = Math.max(24, sponsors.length * 3.5);

  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
        {title}
      </p>
      <div
        className="marquee mt-8"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        aria-label={title}
      >
        <ul className="marquee-track gap-12 sm:gap-16" role="list">
          {loop.map((sponsor, i) => (
            <li
              key={`${sponsor.name}-${i}`}
              aria-hidden={i >= sponsors.length || undefined}
              className="flex h-24 shrink-0 items-center justify-center sm:h-28"
            >
              {sponsor.logo ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={240}
                  height={96}
                  className="h-20 w-auto max-w-[200px] object-contain transition-transform duration-300 hover:scale-105 sm:h-24 sm:max-w-[220px]"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink-700 transition-colors duration-300 hover:text-ink-900 sm:text-2xl">
                  {sponsor.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
