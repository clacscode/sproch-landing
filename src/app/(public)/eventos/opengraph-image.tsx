import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Cursos y Congresos — Agenda académica SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Agenda académica",
    title: "Cursos",
    highlight: "& congresos",
    subtitle:
      "Instancias formativas y científicas, presenciales y virtuales, organizadas por SPROCh.",
  });
}
