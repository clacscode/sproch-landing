import type { Role } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";

/**
 * Configuración base de Auth.js, *edge-safe* (sin Prisma ni bcrypt).
 * La usa el middleware para proteger /admin y el config completo de `auth.ts`
 * la extiende agregando el provider de credenciales (que sí toca la DB).
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") return true;
        return auth?.user?.role === "ADMIN";
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = token.role as Role | undefined;
      return session;
    },
  },
} satisfies NextAuthConfig;
