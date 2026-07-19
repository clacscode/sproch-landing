"use server";

import { Prisma } from "@prisma/client";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { prisma } from "@/lib/prisma";
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

  const email = parsed.data.email.toLowerCase();

  // Fuente de verdad: la lista de suscriptores en la DB.
  try {
    await prisma.newsletterSubscriber.create({ data: { email } });
  } catch (err) {
    // Ya estaba suscrito → lo tratamos como éxito, sin notificar de nuevo.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: true };
    }
    console.error("[newsletter] no se pudo guardar la suscripción en la DB:", err);
    return { ok: false, error: "No pudimos registrar tu suscripción. Intenta nuevamente." };
  }

  // Notificación best-effort (no-op sin RESEND_API_KEY).
  const sent = await sendEmail({
    subject: `Nuevo suscriptor al newsletter — ${email}`,
    replyTo: email,
    html: emailLayout({
      title: "Nuevo suscriptor al newsletter",
      bodyHtml: fieldsTable([{ label: "E-mail", value: email }]),
    }),
  });

  if (!sent) {
    console.error("[newsletter] suscripción NO notificada por email:", email);
  }
  return { ok: true };
}
