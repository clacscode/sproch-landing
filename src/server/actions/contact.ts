"use server";

import {
  contactSchema,
  INQUIRY_LABELS,
  type ContactInput,
  type InquiryType,
} from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit, tooManyRequestsMessage } from "@/lib/rate-limit";
import { emailLayout, fieldsTable, sendEmail } from "@/server/email";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> };

export async function submitContactAction(input: ContactInput): Promise<ContactResult> {
  // Antes de validar: el honeypot no frena un script, y sin tope cualquiera
  // puede inundar la bandeja y quemar la cuota de envío de Resend.
  const limit = rateLimit(`contact:${await clientIp()}`, { limit: 5, windowMs: 15 * 60_000 });
  if (!limit.ok) return { ok: false, error: tooManyRequestsMessage(limit.retryAfter) };

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

  // Fuente de verdad: la DB. El email es solo una notificación best-effort.
  let saved = false;
  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        inquiryType: data.inquiryType || null,
        subject: data.subject,
        message: data.message,
      },
    });
    saved = true;
  } catch (err) {
    console.error("[contact] no se pudo guardar el mensaje en la DB:", err);
  }

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

  // Red de seguridad: si tampoco se guardó en la DB, dejamos el mensaje en los logs.
  if (!saved && !sent) {
    console.error("[contact] mensaje NO guardado ni enviado — payload de respaldo:", {
      name: data.name,
      email: data.email,
      inquiryType: data.inquiryType ?? "general",
      subject: data.subject,
      message: data.message,
    });
    return {
      ok: false,
      error: "No pudimos registrar tu mensaje. Intenta nuevamente en unos minutos.",
    };
  }

  return { ok: true };
}
