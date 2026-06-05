import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Pacientes — Información SPROCh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Pacientes · Información para ti",
    title: "Tu salud",
    highlight: "bucal",
    subtitle:
      "Orientación sobre prótesis y rehabilitación oral: tratamientos, consultas y cuidados.",
  });
}
