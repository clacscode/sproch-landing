import type { BoardMember } from "@/lib/types";

export const boardMock: BoardMember[] = [
  { name: "Dra. María Elena Soto", role: "Presidenta" },
  { name: "Dr. Joaquín Pérez Carrasco", role: "Vicepresidente" },
  { name: "Dra. Carolina Reyes Vidal", role: "Secretaria General" },
  { name: "Dr. Felipe Núñez Toro", role: "Tesorero" },
  { name: "Dra. Andrea Castro Mella", role: "Directora Académica" },
  { name: "Dr. Sebastián Morales Pinto", role: "Director de Comunicaciones" },
];

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
