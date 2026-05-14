import { z } from "zod";

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
  subject: z
    .string({ required_error: "Ingresa un asunto" })
    .min(3, "Asunto muy corto")
    .max(160, "Máximo 160 caracteres"),
  message: z
    .string({ required_error: "Escribe tu mensaje" })
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
  /** Honeypot anti-spam: debe llegar vacío */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
