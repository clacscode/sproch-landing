import "server-only";
import { prisma } from "@/lib/prisma";
import type { EventCategory, EventItem } from "@/lib/types";
import { mapEvent } from "@/server/queries/mappers";

// En el sitio público se consideran "visibles" los eventos publicados y los ya finalizados.
const VISIBLE_STATUS = ["PUBLISHED", "FINISHED"] as const;

export async function listEvents(opts?: {
  category?: EventCategory;
  limit?: number;
  upcomingOnly?: boolean;
  /** Sólo eventos ya terminados (endDate anterior a hoy), del más reciente al más antiguo. */
  pastOnly?: boolean;
}): Promise<EventItem[]> {
  const today = new Date(new Date().toISOString().slice(0, 10));
  const rows = await prisma.event.findMany({
    where: {
      status: { in: [...VISIBLE_STATUS] },
      archivedAt: null,
      ...(opts?.category ? { category: opts.category } : {}),
      ...(opts?.upcomingOnly ? { endDate: { gte: today } } : {}),
      ...(opts?.pastOnly ? { endDate: { lt: today } } : {}),
    },
    orderBy: { startDate: opts?.pastOnly ? "desc" : "asc" },
    ...(opts?.limit ? { take: opts.limit } : {}),
  });
  return rows.map(mapEvent);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const row = await prisma.event.findFirst({
    where: { slug, status: { in: [...VISIBLE_STATUS] }, archivedAt: null },
  });
  return row ? mapEvent(row) : null;
}

export async function getFeaturedEvent(): Promise<EventItem | null> {
  const row = await prisma.event.findFirst({
    where: { featured: true, status: { in: [...VISIBLE_STATUS] }, archivedAt: null },
    orderBy: { startDate: "asc" },
  });
  return row ? mapEvent(row) : null;
}
