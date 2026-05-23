"use server";

import { contactSchema, type ContactInput } from "@/lib/validations/contact";

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

  // TODO (F2): persistir en Prisma (ContactMessage) y enviar email con Resend.
  // Por ahora, registramos en logs del servidor para no perder el mensaje en desarrollo.
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] nuevo mensaje:", {
      name: parsed.data.name,
      email: parsed.data.email,
      inquiryType: parsed.data.inquiryType ?? "general",
      subject: parsed.data.subject,
    });
  }

  return { ok: true };
}
