import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCLP, formatDateRange } from "@/lib/format";
import type { EventItem } from "@/lib/types";

interface EventCardProps {
  event: EventItem;
  variant?: "default" | "featured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isFeatured = variant === "featured";
  return (
    <Card
      className={`group relative flex h-full flex-col overflow-hidden hover:shadow-lift ${
        isFeatured ? "border-brand-200" : ""
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-600)_0%,_transparent_55%)]"
        />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="flex items-center gap-2">
            <Badge variant={event.category === "CONGRESO" ? "brand" : "dark"}>
              {event.category}
            </Badge>
            {isFeatured && <Badge variant="dark">Destacado</Badge>}
          </div>
        </div>
      </div>
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
            <CalendarDays size={16} className="text-brand-600" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} className="text-brand-600" />
            <span>{event.location}</span>
          </li>
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-semibold text-ink-900">
            {event.priceCLP === 0 ? "Sin costo" : formatCLP(event.priceCLP)}
          </span>
          <Button asChild size="sm" variant={isFeatured ? "primary" : "outline"}>
            <Link href={`/eventos/${event.slug}`}>Ver detalle</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
