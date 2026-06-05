"use server";

import { membershipSchema, type MembershipInput } from "@/lib/validations/membership";
import { siteConfig } from "@/lib/site";

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: MembershipInput): string {
  const rows = FIELD_LABELS.filter(({ key }) => (data[key] as string)?.trim())
    .map(
      ({ key, label }) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#fafafa;font-weight:600;vertical-align:top;white-space:nowrap;">${label}</td>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(String(data[key]))}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,Arial,sans-serif;color:#111;max-width:680px;">
      <h2 style="margin:0 0 4px;">Nueva solicitud de incorporación</h2>
      <p style="margin:0 0 16px;color:#555;">Socio de Número — Sociedad de Prótesis y Rehabilitación Oral de Chile</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
      <p style="margin:18px 0 0;color:#888;font-size:12px;">El postulante declaró conocer y comprometerse a respetar los Estatutos de la Sociedad.</p>
    </div>`;
}

/** Envía la solicitud por email vía Resend. Devuelve true si se envió. */
async function sendByResend(data: MembershipInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.EMAIL_FROM ?? "SPROCh <onboarding@resend.dev>";
  const to = process.env.CONTACT_INBOX ?? siteConfig.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `Nueva solicitud de incorporación — ${data.fullName}`,
      html: buildEmailHtml(data),
    }),
  });

  if (!res.ok) {
    console.error("[membership] Resend respondió con error:", res.status, await res.text());
    return false;
  }
  return true;
}

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

  const sent = await sendByResend(parsed.data);

  // Red de seguridad: si no se pudo enviar (sin RESEND_API_KEY o fallo),
  // dejamos la solicitud completa en los logs del servidor para no perderla.
  if (!sent) {
    console.error("[membership] solicitud NO enviada por email — payload de respaldo:", parsed.data);
  }

  return { ok: true };
}
