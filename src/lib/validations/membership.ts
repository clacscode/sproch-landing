import { z } from "zod";

/** Campo de texto opcional con largo máximo. */
const optText = (max: number) => z.string().max(max).optional().or(z.literal(""));

/**
 * Solicitud de Incorporación como Socio de Número (Formulario de Antecedentes).
 * Campos según el documento oficial de la SPROCh.
 */
export const membershipSchema = z.object({
  // — Datos personales —
  fullName: z.string().min(3, "Ingresa tu nombre completo").max(160),
  rut: z.string().min(7, "Ingresa tu cédula de identidad").max(20),
  birthDate: optText(20),
  email: z.string().email("Correo inválido").max(160),
  phone: z.string().min(6, "Ingresa un teléfono de contacto").max(40),
  addressPersonal: optText(200),

  // — Datos profesionales —
  degreeDate: optText(20),
  addressProfessional: optText(200),
  phoneProfessional: optText(40),

  // — Antecedentes —
  universityStudies: optText(2000),
  postgrad: optText(2000),
  scholarships: optText(2000),
  teaching: optText(2000),
  societies: optText(2000),
  professionalRoles: optText(2000),
  guildRoles: optText(2000),
  scientificWork: optText(2000),
  languages: optText(300),

  // — Patrocinante —
  sponsor: optText(160),

  // — Declaración (obligatoria) —
  acceptStatutes: z.literal("on", {
    errorMap: () => ({ message: "Debes declarar conocer y respetar los Estatutos" }),
  }),

  // honeypot
  hp: z.string().optional(),
});

export type MembershipInput = z.infer<typeof membershipSchema>;
