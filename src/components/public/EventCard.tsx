import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCLP, formatDateRange } from "@/lib/format";
import type { EventItem } from "@/lib/types";

interface EventCardProps {
  event: EventItem;
  variant?: "default" | "featured";
}

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function parseLocalDate(iso: string): Date {
  const parts = iso.split("-").map(Number);
  const y = parts[0] ?? new Date().getFullYear();
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isFeatured = variant === "featured";
  const startDate = parseLocalDate(event.startDate);

  return (
    <Card
      className={`group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
        isFeatured ? "ring-1 ring-brand-200" : ""
      }`}
    >
      <Link
        href={`/eventos/${event.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-ink-950"
        aria-label={event.title}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_60%),linear-gradient(140deg,#0c0c10_0%,#16161c_70%)] transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute -left-2 inset-y-0 w-3 bg-brand-600 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-10 [background-image:linear-gradient(60deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
                {event.category}
              </Badge>
              {isFeatured && <Badge variant="dark">Destacado</Badge>}
            </div>
            {/* Mini-calendario */}
            <div className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-center backdrop-blur-sm">
              <p className="font-display text-2xl leading-none text-white">
                {String(startDate.getDate()).padStart(2, "0")}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">
                {MONTHS[startDate.getMonth()]} {String(startDate.getFullYear()).slice(2)}
              </p>
            </div>
          </div>
          <span className="font-display text-3xl uppercase leading-none tracking-tight text-white/20 transition-colors group-hover:text-white/30">
            SPROCh
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Link
          href={`/eventos/${event.slug}`}
          className="text-xl font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700"
        >
          {event.title}
        </Link>
        <p className="line-clamp-3 text-sm text-ink-600">{event.summary}</p>
        <ul className="mt-1 space-y-2 text-sm text-ink-700">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-brand-600" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-brand-600" />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          {event.capacity ? (
            <li className="flex items-center gap-2">
              <Users size={16} className="shrink-0 text-brand-600" />
              <span>{event.capacity} cupos</span>
            </li>
          ) : null}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
              {event.priceCLP === 0 ? "Acceso" : "Inversión"}
            </p>
            <p className="font-display text-xl uppercase text-ink-900">
              {event.priceCLP === 0 ? "Sin costo" : formatCLP(event.priceCLP)}
            </p>
          </div>
          <Button asChild size="sm" variant={isFeatured ? "primary" : "outline"}>
            <Link href={`/eventos/${event.slug}`}>
              Ver detalle
              <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
