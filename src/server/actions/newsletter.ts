"use server";

import { newsletterSchema } from "@/lib/validations/newsletter";

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

  // TODO (F2.1): persistir suscripción / integrar Resend audiences
  if (process.env.NODE_ENV !== "production") {
    console.info("[newsletter] nuevo suscriptor:", parsed.data.email);
  }
  return { ok: true };
}
