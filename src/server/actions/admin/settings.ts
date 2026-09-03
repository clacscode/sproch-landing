"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { paymentLinkSchema, type PaymentLinkInput } from "@/lib/validations/settings";
import {
  type ActionError,
  type ActionResult,
  NotAuthorizedError,
  requireAdmin,
} from "@/server/actions/admin/_guard";

const SETTINGS_ID = "default";

function fieldErrorsFromZod(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function handleError(err: unknown): ActionError {
  if (err instanceof NotAuthorizedError) return { ok: false, error: "No autorizado" };
  if (err instanceof ZodError)
    return { ok: false, error: "Revisa los campos marcados", fieldErrors: fieldErrorsFromZod(err) };
  console.error("[admin/settings]", err);
  return { ok: false, error: "Ocurrió un error al guardar. Intenta nuevamente." };
}

/**
 * Guarda el botón de pago del header. El botón vive en el layout público, así
 * que se revalida todo el árbol para que el cambio se vea en cualquier página.
 */
export async function updatePaymentLink(input: PaymentLinkInput): Promise<ActionResult> {
  try {
    await requireAdmin();
    const data = paymentLinkSchema.parse(input);
    const values = {
      paymentEnabled: data.paymentEnabled,
      paymentLabel: data.paymentLabel || null,
      paymentUrl: data.paymentUrl || null,
    };
    await prisma.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, ...values },
      update: values,
    });
    revalidatePath("/", "layout");
    revalidatePath("/admin/configuracion");
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}
