import type { NewsArticle } from "@/lib/types";

export const newsMock: NewsArticle[] = [
  {
    id: "n1",
    slug: "congreso-sproch-2026-abre-inscripciones",
    title: "Congreso SPROCh 2026 abre inscripciones tempranas",
    excerpt:
      "Del 30 de julio al 1 de agosto en el Hotel Marina Las Condes, Santiago. Programa internacional con expositores de Brasil y España.",
    content: `
<p>La Sociedad de Prótesis y Rehabilitación Oral de Chile invita a la comunidad odontológica iberoamericana a participar del <strong>Congreso SPROCh 2026 — ADA: De lo análogo y digital a la AI</strong>, que se realizará entre el 30 de julio y el 1 de agosto en el Hotel Marina Las Condes, Santiago.</p>
<p>La instancia contará con expositores internacionales como el Dr. Alessandro Loguercio (Brasil), Dr. Bruno Kraft (Brasil), Dr. Óscar González (España), entre otros.</p>
<p>Las inscripciones tempranas estarán disponibles próximamente con descuentos para socios y estudiantes de postgrado.</p>
    `.trim(),
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-04-12",
    tags: ["congreso", "2026", "santiago"],
    authorName: "Comité Directivo SPROCh",
  },
  {
    id: "n2",
    slug: "nuevas-tendencias-en-rehabilitacion-oral-digital",
    title: "Nuevas tendencias en rehabilitación oral digital",
    excerpt:
      "Flujos CAD/CAM, escaneo intraoral e inteligencia artificial: cómo la práctica clínica está cambiando en Latinoamérica.",
    content:
      "<p>Los flujos digitales han redefinido la planificación y ejecución de tratamientos rehabilitadores. Esta nota recorre los avances más relevantes del último año.</p>",
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-03-28",
    tags: ["digital", "cad-cam", "AI"],
  },
  {
    id: "n3",
    slug: "convocatoria-trabajos-libres-sproch-2026",
    title: "Convocatoria a trabajos libres SPROCh 2026",
    excerpt:
      "Investigadores y residentes pueden enviar sus trabajos hasta el 30 de mayo. Categorías: casos clínicos, investigación y revisión.",
    content:
      "<p>Se abre la convocatoria para envío de trabajos libres para el Congreso 2026. Las bases completas estarán disponibles en este sitio en los próximos días.</p>",
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-03-10",
    tags: ["investigación", "convocatoria"],
  },
  {
    id: "n4",
    slug: "convenio-formativo-con-universidades-asociadas",
    title: "Nuevo convenio formativo con universidades asociadas",
    excerpt:
      "SPROCh firma un convenio multianual para fortalecer la formación de pre y postgrado en rehabilitación oral.",
    content:
      "<p>El convenio contempla becas, cursos conjuntos y movilidad académica para estudiantes y docentes.</p>",
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-02-22",
    tags: ["academia", "convenios"],
  },
];
