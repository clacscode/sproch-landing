import Image from "next/image";
import type { EventSponsor } from "@/lib/types";

interface SponsorsStripProps {
  sponsors: EventSponsor[];
  title?: string;
  /**
   * - "grid": tarjetas grandes en grid estática. Para 6-12 patrocinadores
   *   donde cada marca debe verse con presencia.
   * - "marquee": loop animado horizontal. Para listas largas (15+) o cuando
   *   se busca un ritmo más editorial-rotativo.
   */
  variant?: "grid" | "marquee";
}

export function SponsorsStrip({
  sponsors,
  title = "Auspiciadores",
  variant = "grid",
}: SponsorsStripProps) {
  if (!sponsors.length) return null;

  if (variant === "marquee") {
    return <Marquee sponsors={sponsors} title={title} />;
  }

  return <Grid sponsors={sponsors} title={title} />;
}

function Grid({ sponsors, title }: { sponsors: EventSponsor[]; title: string }) {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink-500">
        <span aria-hidden className="h-px w-10 bg-brand-500" />
        {title}
        <span aria-hidden className="h-px w-10 bg-brand-500" />
      </div>

      <ul
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6"
        role="list"
        aria-label={title}
      >
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.name}
            className="flex items-center justify-center rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift sm:p-7"
          >
            <SponsorItem sponsor={sponsor} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Marquee({ sponsors, title }: { sponsors: EventSponsor[]; title: string }) {
  const loop = [...sponsors, ...sponsors];
  const duration = Math.max(28, sponsors.length * 4);

  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-ink-500">
        {title}
      </p>
      <div
        className="marquee mt-10"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
        aria-label={title}
      >
        <ul className="marquee-track gap-14 sm:gap-20" role="list">
          {loop.map((sponsor, i) => (
            <li
              key={`${sponsor.name}-${i}`}
              aria-hidden={i >= sponsors.length || undefined}
              className="flex h-28 shrink-0 items-center justify-center sm:h-32"
            >
              <SponsorItem sponsor={sponsor} large />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SponsorItem({ sponsor, large = false }: { sponsor: EventSponsor; large?: boolean }) {
  const sizeClass = large
    ? "h-24 w-auto max-w-[260px] sm:h-28 sm:max-w-[280px]"
    : "h-28 w-auto max-w-full sm:h-32 lg:h-36";

  const content = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={320}
      height={160}
      className={`${sizeClass} object-contain transition-transform duration-300 group-hover:scale-105`}
    />
  ) : (
    <span
      className={`whitespace-nowrap font-display ${
        large ? "text-2xl" : "text-3xl"
      } font-semibold tracking-tight text-ink-700 transition-colors duration-300 group-hover:text-brand-700`}
    >
      {sponsor.name}
    </span>
  );

  const cls =
    "group inline-flex items-center justify-center transition-opacity duration-300";

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${sponsor.name} (se abre en nueva ventana)`}
        className={`${cls} hover:opacity-100`}
      >
        {content}
      </a>
    );
  }

  return <div className={cls}>{content}</div>;
}
