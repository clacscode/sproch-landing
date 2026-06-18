"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Star, Trash2 } from "lucide-react";
import { formatDateRange } from "@/lib/format";
import { useConfirm, useToast } from "@/components/admin/feedback";
import { deleteEvent, toggleEventPublish } from "@/server/actions/admin/events";

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

export function EventTable({ rows }: { rows: EventRow[] }) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [pending, startTransition] = React.useTransition();
  const [busyId, setBusyId] = React.useState<string | null>(null);

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

  async function onDelete(row: EventRow) {
    const ok = await confirm({
      title: `¿Eliminar “${row.title}”?`,
      description: "El evento se quitará del sitio de inmediato. Esta acción no se puede deshacer.",
      confirmLabel: "Sí, eliminar",
      danger: true,
    });
    if (ok) run(row.id, () => deleteEvent(row.id), "Evento eliminado.");
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-300 bg-white p-12 text-center text-sm text-ink-500">
        Aún no hay cursos ni congresos. Crea el primero con “Nuevo evento”.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-ink-200 bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
          <tr>
            <th className="px-4 py-3 font-medium">Evento</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Fechas</th>
            <th className="px-4 py-3 text-right font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {rows.map((row) => {
            const isBusy = pending && busyId === row.id;
            const status = STATUS_LABEL[row.status];
            const isPublished = row.status === "PUBLISHED";
            return (
              <tr key={row.id} className={isBusy ? "opacity-50" : undefined}>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/eventos/${row.id}`}
                    className="inline-flex items-center gap-1.5 font-medium text-ink-900 hover:text-brand-700"
                  >
                    {row.featured && <Star size={13} aria-hidden className="text-brand-600" />}
                    {row.title}
                  </Link>
                  <p className="text-xs text-ink-400">/{row.slug}</p>
                </td>
                <td className="px-4 py-3 text-ink-600">
                  {row.category === "CONGRESO" ? "Congreso" : "Curso"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-ink-500 md:table-cell">
                  {formatDateRange(row.startDate, row.endDate)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/eventos/${row.id}`}
                      aria-label="Editar"
                      className="rounded p-1.5 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
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
                      className="rounded p-1.5 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                    >
                      {isPublished ? <EyeOff size={15} aria-hidden /> : <Eye size={15} aria-hidden />}
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => onDelete(row)}
                      aria-label="Eliminar"
                      className="rounded p-1.5 text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
