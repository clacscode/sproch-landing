export interface Sponsor {
  /** Nombre visible del sponsor. */
  name: string;
  /** URL del sitio oficial (opcional). */
  url?: string;
  /** Tier comercial cuando aplica. */
  tier?: "platinum" | "gold" | "silver" | "bronze";
}

/**
 * Auspiciadores anuales SPROCh — programa que acompaña la operación de la
 * sociedad y los cursos a lo largo del año.
 */
export const sponsorsAnuales: Sponsor[] = [
  { name: "Dentaid" },
  { name: "Envista — 4 Lodos" },
  { name: "Haleon — Corega" },
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
