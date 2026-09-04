import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        // Freno a la fuerza bruta: sin esto el login admite intentos ilimitados.
        // Se cuentan todos los intentos, no sólo los fallidos, para no revelar
        // por el comportamiento si el correo existe. Diez en 15 minutos es
        // holgado para un uso legítimo del panel.
        //
        // Si por lo que sea no hay contexto de request, se deja pasar: preferimos
        // un login sin tope antes que un panel inaccesible.
        try {
          const ip = await clientIp();
          const byIp = rateLimit(`login:ip:${ip}`, { limit: 10, windowMs: 15 * 60_000 });
          const byEmail = rateLimit(`login:email:${email}`, { limit: 10, windowMs: 15 * 60_000 });
          if (!byIp.ok || !byEmail.ok) {
            console.warn("[auth] login bloqueado por límite de intentos:", ip);
            return null;
          }
        } catch (err) {
          console.error("[auth] no se pudo aplicar el límite de intentos:", err);
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.hashedPassword || user.role !== "ADMIN") return null;

        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
});
