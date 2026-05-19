import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Correo inválido"),
  // Honeypot
  hp: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
