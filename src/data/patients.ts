import type { NewsArticle } from "@/lib/types";

/**
 * Contenido de "Pacientes" — mismo sistema de publicación que Noticias:
 * para publicar/editar, modificar este arreglo (igual que `src/data/news.ts`).
 * Las entradas actuales son PLACEHOLDER y deben reemplazarse por el contenido real.
 */
export const patientsMock: NewsArticle[] = [
  {
    id: "p1",
    slug: "que-es-la-rehabilitacion-oral",
    title: "¿Qué es la rehabilitación oral?",
    excerpt:
      "Devolver función, salud y estética a tu boca: en qué consiste la rehabilitación oral y cuándo la necesitas.",
    content: `
<p>La rehabilitación oral es el área de la odontología que se ocupa de devolver la función, la salud y la estética a la boca cuando se han perdido dientes o se han dañado por caries, fracturas o desgaste.</p>
<p>A través de tratamientos como coronas, puentes, prótesis e implantes, el especialista en rehabilitación oral te ayuda a recuperar la capacidad de masticar, hablar y sonreír con confianza.</p>
<p>Si tienes dudas sobre tu caso, lo recomendable es consultar con un profesional que evalúe tu situación de forma personalizada.</p>
    `.trim(),
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-05-20",
    tags: ["información", "tratamientos"],
    authorName: "Equipo SPROCh",
  },
  {
    id: "p2",
    slug: "como-prepararte-para-tu-primera-consulta",
    title: "Cómo prepararte para tu primera consulta",
    excerpt:
      "Qué llevar, qué preguntar y qué esperar de tu primera visita con un especialista en rehabilitación oral.",
    content: `
<p>Llegar preparado a tu primera consulta ayuda a que el profesional entienda mejor tu caso y a que aproveches al máximo el tiempo de la cita.</p>
<p>Lleva tus exámenes o radiografías previas si los tienes, una lista de los medicamentos que tomas y anota las preguntas que quieras hacer. No olvides comentar tus antecedentes de salud general.</p>
<p>Durante la evaluación, el especialista revisará tu boca, conversará contigo sobre tus expectativas y te explicará las alternativas de tratamiento disponibles.</p>
    `.trim(),
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-05-08",
    tags: ["información", "consulta"],
    authorName: "Equipo SPROCh",
  },
  {
    id: "p3",
    slug: "cuidados-despues-de-una-protesis",
    title: "Cuidados después de una prótesis dental",
    excerpt:
      "Higiene, hábitos y controles: recomendaciones para cuidar tu prótesis y mantener tu salud bucal.",
    content: `
<p>Una prótesis bien cuidada dura más tiempo y protege la salud de tus encías y dientes remanentes.</p>
<p>Mantén una buena higiene diaria, sigue las indicaciones de limpieza que te entregue tu profesional y asiste a tus controles periódicos. Evita alimentos muy duros o pegajosos durante los primeros días de adaptación.</p>
<p>Ante cualquier molestia, roce o cambio en el ajuste, consulta con tu especialista en lugar de hacer ajustes por tu cuenta.</p>
    `.trim(),
    coverImage: "/brand/logo.png",
    status: "PUBLISHED",
    publishedAt: "2026-04-25",
    tags: ["cuidados", "prótesis"],
    authorName: "Equipo SPROCh",
  },
];
