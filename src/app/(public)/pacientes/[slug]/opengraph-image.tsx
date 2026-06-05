import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { formatDate } from "@/lib/format";
import { getPatientBySlug } from "@/server/queries/patients";

export const runtime = "nodejs";
export const alt = "Pacientes — SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  slug: string;
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getPatientBySlug(slug);

  if (!article) {
    return renderOg({
      eyebrow: "Pacientes",
      title: "Tu salud",
      highlight: "bucal",
      subtitle: "Información para pacientes de SPROCh.",
    });
  }

  const eyebrow = article.tags[0]
    ? `Pacientes · ${article.tags[0]}`
    : "Pacientes · SPROCh";

  return renderOg({
    eyebrow,
    title: article.title,
    subtitle: article.excerpt,
    footerRight: `Publicado el ${formatDate(article.publishedAt)}`,
  });
}
