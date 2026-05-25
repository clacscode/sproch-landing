import type { BoardMember } from "@/lib/types";

/**
 * Directorio nacional SPROCh con sede en Santiago.
 * Período actualizado al 2026.
 */
export const directorioSantiago: BoardMember[] = [
  {
    name: "Dr. Roque Cona Trujillo",
    role: "Presidente",
    email: "roquejct@gmail.com",
  },
  {
    name: "Dr. Héctor González Bustamante",
    role: "Vicepresidente",
    email: "hgonzalez@hgdental.cl",
  },
  {
    name: "Dr. Jorge Biotti Picand",
    role: "Secretario",
    email: "jbiotti@gmail.com",
  },
  {
    name: "Dr. Alfredo Zunino Belmar",
    role: "Tesorero",
    email: "alfredo.zunino@gmail.com",
  },
  {
    name: "Dr. Mario Barbano Maturana",
    role: "Director",
    email: "mbarbano@gmail.com",
  },
  {
    name: "Dr. Roberto Santana Leiva",
    role: "Director",
    email: "roansale@gmail.com",
  },
  {
    name: "Dr. Carlos Parra Atala",
    role: "Director",
    email: "carlos.parra.atala@gmail.com",
  },
  {
    name: "Dra. Paulina Barrientos Ramwell",
    role: "Directora",
    email: "pbarrientosr@gmail.com",
  },
  {
    name: "Dra. Marcela Hormazábal",
    role: "Directora",
    email: "marcehormazabal@gmail.com",
  },
  {
    name: "Dr. Eugenio Nieto Grez",
    role: "Past President",
    email: "eugenio.nieto@gmail.com",
  },
  {
    name: "Margarita Castro",
    role: "Secretaría",
    email: "soc.protesis@gmail.com",
  },
];

/** Alias de retro-compatibilidad mientras quedan referencias antiguas. */
export const boardMock = directorioSantiago;

export const milestones = [
  {
    year: "1952",
    title: "Fundación de la Sociedad",
    description:
      "Un grupo de odontólogos pioneros funda la Sociedad de Prótesis y Rehabilitación Oral de Chile.",
  },
  {
    year: "1980s",
    title: "Expansión académica",
    description:
      "Se consolidan los primeros programas de formación continua en prótesis y rehabilitación oral.",
  },
  {
    year: "2000s",
    title: "Integración latinoamericana",
    description:
      "Vinculación activa con sociedades científicas hermanas de Iberoamérica y participación en redes regionales.",
  },
  {
    year: "2020s",
    title: "Transformación digital",
    description:
      "Adopción de flujos digitales, escaneo intraoral, CAD/CAM e inteligencia artificial aplicada a rehabilitación.",
  },
];
