import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
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

  return (
    <Card className="group card-lift flex h-full flex-col overflow-hidden">
      <Link
        href={`/noticias/${article.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden"
        aria-label={article.title}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent} transition-transform duration-700 group-hover:scale-110`}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-12 -right-8 h-40 w-40 rotate-12 bg-white/5"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
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
          <span className="font-display text-5xl uppercase leading-none tracking-tight text-white/15 transition-colors group-hover:text-white/25">
            SPROCh
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <CalendarDays size={14} className="text-brand-600" />
          {formatDate(article.publishedAt)}
        </p>
        <Link
          href={`/noticias/${article.slug}`}
          className="text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 md:text-xl"
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-all hover:gap-2 hover:text-brand-800"
          >
            Leer noticia
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
