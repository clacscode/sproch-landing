import { z } from "zod";

/** Texto por defecto del botón cuando el admin lo deja vacío. */
export const DEFAULT_PAYMENT_LABEL = "Pago socios";

export const paymentLinkSchema = z
  .object({
    paymentEnabled: z.boolean(),
    paymentLabel: z.string().trim().max(40, "Máximo 40 caracteres").or(z.literal("")),
    paymentUrl: z
      .string()
      .trim()
      .max(512, "El link es demasiado largo")
      .url("Pega un link completo, con https://")
      .or(z.literal("")),
  })
  // Sin link no hay nada que mostrar: no se puede activar el botón vacío.
  .refine((data) => !data.paymentEnabled || data.paymentUrl !== "", {
    path: ["paymentUrl"],
    message: "Necesitas un link de pago para mostrar el botón",
  });

export type PaymentLinkInput = z.infer<typeof paymentLinkSchema>;
