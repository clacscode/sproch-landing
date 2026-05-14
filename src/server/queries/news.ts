import "server-only";
import { newsMock } from "@/data/news";
import type { NewsArticle } from "@/lib/types";

function published(n: NewsArticle) {
  return n.status === "PUBLISHED";
}

export async function listNews(opts?: {
  tag?: string;
  q?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  let items = newsMock.filter(published).slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
  return newsMock.find((n) => n.slug === slug && published(n)) ?? null;
}

export async function listAllTags(): Promise<string[]> {
  return Array.from(new Set(newsMock.flatMap((n) => n.tags))).sort();
}
