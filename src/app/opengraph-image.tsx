import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Sociedad de Prótesis y Rehabilitación Oral de Chile — Desde 1952";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "SPROCh · Desde 1952",
    title: "Avanzando la",
    highlight: "rehabilitación oral",
    subtitle:
      "Sociedad de Prótesis y Rehabilitación Oral de Chile. Cursos, congresos y formación continua.",
    footerRight: "Congreso SPROCh 2026 · Santiago",
  });
}
