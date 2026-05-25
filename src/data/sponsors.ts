export interface Sponsor {
  /** Nombre visible del sponsor. */
  name: string;
  /** Ruta del logo (preferentemente PNG con fondo transparente). */
  logo?: string;
  /** URL del sitio oficial (opcional). */
  url?: string;
  /** Tier comercial cuando aplica. */
  tier?: "platinum" | "gold" | "silver" | "bronze";
}

/**
 * Auspiciadores anuales SPROCh — programa que acompaña la operación de la
 * sociedad y los cursos a lo largo del año.
 * Logos entregados por el cliente en /public/sponsors/.
 */
export const sponsorsAnuales: Sponsor[] = [
  { name: "Dentaid", logo: "/sponsors/6.png" },
  { name: "Corega", logo: "/sponsors/1.png" },
  { name: "Kerr", logo: "/sponsors/2.png" },
  { name: "Nobel Biocare", logo: "/sponsors/3.png" },
  { name: "AlphaBio", logo: "/sponsors/4.png" },
  { name: "Dexis", logo: "/sponsors/5.png" },
];

/**
 * Auspiciadores del Congreso SPROCh 2026.
 * El listado original incluía Envista dos veces; lo dejamos consolidado.
 */
export const sponsorsCongreso: Sponsor[] = [
  { name: "Haleon" },
  { name: "Solara" },
  { name: "Laboratorios Dentaid" },
  { name: "Punto Dental Ortotek" },
  { name: "Envista" },
  { name: "Hiossen Chile" },
  { name: "Solventum" },
  { name: "FGM y SP Dental" },
  { name: "3Dental" },
  { name: "Megagen Chile" },
  { name: "MBM Business Group SpA" },
];
