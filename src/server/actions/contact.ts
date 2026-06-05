"use server";

import {
  contactSchema,
  INQUIRY_LABELS,
  type ContactInput,
  type InquiryType,
} from "@/lib/validations/contact";
import { emailLayout, fieldsTable, sendEmail } from "@/server/email";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };

export async function submitContactAction(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los campos marcados", fieldErrors };
  }

  // Honeypot
  if (parsed.data.website) {
    return { ok: true };
  }

  const data = parsed.data;
  const inquiry = data.inquiryType
    ? (INQUIRY_LABELS[data.inquiryType as InquiryType] ?? data.inquiryType)
    : "Consulta general";

  const sent = await sendEmail({
    subject: `Contacto: ${data.subject}`,
    replyTo: data.email,
    html: emailLayout({
      title: "Nuevo mensaje de contacto",
      subtitle: `Tipo: ${inquiry}`,
      bodyHtml: fieldsTable([
        { label: "Nombre", value: data.name },
        { label: "E-mail", value: data.email },
        { label: "Teléfono", value: data.phone },
        { label: "Asunto", value: data.subject },
        { label: "Mensaje", value: data.message },
      ]),
    }),
  });

  // Red de seguridad: si no se pudo enviar, dejamos el mensaje en los logs.
  if (!sent) {
    console.error("[contact] mensaje NO enviado por email — payload de respaldo:", {
      name: data.name,
      email: data.email,
      inquiryType: data.inquiryType ?? "general",
      subject: data.subject,
      message: data.message,
    });
  }

  return { ok: true };
}
