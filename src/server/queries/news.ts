import "server-only";
import { prisma } from "@/lib/prisma";
import type { NewsArticle } from "@/lib/types";
import { mapNews } from "@/server/queries/mappers";

export async function listNews(opts?: {
  tag?: string;
  q?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  const rows = await prisma.news.findMany({
    where: { type: "NEWS", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
  // Las etiquetas son JSON y la búsqueda es case-insensitive: se filtra en memoria
  // (dataset pequeño) para máxima portabilidad con MySQL/MariaDB.
  let items = rows.map(mapNews);
  if (opts?.tag) items = items.filter((n) => n.tags.includes(opts.tag!));
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    items = items.filter(
      (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q),
    );
  }
  if (opts?.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const row = await prisma.news.findFirst({
    where: { slug, type: "NEWS", status: "PUBLISHED" },
  });
  return row ? mapNews(row) : null;
}

export async function listAllTags(): Promise<string[]> {
  const rows = await prisma.news.findMany({
    where: { type: "NEWS", status: "PUBLISHED" },
    select: { tags: true },
  });
  return Array.from(
    new Set(rows.flatMap((r) => (r.tags as string[] | null) ?? [])),
  ).sort();
}
