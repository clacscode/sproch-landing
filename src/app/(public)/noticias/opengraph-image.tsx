import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Noticias — Comunicados y novedades SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Noticias · Comunicados oficiales",
    title: "La sociedad",
    highlight: "al día",
    subtitle:
      "Comunicados, novedades académicas y publicaciones científicas de la actividad SPROCh.",
  });
}
