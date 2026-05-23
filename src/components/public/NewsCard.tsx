import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate, formatShortDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured";
}

const DEFAULT_ACCENT = "from-brand-700 to-ink-900";
const accentForTag: Record<string, string> = {
  congreso: "from-brand-700 to-brand-900",
  digital: "from-ink-800 to-brand-800",
  academia: "from-brand-600 to-brand-800",
  investigación: "from-ink-900 to-brand-700",
  convenios: "from-brand-700 to-ink-900",
  "cad-cam": "from-ink-800 to-ink-900",
};

function getAccent(tag?: string): string {
  if (!tag) return DEFAULT_ACCENT;
  return accentForTag[tag.toLowerCase()] ?? DEFAULT_ACCENT;
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const primaryTag = article.tags[0];
  const accent = getAccent(primaryTag);
  const initial = article.title.trim().charAt(0).toUpperCase();

  return (
    <Card className="group card-lift flex h-full flex-col overflow-hidden">
      <Link
        href={`/noticias/${article.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden"
        aria-label={article.title}
      >
        {/* Base gradient por tag */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent} transition-transform duration-700 group-hover:scale-110`}
        />

        {/* Patrón de puntos */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]"
        />

        {/* Inicial gigante decorativa */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-6 select-none font-display text-[260px] uppercase leading-none tracking-tighter text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.12]"
        >
          {initial}
        </span>

        {/* Velo radial inferior */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,_var(--color-brand-500)_45%,_transparent)_0%,_transparent_70%)] opacity-50"
        />

        {/* Línea diagonal decorativa */}
        <div
          aria-hidden
          className="absolute -bottom-20 -right-8 h-44 w-44 rotate-12 bg-white/5"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          {/* Top: tags + fecha corta */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="dark"
                  className="bg-white/15 text-white backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
              {formatShortDate(article.publishedAt)}
            </span>
          </div>

          {/* Bottom: SPROCh wordmark + flecha */}
          <div className="flex items-end justify-between">
            <span className="font-display text-3xl uppercase leading-none tracking-tight text-white/20 transition-colors group-hover:text-white/35 md:text-4xl">
              SPROCh
            </span>
            <ArrowUpRight
              size={22}
              aria-hidden
              className="text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            />
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <CalendarDays size={14} className="text-brand-600" aria-hidden />
          {formatDate(article.publishedAt)}
        </p>
        <Link
          href={`/noticias/${article.slug}`}
          className="font-display text-lg uppercase leading-tight tracking-tight text-ink-900 transition-colors group-hover:text-brand-700 md:text-xl"
        >
          {article.title}
        </Link>
        <p
          className={
            variant === "featured" ? "text-base text-ink-600" : "line-clamp-3 text-sm text-ink-600"
          }
        >
          {article.excerpt}
        </p>
        <div className="mt-auto pt-2">
          <Link
            href={`/noticias/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand-700 transition-all group-hover:gap-2.5 group-hover:text-brand-800"
          >
            Leer noticia
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
