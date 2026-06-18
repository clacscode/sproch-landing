import "server-only";
import { auth } from "@/lib/auth";

export class NotAuthorizedError extends Error {
  constructor() {
    super("No autorizado");
    this.name = "NotAuthorizedError";
  }
}

/** Lanza si la sesión actual no es un administrador. Usar al inicio de cada mutación. */
export async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new NotAuthorizedError();
  }
}

export type ActionError = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string>;
};

export type ActionResult<T extends Record<string, unknown> = Record<never, never>> =
  | ({ ok: true } & T)
  | ActionError;
