"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Eye, EyeOff, Pencil, Star } from "lucide-react";
import { formatDateRange } from "@/lib/format";
import { ArchiveTabs, type ArchiveView } from "@/components/admin/ArchiveTabs";
import { useConfirm, useToast } from "@/components/admin/feedback";
import { archiveEvent, restoreEvent, toggleEventPublish } from "@/server/actions/admin/events";

export interface EventRow {
  id: string;
  title: string;
  slug: string;
  category: "CURSO" | "CONGRESO";
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "FINISHED";
  startDate: string;
  endDate: string;
  featured: boolean;
}

const STATUS_LABEL: Record<EventRow["status"], { label: string; className: string }> = {
  PUBLISHED: { label: "Publicado", className: "bg-green-50 text-green-700" },
  DRAFT: { label: "Borrador", className: "bg-ink-100 text-ink-600" },
  FINISHED: { label: "Finalizado", className: "bg-blue-50 text-blue-700" },
  CANCELLED: { label: "Cancelado", className: "bg-red-50 text-red-700" },
};

type ActionResult = { ok: true } | { ok: false; error: string };

export function EventTable({
  rows,
  archivedRows = [],
}: {
  rows: EventRow[];
  archivedRows?: EventRow[];
}) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [pending, startTransition] = React.useTransition();
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [view, setView] = React.useState<ArchiveView>("activos");

  const isArchived = view === "archivados";
  const visible = isArchived ? archivedRows : rows;

  function run(id: string, fn: () => Promise<ActionResult>, successMsg: string) {
    setBusyId(id);
    startTransition(async () => {
      const res = await fn();
      setBusyId(null);
      if (res.ok) {
        toast.success(successMsg);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  }

  async function onArchive(row: EventRow) {
    const ok = await confirm({
      title: `¿Archivar “${row.title}”?`,
      description:
        "El evento se quitará del sitio de inmediato. No se borra: sus datos e inscripciones quedan guardados en “Archivados” y puedes restaurarlo.",
      confirmLabel: "Sí, archivar",
      danger: true,
    });
    if (ok) run(row.id, () => archiveEvent(row.id), "Evento archivado.");
  }

  const tabs = (
    <ArchiveTabs
      view={view}
      onChange={setView}
      activeCount={rows.length}
      archivedCount={archivedRows.length}
    />
  );

  if (visible.length === 0) {
    return (
      <div className="space-y-4">
        {tabs}
        <div className="border-ink-300 text-ink-500 rounded-lg border border-dashed bg-white p-12 text-center text-sm">
          {isArchived
            ? "No hay eventos archivados."
            : "Aún no hay cursos ni congresos. Crea el primero con “Nuevo evento”."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tabs}
      <div className="border-ink-200 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-ink-200 bg-ink-50 text-ink-500 border-b text-left text-xs tracking-wide uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Evento</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Fechas</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-ink-100 divide-y">
            {visible.map((row) => {
              const isBusy = pending && busyId === row.id;
              const status = STATUS_LABEL[row.status];
              const isPublished = row.status === "PUBLISHED";
              return (
                <tr key={row.id} className={isBusy ? "opacity-50" : undefined}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/eventos/${row.id}`}
                      className="text-ink-900 hover:text-brand-700 inline-flex items-center gap-1.5 font-medium"
                    >
                      {row.featured && <Star size={13} aria-hidden className="text-brand-600" />}
                      {row.title}
                    </Link>
                    <p className="text-ink-400 text-xs">/{row.slug}</p>
                  </td>
                  <td className="text-ink-600 px-4 py-3">
                    {row.category === "CONGRESO" ? "Congreso" : "Curso"}
                  </td>
                  <td className="px-4 py-3">
                    {isArchived ? (
                      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Archivado
                      </span>
                    ) : (
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    )}
                  </td>
                  <td className="text-ink-500 hidden px-4 py-3 md:table-cell">
                    {formatDateRange(row.startDate, row.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {isArchived ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() =>
                            run(row.id, () => restoreEvent(row.id), "Evento restaurado.")
                          }
                          aria-label="Restaurar"
                          title="Restaurar"
                          className="text-ink-500 rounded p-1.5 transition-colors hover:bg-green-50 hover:text-green-700"
                        >
                          <ArchiveRestore size={15} aria-hidden />
                        </button>
                      ) : (
                        <>
                          <Link
                            href={`/admin/eventos/${row.id}`}
                            aria-label="Editar"
                            className="text-ink-500 hover:bg-ink-100 hover:text-ink-900 rounded p-1.5"
                          >
                            <Pencil size={15} aria-hidden />
                          </Link>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() =>
                              run(
                                row.id,
                                () => toggleEventPublish(row.id),
                                isPublished ? "Pasado a borrador." : "Publicado.",
                              )
                            }
                            aria-label={isPublished ? "Despublicar" : "Publicar"}
                            title={isPublished ? "Pasar a borrador" : "Publicar"}
                            className="text-ink-500 hover:bg-ink-100 hover:text-ink-900 rounded p-1.5 transition-colors"
                          >
                            {isPublished ? (
                              <EyeOff size={15} aria-hidden />
                            ) : (
                              <Eye size={15} aria-hidden />
                            )}
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => onArchive(row)}
                            aria-label="Archivar"
                            title="Archivar"
                            className="text-ink-500 rounded p-1.5 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Archive size={15} aria-hidden />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
