import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Ingreso · Panel SPROCh",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl uppercase tracking-tight text-brand-700">SPROCh</p>
          <p className="mt-1 text-sm text-ink-500">Panel de administración</p>
        </div>
        <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          Acceso restringido al equipo autorizado.
        </p>
      </div>
    </div>
  );
}
