import Image from "next/image";
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
  /** Evento ya finalizado: se marca como tal y no se muestra el valor de inscripción. */
  past?: boolean;
}

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function parseLocalDate(iso: string): Date {
  const parts = iso.split("-").map(Number);
  const y = parts[0] ?? new Date().getFullYear();
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}

export function EventCard({ event, variant = "default", past = false }: EventCardProps) {
  const isFeatured = variant === "featured";
  // El mapper rellena coverImage con /brand/logo.png cuando no hay afiche;
  // ese fallback no debe usarse como fondo de la tarjeta.
  const hasAfiche = Boolean(event.coverImage) && !event.coverImage.startsWith("/brand/");
  const startDate = parseLocalDate(event.startDate);
  const day = String(startDate.getDate()).padStart(2, "0");
  const month = MONTHS[startDate.getMonth()];
  const year = String(startDate.getFullYear()).slice(2);

  return (
    <Card
      className={`group card-lift relative flex h-full flex-col overflow-hidden ${
        isFeatured ? "ring-brand-200 ring-1" : ""
      }`}
    >
      <Link
        href={`/eventos/${event.slug}`}
        className="bg-ink-950 relative block aspect-[16/10] w-full overflow-hidden"
        aria-label={event.title}
      >
        {/* Base background — afiche si existe; si no, composición de marca */}
        {hasAfiche ? (
          <>
            <Image
              src={event.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Oscurece el afiche para que fecha y badges sigan legibles */}
            <div
              aria-hidden
              className="from-ink-950/90 via-ink-950/40 to-ink-950/25 absolute inset-0 bg-gradient-to-t"
            />
          </>
        ) : (
          <div
            aria-hidden
            className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${
              isFeatured
                ? "bg-brand-mesh"
                : "bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-700)_0%,_transparent_60%),linear-gradient(140deg,#0c0c10_0%,#16161c_70%)]"
            }`}
          />
        )}

        {/* Brand bars sólo en featured sin afiche (acento de identidad) */}
        {isFeatured && !hasAfiche && (
          <>
            <div aria-hidden className="brand-bars" />
            <div aria-hidden className="hero-rays opacity-60" />
          </>
        )}

        {/* Diagonal accent */}
        <div
          aria-hidden
          className="bg-brand-600 absolute inset-y-0 -left-2 w-3 [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)]"
        />

        {!hasAfiche && (
          <>
            {/* Patrón de puntos */}
            <div
              aria-hidden
              className="absolute inset-0 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px] opacity-[0.08]"
            />

            {/* Glow inferior izquierdo para resaltar la fecha */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-700)_55%,_transparent)_0%,_transparent_70%)] opacity-80"
            />
          </>
        )}

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Top row: badges + categoría */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
                {event.category}
              </Badge>
              {past ? (
                <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                  Finalizado
                </Badge>
              ) : (
                isFeatured && (
                  <Badge variant="dark" className="bg-white/15 text-white backdrop-blur">
                    Destacado
                  </Badge>
                )
              )}
            </div>
            {/* SPROCH watermark top-right (sutil) */}
            <span
              aria-hidden
              className="font-display text-base leading-none tracking-[0.18em] text-white/30 uppercase transition-colors group-hover:text-white/45"
            >
              SPROCh
            </span>
          </div>

          {/* Bottom row: fecha gigante editorial */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[88px] leading-[0.85] tracking-tight text-white uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
                {day}
              </p>
              <p className="text-brand-500 mt-2 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] uppercase">
                <span aria-hidden className="bg-brand-600 h-px w-6" />
                {month} · 20{year}
              </p>
            </div>
            <span
              aria-hidden
              className="pb-1 text-[10px] font-semibold tracking-[0.2em] text-white/55 uppercase"
            >
              {event.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Link
          href={`/eventos/${event.slug}`}
          className="font-display text-ink-900 group-hover:text-brand-700 text-xl leading-tight tracking-tight uppercase transition-colors md:text-2xl"
        >
          {event.title}
        </Link>
        <p className="text-ink-600 line-clamp-3 text-sm">{event.summary}</p>
        <ul className="text-ink-700 mt-1 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="text-brand-600 shrink-0" aria-hidden />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} className="text-brand-600 shrink-0" aria-hidden />
            <span className="line-clamp-1">{event.location}</span>
          </li>
          {event.capacity ? (
            <li className="flex items-center gap-2">
              <Users size={16} className="text-brand-600 shrink-0" aria-hidden />
              <span>{event.capacity} cupos</span>
            </li>
          ) : null}
        </ul>
        <div className="border-ink-100 mt-auto flex items-center justify-between gap-3 border-t pt-4">
          {event.hidePrice || past ? (
            <span aria-hidden />
          ) : (
            <div>
              <p className="text-ink-500 text-[10px] font-semibold tracking-[0.18em] uppercase">
                {event.priceCLP === 0 ? "Acceso" : "Inversión"}
              </p>
              <p className="font-display text-ink-900 text-xl tracking-tight uppercase">
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
