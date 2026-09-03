"use client";

import { Archive, LayoutList } from "lucide-react";
import { cn } from "@/lib/cn";

export type ArchiveView = "activos" | "archivados";

/**
 * Conmutador entre el contenido activo y el archivado. En este panel nada se
 * borra: "eliminar" archiva, y desde acá se recupera lo archivado.
 */
export function ArchiveTabs({
  view,
  onChange,
  activeCount,
  archivedCount,
  activeLabel = "Activos",
  archivedLabel = "Archivados",
}: {
  view: ArchiveView;
  onChange: (view: ArchiveView) => void;
  activeCount: number;
  archivedCount: number;
  activeLabel?: string;
  archivedLabel?: string;
}) {
  const tabs = [
    { key: "activos" as const, label: activeLabel, count: activeCount, Icon: LayoutList },
    { key: "archivados" as const, label: archivedLabel, count: archivedCount, Icon: Archive },
  ];

  return (
    <div className="border-ink-200 inline-flex rounded-lg border bg-white p-1">
      {tabs.map(({ key, label, count, Icon }) => {
        const active = key === view;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-600 text-white"
                : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
            )}
          >
            <Icon size={15} aria-hidden />
            {label}
            <span
              className={cn(
                "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                active ? "bg-white/20 text-white" : "bg-ink-100 text-ink-600",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
