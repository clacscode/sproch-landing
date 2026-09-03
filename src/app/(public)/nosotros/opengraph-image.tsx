import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Nosotros — SPROCh, 74 años rehabilitando";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Quiénes somos · Desde 1952",
    title: "Setenta años",
    highlight: "rehabilitando",
    subtitle:
      "Especialistas y académicos comprometidos con la formación continua y la investigación clínica en Chile e Iberoamérica.",
  });
}
