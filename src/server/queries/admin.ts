import "server-only";
import type { ArticleType, Event, News } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** Listado de artículos para el panel (incluye borradores). */
export async function adminListArticles(type: ArticleType): Promise<News[]> {
  return prisma.news.findMany({
    where: { type },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function adminGetArticle(id: string): Promise<News | null> {
  return prisma.news.findUnique({ where: { id } });
}

/** Listado de eventos para el panel (incluye borradores y cancelados). */
export async function adminListEvents(): Promise<Event[]> {
  return prisma.event.findMany({ orderBy: { startDate: "desc" } });
}

export async function adminGetEvent(id: string): Promise<Event | null> {
  return prisma.event.findUnique({ where: { id } });
}

/** Conteos para el dashboard. */
export async function adminCounts() {
  const [newsTotal, newsPublished, patientsTotal, patientsPublished, eventsTotal, eventsPublished] =
    await Promise.all([
      prisma.news.count({ where: { type: "NEWS" } }),
      prisma.news.count({ where: { type: "NEWS", status: "PUBLISHED" } }),
      prisma.news.count({ where: { type: "PATIENT" } }),
      prisma.news.count({ where: { type: "PATIENT", status: "PUBLISHED" } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: "PUBLISHED" } }),
    ]);
  return {
    news: { total: newsTotal, published: newsPublished },
    patients: { total: patientsTotal, published: patientsPublished },
    events: { total: eventsTotal, published: eventsPublished },
  };
}
