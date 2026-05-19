import { z } from "zod";

export const membershipSchema = z.object({
  fullName: z.string().min(3, "Ingresa tu nombre completo").max(120),
  email: z.string().email("Correo inválido"),
  phone: z.string().optional().or(z.literal("")),
  rut: z
    .string()
    .min(8, "Ingresa tu RUT/identificador")
    .max(20)
    .optional()
    .or(z.literal("")),
  category: z.enum(["ESPECIALISTA", "DOCENTE", "RESIDENTE", "ESTUDIANTE", "OTRO"], {
    errorMap: () => ({ message: "Selecciona una categoría" }),
  }),
  institution: z.string().max(200).optional().or(z.literal("")),
  city: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
  acceptTerms: z.literal("on", {
    errorMap: () => ({ message: "Debes aceptar el tratamiento de tus datos" }),
  }),
  hp: z.string().optional(),
});

export type MembershipInput = z.infer<typeof membershipSchema>;
