"use server";

import { membershipSchema, type MembershipInput } from "@/lib/validations/membership";
import { emailLayout, fieldsTable, sendEmail } from "@/server/email";

export type MembershipResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof MembershipInput, string>> };

/** Etiquetas legibles para el email, en el orden del documento oficial. */
const FIELD_LABELS: { key: keyof MembershipInput; label: string }[] = [
  { key: "fullName", label: "Nombre" },
  { key: "rut", label: "Cédula de identidad" },
  { key: "birthDate", label: "Fecha de nacimiento" },
  { key: "email", label: "E-mail" },
  { key: "phone", label: "Teléfono" },
  { key: "addressPersonal", label: "Dirección particular" },
  { key: "degreeDate", label: "Fecha de título" },
  { key: "addressProfessional", label: "Dirección profesional" },
  { key: "phoneProfessional", label: "Teléfono profesional" },
  { key: "universityStudies", label: "Estudios universitarios" },
  { key: "postgrad", label: "Cursos de post-grado" },
  { key: "scholarships", label: "Becas" },
  { key: "teaching", label: "Experiencia docente" },
  { key: "societies", label: "Sociedades a las que pertenece" },
  { key: "professionalRoles", label: "Cargos profesionales" },
  { key: "guildRoles", label: "Cargos gremiales" },
  { key: "scientificWork", label: "Trabajos científicos realizados" },
  { key: "languages", label: "Idiomas" },
  { key: "sponsor", label: "Patrocinante" },
];

export async function submitMembershipAction(
  _: MembershipResult | null,
  formData: FormData,
): Promise<MembershipResult> {
  const get = (k: keyof MembershipInput) => formData.get(k)?.toString() ?? "";
  const parsed = membershipSchema.safeParse({
    fullName: get("fullName"),
    rut: get("rut"),
    birthDate: get("birthDate"),
    email: get("email"),
    phone: get("phone"),
    addressPersonal: get("addressPersonal"),
    degreeDate: get("degreeDate"),
    addressProfessional: get("addressProfessional"),
    phoneProfessional: get("phoneProfessional"),
    universityStudies: get("universityStudies"),
    postgrad: get("postgrad"),
    scholarships: get("scholarships"),
    teaching: get("teaching"),
    societies: get("societies"),
    professionalRoles: get("professionalRoles"),
    guildRoles: get("guildRoles"),
    scientificWork: get("scientificWork"),
    languages: get("languages"),
    sponsor: get("sponsor"),
    acceptStatutes: get("acceptStatutes"),
    hp: get("hp"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof MembershipInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof MembershipInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los campos marcados", fieldErrors };
  }

  // Honeypot: bot detectado → respondemos ok sin procesar.
  if (parsed.data.hp) return { ok: true };

  const data = parsed.data;
  const sent = await sendEmail({
    subject: `Nueva solicitud de incorporación — ${data.fullName}`,
    replyTo: data.email,
    html: emailLayout({
      title: "Nueva solicitud de incorporación",
      subtitle: "Socio de Número — Sociedad de Prótesis y Rehabilitación Oral de Chile",
      bodyHtml: fieldsTable(FIELD_LABELS.map(({ key, label }) => ({ label, value: data[key] as string }))),
      footer: "El postulante declaró conocer y comprometerse a respetar los Estatutos de la Sociedad.",
    }),
  });

  // Red de seguridad: si no se pudo enviar (sin RESEND_API_KEY o fallo),
  // dejamos la solicitud completa en los logs del servidor para no perderla.
  if (!sent) {
    console.error("[membership] solicitud NO enviada por email — payload de respaldo:", parsed.data);
  }

  return { ok: true };
}
