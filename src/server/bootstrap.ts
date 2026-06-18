import "server-only";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * Garantiza que exista el usuario administrador al arrancar el servidor.
 * Pensado para hostings con deploy automático y sin acceso a shell (Hostinger):
 * permite entrar a /admin sin correr el seed manualmente.
 *
 * Idempotente y seguro: solo crea el admin si NO existe. Nunca resetea la
 * contraseña de uno ya creado (para no pisar cambios hechos desde la DB).
 */
export async function ensureAdmin(): Promise<void> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  try {
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) return;

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name: process.env.ADMIN_NAME ?? "Administrador",
        hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`[bootstrap] admin creado: ${email}`);
  } catch (err) {
    // No bloquear el arranque si la DB no está disponible momentáneamente.
    console.error("[bootstrap] no se pudo asegurar el admin:", err);
  }
}
