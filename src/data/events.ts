import type { EventItem } from "@/lib/types";

export const eventsMock: EventItem[] = [
  {
    id: "e1",
    slug: "congreso-sproch-2026",
    title: "Congreso SPROCh 2026 — ADA: De lo análogo y digital a la AI",
    summary:
      "Tres días con expositores internacionales en Santiago. De lo análogo y digital a la inteligencia artificial.",
    content: `
<p>El congreso anual de SPROCh reúne a la comunidad iberoamericana en torno a la prótesis y rehabilitación oral. La edición 2026 propone un recorrido desde lo análogo y digital hacia la inteligencia artificial aplicada a la práctica clínica.</p>
<p>Tres días de conferencias, talleres y networking en el Hotel Marina Las Condes, Santiago.</p>
    `.trim(),
    startDate: "2026-07-30",
    endDate: "2026-08-01",
    location: "Hotel Marina Las Condes, Santiago",
    coverImage: "/brand/logo.png",
    capacity: 600,
    priceCLP: 380000,
    category: "CONGRESO",
    status: "PUBLISHED",
    featured: true,
    speakers: [
      { name: "Dr. Alessandro Loguercio", country: "Brasil" },
      { name: "Dr. Bruno Kraft", country: "Brasil" },
      { name: "Dr. Óscar González", country: "España" },
      { name: "Dr. Antonio Aguilar-Salvatierra Raya", country: "España" },
      { name: "Dra. Isabel Domene Rodríguez", country: "España" },
      { name: "Dra. Isabel Godoy Reina", country: "España" },
      { name: "Dr. Rafael Gómez Font", country: "España" },
      { name: "Dr. Nuno Matos Garrido", country: "España" },
      { name: "Dr. Gerardo Moreu Burgos", country: "España" },
      { name: "Dr. Ignacio Osoitz Leizaola-Cardesa", country: "España" },
      { name: "Dr. Paulino Sánchez Palomino", country: "España" },
      { name: "Dr. Eugenio Velasco Ortega", country: "España" },
    ],
    sponsors: [
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
    ],
    program: [
      {
        day: "Jueves 30 de julio",
        items: [
          { time: "09:00", title: "Acreditación y bienvenida" },
          { time: "10:00", title: "Conferencia inaugural" },
          { time: "12:30", title: "Almuerzo con auspiciadores" },
          { time: "14:30", title: "Bloque clínico digital" },
          { time: "18:30", title: "Cóctel de bienvenida" },
        ],
      },
      {
        day: "Viernes 31 de julio",
        items: [
          { time: "09:00", title: "Bloque rehabilitación implanto-soportada" },
          { time: "12:00", title: "Mesas de discusión" },
          { time: "14:30", title: "Talleres prácticos" },
        ],
      },
      {
        day: "Sábado 1 de agosto",
        items: [
          { time: "09:00", title: "Bloque inteligencia artificial en odontología" },
          { time: "12:00", title: "Cierre y entrega de certificados" },
        ],
      },
    ],
  },
  {
    id: "e2",
    slug: "curso-rehabilitacion-sobre-implantes-2026",
    title: "Curso: Rehabilitación sobre implantes — flujos digitales",
    summary:
      "Curso de actualización de dos días dirigido a especialistas y residentes en rehabilitación oral.",
    content:
      "<p>Curso intensivo orientado a clínicos que quieran integrar flujos digitales en rehabilitación implanto-soportada. Incluye casos clínicos y prácticas.</p>",
    startDate: "2026-09-12",
    endDate: "2026-09-13",
    location: "Sede SPROCh, Santiago",
    coverImage: "/brand/logo.png",
    capacity: 40,
    priceCLP: 280000,
    category: "CURSO",
    status: "PUBLISHED",
  },
  {
    id: "e3",
    slug: "taller-oclusion-y-articuladores",
    title: "Taller: Oclusión y articuladores",
    summary:
      "Taller hands-on de un día sobre fundamentos de oclusión, articuladores y planificación protésica.",
    content:
      "<p>Taller práctico para especialistas y residentes. Incluye materiales y certificación.</p>",
    startDate: "2026-06-21",
    endDate: "2026-06-21",
    location: "Sede SPROCh, Santiago",
    coverImage: "/brand/logo.png",
    capacity: 25,
    priceCLP: 120000,
    category: "CURSO",
    status: "PUBLISHED",
  },
];
