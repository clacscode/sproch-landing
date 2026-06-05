import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateRange, formatEventPrice } from "@/lib/format";
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
  const day = String(startDate.getDate()).padStart(2, "0");
  const month = MONTHS[startDate.getMonth()];
  const year = String(startDate.getFullYear()).slice(2);

  return (
    <Card
      className={`group card-lift relative flex h-full flex-col overflow-hidden ${
        isFeatured ? "ring-1 ring-brand-200" : ""
      }`}
    >
      <Link
        href={`/eventos/${event.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-ink-950"
        aria-label={event.title}
      >
        {/* Base background — distinto para featured vs default */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${
            isFeatured
              ? "bg-brand-mesh"
              : "bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_60%),linear-gradient(140deg,#0c0c10_0%,#16161c_70%)]"
          }`}
        />

        {/* Brand bars sólo en featured (acento de identidad) */}
        {isFeatured && (
          <>
            <div aria-hidden className="brand-bars" />
            <div aria-hidden className="hero-rays opacity-60" />
          </>
        )}

        {/* Diagonal accent */}
        <div
          aria-hidden
          className="absolute -left-2 inset-y-0 w-3 bg-brand-600 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)]"
        />

        {/* Patrón de puntos */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]"
        />

        {/* Glow inferior izquierdo para resaltar la fecha */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_55%,_transparent)_0%,_transparent_70%)] opacity-80"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Top row: badges + categoría */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
                {event.category}
              </Badge>
              {isFeatured && (
                <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                  Destacado
                </Badge>
              )}
            </div>
            {/* SPROCH watermark top-right (sutil) */}
            <span
              aria-hidden
              className="font-display text-base uppercase leading-none tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/45"
            >
              SPROCh
            </span>
          </div>

          {/* Bottom row: fecha gigante editorial */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[88px] uppercase leading-[0.85] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                {day}
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-500">
                <span aria-hidden className="h-px w-6 bg-brand-600" />
                {month} · 20{year}
              </p>
            </div>
            <span
              aria-hidden
              className="pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55"
            >
              {event.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Link
          href={`/eventos/${event.slug}`}
          className="font-display text-xl uppercase leading-tight tracking-tight text-ink-900 transition-colors group-hover:text-brand-700 md:text-2xl"
        >
          {event.title}
        </Link>
        <p className="line-clamp-3 text-sm text-ink-600">{event.summary}</p>
        <ul className="mt-1 space-y-2 text-sm text-ink-700">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-brand-600" aria-hidden />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-brand-600" aria-hidden />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          {event.capacity ? (
            <li className="flex items-center gap-2">
              <Users size={16} className="shrink-0 text-brand-600" aria-hidden />
              <span>{event.capacity} cupos</span>
            </li>
          ) : null}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          {event.hidePrice ? (
            <span aria-hidden />
          ) : (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {event.priceCLP === 0 ? "Acceso" : "Inversión"}
              </p>
              <p className="font-display text-xl uppercase tracking-tight text-ink-900">
                {formatEventPrice(event.priceCLP, { from: event.priceFrom })}
              </p>
            </div>
          )}
          <Button asChild size="sm" variant={isFeatured ? "primary" : "outline"}>
            <Link href={`/eventos/${event.slug}`}>
              Ver detalle
              <ArrowRight size={14} aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
