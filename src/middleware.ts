import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Instancia edge-safe (sin Prisma): solo evalúa el callback `authorized`.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
