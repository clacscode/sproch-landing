import type { Event as PrismaEvent, News as PrismaNews } from "@prisma/client";
import type { JSONContent } from "@tiptap/core";
import type { ArticleFormValues } from "@/components/admin/ArticleForm";
import type { EventFormValues } from "@/components/admin/EventForm";
import { EMPTY_DOC } from "@/lib/tiptap";

function isoDate(date: Date | null): string {
  return date ? date.toISOString().slice(0, 10) : "";
}

export function articleToFormValues(row: PrismaNews): ArticleFormValues {
  return {
    type: row.type,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: (row.content as JSONContent) ?? EMPTY_DOC,
    coverImage: row.coverImage ?? "",
    status: row.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    publishedAt: isoDate(row.publishedAt),
    tags: (row.tags as string[] | null) ?? [],
    authorName: row.authorName ?? "",
  };
}

type RawSpeaker = { name?: string; country?: string; bio?: string; avatar?: string };
type RawSponsor = { name?: string; logo?: string; url?: string; tier?: string };
type RawProgramDay = { day?: string; items?: { time?: string; title?: string }[] };

export function eventToFormValues(row: PrismaEvent): EventFormValues {
  const speakers = (row.speakers as RawSpeaker[] | null) ?? [];
  const sponsors = (row.sponsors as RawSponsor[] | null) ?? [];
  const program = (row.program as RawProgramDay[] | null) ?? [];

  return {
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    content: (row.content as JSONContent) ?? EMPTY_DOC,
    startDate: isoDate(row.startDate),
    endDate: isoDate(row.endDate),
    location: row.location,
    coverImage: row.coverImage ?? "",
    capacity: row.capacity ?? null,
    priceCLP: row.priceCLP,
    priceFrom: row.priceFrom,
    hidePrice: row.hidePrice,
    registrationUrl: row.registrationUrl ?? "",
    featured: row.featured,
    aboutEyebrow: row.aboutEyebrow ?? "",
    aboutTitle: row.aboutTitle ?? "",
    category: row.category,
    status: row.status,
    speakers: speakers.map((s) => ({
      name: s.name ?? "",
      country: s.country ?? "",
      bio: s.bio ?? "",
      avatar: s.avatar ?? "",
    })),
    sponsors: sponsors.map((s) => ({
      name: s.name ?? "",
      logo: s.logo ?? "",
      url: s.url ?? "",
      tier: (s.tier ?? "") as EventFormValues["sponsors"][number]["tier"],
    })),
    program: program.map((d) => ({
      day: d.day ?? "",
      items: (d.items ?? []).map((it) => ({ time: it.time ?? "", title: it.title ?? "" })),
    })),
  };
}
