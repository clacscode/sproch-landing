import "server-only";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PAYMENT_LABEL } from "@/lib/validations/settings";

/** Fila única de ajustes (id = "default"). */
const SETTINGS_ID = "default";

export interface PaymentLink {
  label: string;
  url: string;
}

export interface SiteSettingsValues {
  paymentEnabled: boolean;
  paymentLabel: string;
  paymentUrl: string;
}

const EMPTY: SiteSettingsValues = {
  paymentEnabled: false,
  paymentLabel: "",
  paymentUrl: "",
};

/**
 * Ajustes tal cual se editan en el panel (nunca null: sin fila, todo vacío).
 *
 * El layout público llama a esto, así que corre también al prerenderizar en CI,
 * donde no hay base de datos (vive en el server). Si no se puede leer, el sitio
 * se genera sin botón de pago y el ISR (revalidate 300) lo completa al primer
 * render en producción — nunca se cae el build por esto.
 */
export async function getSiteSettings(): Promise<SiteSettingsValues> {
  let row: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>> = null;
  try {
    row = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  } catch (err) {
    console.warn("[settings] no se pudo leer SiteSettings, se asumen vacíos:", err);
    return EMPTY;
  }
  if (!row) return EMPTY;
  return {
    paymentEnabled: row.paymentEnabled,
    paymentLabel: row.paymentLabel ?? "",
    paymentUrl: row.paymentUrl ?? "",
  };
}

/**
 * Link del botón "Pago socios" para el header público.
 * `null` cuando está desactivado o sin URL: el botón simplemente no se muestra.
 */
export async function getPaymentLink(): Promise<PaymentLink | null> {
  const settings = await getSiteSettings();
  if (!settings.paymentEnabled || !settings.paymentUrl) return null;
  return {
    label: settings.paymentLabel || DEFAULT_PAYMENT_LABEL,
    url: settings.paymentUrl,
  };
}
