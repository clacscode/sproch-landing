"use server";

import { newsletterSchema } from "@/lib/validations/newsletter";
import { emailLayout, fieldsTable, sendEmail } from "@/server/email";

export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: string };

export async function subscribeNewsletterAction(
  _: NewsletterResult | null,
  formData: FormData,
): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    hp: formData.get("hp")?.toString() ?? "",
  });
  if (!parsed.success) {
    return { ok: false, error: "Ingresa un correo válido." };
  }
  // Honeypot trampa
  if (parsed.data.hp) {
    return { ok: true };
  }

  const sent = await sendEmail({
    subject: `Nuevo suscriptor al newsletter — ${parsed.data.email}`,
    replyTo: parsed.data.email,
    html: emailLayout({
      title: "Nuevo suscriptor al newsletter",
      bodyHtml: fieldsTable([{ label: "E-mail", value: parsed.data.email }]),
    }),
  });

  if (!sent) {
    console.error("[newsletter] suscripción NO notificada por email:", parsed.data.email);
  }
  return { ok: true };
}
