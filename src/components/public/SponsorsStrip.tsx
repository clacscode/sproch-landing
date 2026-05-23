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
        <ul className="marquee-track gap-10 sm:gap-14" role="list">
          {loop.map((sponsor, i) => (
            <li
              key={`${sponsor.name}-${i}`}
              aria-hidden={i >= sponsors.length || undefined}
              className="flex h-16 shrink-0 items-center justify-center"
            >
              {sponsor.logo ? (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={160}
                  height={64}
                  className="h-12 w-auto max-w-[160px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-ink-500 transition-colors duration-300 hover:text-ink-900 sm:text-xl">
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
