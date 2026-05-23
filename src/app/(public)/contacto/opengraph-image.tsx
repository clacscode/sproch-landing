import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "edge";
export const alt = "Contacto — Conversemos sobre rehabilitación oral";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    eyebrow: "Contacto",
    title: "Conversemos.",
    subtitle:
      "Consultas institucionales, alianzas académicas, prensa y postulaciones. Respondemos en menos de 48 horas hábiles.",
  });
}
