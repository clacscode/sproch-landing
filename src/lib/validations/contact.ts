import { z } from "zod";

export const INQUIRY_TYPES = [
  "general",
  "membresia",
  "cursos",
  "prensa",
  "alianzas",
  "otro",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  general: "Consulta general",
  membresia: "Información de membresía",
  cursos: "Cursos y congresos",
  prensa: "Prensa y comunicaciones",
  alianzas: "Alianzas académicas",
  otro: "Otro",
};

export const MESSAGE_MAX = 2000;
export const SUBJECT_MAX = 160;

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Ingresa tu nombre" })
    .min(2, "Ingresa al menos 2 caracteres")
    .max(120, "Máximo 120 caracteres"),
  email: z
    .string({ required_error: "Ingresa tu correo" })
    .email("Correo electrónico no válido"),
  phone: z
    .string()
    .max(40, "Teléfono demasiado largo")
    .optional()
    .or(z.literal("")),
  inquiryType: z
    .enum(INQUIRY_TYPES)
    .optional()
    .or(z.literal("")),
  subject: z
    .string({ required_error: "Ingresa un asunto" })
    .min(3, "Asunto muy corto")
    .max(SUBJECT_MAX, `Máximo ${SUBJECT_MAX} caracteres`),
  message: z
    .string({ required_error: "Escribe tu mensaje" })
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(MESSAGE_MAX, `Máximo ${MESSAGE_MAX} caracteres`),
  /** Honeypot anti-spam: debe llegar vacío */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
