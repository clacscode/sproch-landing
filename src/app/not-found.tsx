import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-50 px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl tracking-tight text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900">Página no encontrada</h1>
        <p className="mt-3 text-ink-600">
          La ruta que buscas no existe o fue movida. Te dejamos algunos atajos para retomar la
          navegación.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Ir al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/eventos">Ver eventos</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
