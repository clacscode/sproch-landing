import { z } from "zod";
import { richTextSchema } from "@/lib/validations/news";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida");

const optionalString = (max: number) =>
  z.string().max(max).optional().or(z.literal(""));

export const speakerSchema = z.object({
  name: z.string().min(1, "Nombre requerido").max(160),
  country: optionalString(80),
  bio: optionalString(600),
  avatar: optionalString(500),
});

export const SPONSOR_TIERS = ["platinum", "gold", "silver", "bronze"] as const;

export const sponsorSchema = z.object({
  name: z.string().min(1, "Nombre requerido").max(160),
  logo: optionalString(500),
  url: optionalString(500),
  tier: z.enum(SPONSOR_TIERS).optional().or(z.literal("")),
});

export const programItemSchema = z.object({
  time: z.string().max(40).default(""),
  title: z.string().min(1, "Describe la actividad").max(240),
});

export const programDaySchema = z.object({
  day: z.string().min(1, "Indica el día").max(120),
  items: z.array(programItemSchema).default([]),
});

export const EVENT_CATEGORIES = ["CURSO", "CONGRESO"] as const;
export const EVENT_STATUSES = ["DRAFT", "PUBLISHED", "CANCELLED", "FINISHED"] as const;

export const eventSchema = z
  .object({
    title: z
      .string({ required_error: "Ingresa un título" })
      .min(3, "Título muy corto")
      .max(200, "Máximo 200 caracteres"),
    slug: z
      .string()
      .max(80)
      .regex(/^[a-z0-9-]*$/, "Solo minúsculas, números y guiones")
      .optional()
      .or(z.literal("")),
    summary: z
      .string({ required_error: "Ingresa un resumen" })
      .min(10, "Resumen muy corto")
      .max(400, "Máximo 400 caracteres"),
    content: richTextSchema,
    startDate: dateString,
    endDate: dateString,
    location: z
      .string({ required_error: "Indica el lugar" })
      .min(2, "Lugar muy corto")
      .max(200),
    coverImage: optionalString(500),
    capacity: z.number().int().positive().max(100000).nullable().optional(),
    priceCLP: z.number().int().min(0, "No puede ser negativo").max(100000000).default(0),
    priceFrom: z.boolean().default(false),
    hidePrice: z.boolean().default(false),
    registrationUrl: z
      .string()
      .url("URL inválida")
      .max(500)
      .optional()
      .or(z.literal("")),
    featured: z.boolean().default(false),
    category: z.enum(EVENT_CATEGORIES),
    status: z.enum(EVENT_STATUSES),
    speakers: z.array(speakerSchema).max(100).default([]),
    sponsors: z.array(sponsorSchema).max(100).default([]),
    program: z.array(programDaySchema).max(30).default([]),
  })
  .refine((v) => v.endDate >= v.startDate, {
    message: "La fecha de término no puede ser anterior al inicio",
    path: ["endDate"],
  });

export type EventInput = z.infer<typeof eventSchema>;
