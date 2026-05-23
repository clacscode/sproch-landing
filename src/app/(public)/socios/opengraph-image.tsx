import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Hazte socio — Suma tu trayectoria a SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Hazte socio",
    title: "Suma tu",
    highlight: "trayectoria",
    subtitle:
      "Beneficios concretos, formación continua y red iberoamericana de especialistas en prótesis y rehabilitación oral.",
  });
}
