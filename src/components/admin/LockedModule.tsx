import { Lock } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function LockedModule({ title, description }: { title: string; description: string }) {
  const enabled = siteConfig.features.adminExtras;
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">{title}</h1>
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-ink-300 bg-white p-12 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-400">
          <Lock size={22} aria-hidden />
        </span>
        <div className="max-w-md">
          <p className="font-medium text-ink-900">
            {enabled ? "Módulo en construcción" : "Módulo no habilitado"}
          </p>
          <p className="mt-1 text-sm text-ink-500">{description}</p>
          {!enabled && (
            <p className="mt-3 text-xs text-ink-400">
              Disponible al activar esta fase. Hoy este contenido se gestiona en el código.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
