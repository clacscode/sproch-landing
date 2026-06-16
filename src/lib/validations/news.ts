import { z } from "zod";

/** Documento TipTap (JSON). Validación laxa: un objeto-nodo (compatible con JSONContent). */
export const richTextSchema = z
  .object({ type: z.string().optional() })
  .passthrough();

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida")
  .optional()
  .or(z.literal(""));

const optionalImage = z
  .string()
  .max(500)
  .optional()
  .or(z.literal(""));

export const ARTICLE_TYPES = ["NEWS", "PATIENT"] as const;

export const articleSchema = z.object({
  type: z.enum(ARTICLE_TYPES),
  title: z
    .string({ required_error: "Ingresa un título" })
    .min(3, "Título muy corto")
    .max(180, "Máximo 180 caracteres"),
  // Vacío => se autogenera desde el título en el servidor.
  slug: z
    .string()
    .max(80)
    .regex(/^[a-z0-9-]*$/, "Solo minúsculas, números y guiones")
    .optional()
    .or(z.literal("")),
  excerpt: z
    .string({ required_error: "Ingresa un resumen" })
    .min(10, "Resumen muy corto")
    .max(300, "Máximo 300 caracteres"),
  content: richTextSchema,
  coverImage: optionalImage,
  status: z.enum(["DRAFT", "PUBLISHED"]),
  publishedAt: dateString,
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  authorName: z.string().max(160).optional().or(z.literal("")),
});

export type ArticleInput = z.infer<typeof articleSchema>;
