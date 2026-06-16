/**
 * Hook de arranque de Next.js. Se ejecuta una vez al iniciar el servidor.
 * Solo en runtime Node (no en edge) para poder usar Prisma/bcrypt.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureAdmin } = await import("@/server/bootstrap");
    await ensureAdmin();
  }
}
