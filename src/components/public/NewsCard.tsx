import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { NewsArticle } from "@/lib/types";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden hover:shadow-lift">
      <div className="aspect-[16/10] w-full overflow-hidden bg-ink-100">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-50 to-ink-100">
          <span className="font-display text-3xl tracking-wider text-brand-700/40">SPROCh</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {article.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
          <span className="ml-auto text-xs text-ink-500">{formatDate(article.publishedAt)}</span>
        </div>
        <Link
          href={`/noticias/${article.slug}`}
          className="text-lg font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700 md:text-xl"
        >
          {article.title}
        </Link>
        <p className={variant === "featured" ? "text-base text-ink-600" : "line-clamp-3 text-sm text-ink-600"}>
          {article.excerpt}
        </p>
        <div className="mt-auto pt-2">
          <Link
            href={`/noticias/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Leer noticia
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
