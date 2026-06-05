import "server-only";
import { patientsMock } from "@/data/patients";
import type { NewsArticle } from "@/lib/types";

function published(p: NewsArticle) {
  return p.status === "PUBLISHED";
}

export async function listPatients(opts?: {
  tag?: string;
  q?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  let items = patientsMock
    .filter(published)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
  return patientsMock.find((p) => p.slug === slug && published(p)) ?? null;
}

export async function listAllPatientTags(): Promise<string[]> {
  return Array.from(new Set(patientsMock.flatMap((p) => p.tags))).sort();
}
