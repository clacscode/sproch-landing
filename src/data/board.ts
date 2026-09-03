import type { BoardMember } from "@/lib/types";

/**
 * Directorio nacional SPROCh con sede en Santiago.
 * Período actualizado al 2026.
 *
 * `photo` es opcional: si está, la página de Nosotros muestra el retrato; si no,
 * cae al avatar con iniciales. Los archivos viven en `public/team/` (retratos
 * cuadrados, ~720px, entregados por el cliente).
 */
export const directorioSantiago: BoardMember[] = [
  {
    name: "Dr. Roque Cona Trujillo",
    photo: "/team/cona.jpg",
    role: "Presidente",
    email: "roquejct@gmail.com",
  },
  {
    name: "Dr. Héctor González Bustamante",
    photo: "/team/gonzalez.jpg",
    role: "Vicepresidente",
    email: "hgonzalez@hgdental.cl",
  },
  {
    name: "Dr. Jorge Biotti Picand",
    photo: "/team/biotti.jpg",
    role: "Secretario",
    email: "jbiotti@gmail.com",
  },
  {
    name: "Dr. Alfredo Zunino Belmar",
    photo: "/team/zunino.jpg",
    role: "Tesorero",
    email: "alfredo.zunino@gmail.com",
  },
  {
    name: "Dr. Mario Barbano Maturana",
    photo: "/team/barbano.jpg",
    role: "Director",
    email: "mbarbano@gmail.com",
  },
  {
    name: "Dr. Roberto Santana Leiva",
    photo: "/team/santana.jpg",
    role: "Director",
    email: "roansale@gmail.com",
  },
  {
    name: "Dr. Carlos Parra Atala",
    photo: "/team/parra.jpg",
    role: "Director",
    email: "carlos.parra.atala@gmail.com",
  },
  {
    name: "Dra. Marcela Hormazábal",
    photo: "/team/hormazabal.jpg",
    role: "Directora",
    email: "marcehormazabal@gmail.com",
  },
  {
    name: "Dr. Eugenio Nieto Grez",
    photo: "/team/nieto.jpg",
    role: "Director",
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
    year: "1980",
    title: "Expansión académica",
    description:
      "Se consolidan los primeros programas de formación continua en prótesis y rehabilitación oral.",
  },
  {
    year: "2000",
    title: "Integración latinoamericana",
    description:
      "Vinculación activa con sociedades científicas hermanas de Iberoamérica y participación en redes regionales.",
  },
  {
    year: "2020",
    title: "Transformación digital",
    description:
      "Adopción de flujos digitales, escaneo intraoral, CAD/CAM e inteligencia artificial aplicada a rehabilitación.",
  },
];
