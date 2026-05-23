import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";
import { formatDateRange } from "@/lib/format";
import { getEventBySlug } from "@/server/queries/events";

export const runtime = "nodejs";
export const alt = "Cursos y Congresos — SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface Params {
  slug: string;
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return renderOg({
      eyebrow: "Agenda académica",
      title: "Cursos",
      highlight: "& congresos",
      subtitle: "Instancias formativas y científicas organizadas por SPROCh.",
    });
  }

  return renderOg({
    eyebrow: event.category === "CONGRESO" ? "Congreso · SPROCh" : "Curso · SPROCh",
    title: event.title,
    subtitle: event.summary,
    footerRight: `${formatDateRange(event.startDate, event.endDate)} · ${event.location}`,
  });
}
