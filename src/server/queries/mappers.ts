import "server-only";
import type { Event as PrismaEvent, News as PrismaNews } from "@prisma/client";
import type { EventItem, EventSpeaker, EventSponsor, NewsArticle } from "@/lib/types";
import { richTextToHtml } from "@/lib/tiptap-server";

/** Fallback de portada cuando un registro no tiene imagen (preserva el look actual). */
const FALLBACK_COVER = "/brand/logo.png";

/** DateTime de Prisma → "YYYY-MM-DD" (las fechas se guardan a medianoche UTC). */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function mapNews(row: PrismaNews): NewsArticle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: richTextToHtml(row.content),
    coverImage: row.coverImage ?? FALLBACK_COVER,
    status: row.status,
    publishedAt: row.publishedAt ? toISODate(row.publishedAt) : "",
    tags: (row.tags as string[] | null) ?? [],
    authorName: row.authorName ?? undefined,
  };
}

type EventProgram = NonNullable<EventItem["program"]>;

export function mapEvent(row: PrismaEvent): EventItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    content: richTextToHtml(row.content),
    startDate: toISODate(row.startDate),
    endDate: toISODate(row.endDate),
    location: row.location,
    coverImage: row.coverImage ?? FALLBACK_COVER,
    capacity: row.capacity ?? undefined,
    priceCLP: row.priceCLP,
    priceFrom: row.priceFrom,
    hidePrice: row.hidePrice,
    registrationUrl: row.registrationUrl ?? undefined,
    aboutEyebrow: row.aboutEyebrow ?? undefined,
    aboutTitle: row.aboutTitle ?? undefined,
    category: row.category,
    status: row.status,
    featured: row.featured,
    speakers: (row.speakers as unknown as EventSpeaker[]) ?? [],
    sponsors: (row.sponsors as unknown as EventSponsor[]) ?? [],
    program: (row.program as unknown as EventProgram) ?? [],
  };
}
