import "server-only";
import { eventsMock } from "@/data/events";
import type { EventCategory, EventItem } from "@/lib/types";

function published(e: EventItem) {
  return e.status === "PUBLISHED" || e.status === "FINISHED";
}

export async function listEvents(opts?: {
  category?: EventCategory;
  limit?: number;
  upcomingOnly?: boolean;
}): Promise<EventItem[]> {
  let items = eventsMock
    .filter(published)
    .slice()
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  if (opts?.category) items = items.filter((e) => e.category === opts.category);
  if (opts?.upcomingOnly) {
    const today = new Date().toISOString().slice(0, 10);
    items = items.filter((e) => e.endDate >= today);
  }
  if (opts?.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return eventsMock.find((e) => e.slug === slug && published(e)) ?? null;
}

export async function getFeaturedEvent(): Promise<EventItem | null> {
  return eventsMock.find((e) => e.featured && published(e)) ?? null;
}
