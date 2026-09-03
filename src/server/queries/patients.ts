import "server-only";
import { prisma } from "@/lib/prisma";
import type { NewsArticle } from "@/lib/types";
import { mapNews } from "@/server/queries/mappers";

export async function listPatients(opts?: {
  tag?: string;
  q?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  const rows = await prisma.news.findMany({
    where: { type: "PATIENT", status: "PUBLISHED", archivedAt: null },
    orderBy: { publishedAt: "desc" },
  });
  let items = rows.map(mapNews);
  if (opts?.tag) items = items.filter((p) => p.tags.includes(opts.tag!));
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    items = items.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
    );
  }
  if (opts?.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getPatientBySlug(slug: string): Promise<NewsArticle | null> {
  const row = await prisma.news.findFirst({
    where: { slug, type: "PATIENT", status: "PUBLISHED", archivedAt: null },
  });
  return row ? mapNews(row) : null;
}

export async function listAllPatientTags(): Promise<string[]> {
  const rows = await prisma.news.findMany({
    where: { type: "PATIENT", status: "PUBLISHED", archivedAt: null },
    select: { tags: true },
  });
  return Array.from(new Set(rows.flatMap((r) => (r.tags as string[] | null) ?? []))).sort();
}
