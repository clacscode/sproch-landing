import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { formatDate } from "@/lib/format";
import { getNewsBySlug } from "@/server/queries/news";

export const runtime = "nodejs";
export const alt = "Noticias — SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  slug: string;
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return renderOg({
      eyebrow: "Noticias",
      title: "La sociedad",
      highlight: "al día",
      subtitle: "Comunicados y novedades de SPROCh.",
    });
  }

  const eyebrow = article.tags[0]
    ? `Noticias · ${article.tags[0]}`
    : "Noticias · SPROCh";

  return renderOg({
    eyebrow,
    title: article.title,
    subtitle: article.excerpt,
    footerRight: `Publicado el ${formatDate(article.publishedAt)}`,
  });
}
