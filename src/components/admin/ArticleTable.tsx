"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Eye, EyeOff, Pencil } from "lucide-react";
import { formatDate } from "@/lib/format";
import { ArchiveTabs, type ArchiveView } from "@/components/admin/ArchiveTabs";
import { useConfirm, useToast } from "@/components/admin/feedback";
import { archiveArticle, restoreArticle, toggleArticlePublish } from "@/server/actions/admin/news";

export interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
}

type ActionResult = { ok: true } | { ok: false; error: string };

export function ArticleTable({
  basePath,
  rows,
  archivedRows = [],
}: {
  basePath: string;
  rows: ArticleRow[];
  archivedRows?: ArticleRow[];
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

  async function onArchive(row: ArticleRow) {
    const ok = await confirm({
      title: `¿Archivar “${row.title}”?`,
      description:
        "Se quitará del sitio de inmediato. No se borra: queda guardado en “Archivados” y puedes restaurarlo cuando quieras.",
      confirmLabel: "Sí, archivar",
      danger: true,
    });
    if (ok) run(row.id, () => archiveArticle(row.id), "Archivado correctamente.");
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
            ? "No hay contenido archivado."
            : "Aún no hay contenido. Crea el primero con el botón “Nuevo”."}
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
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Fecha</th>
              <th className="px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-ink-100 divide-y">
            {visible.map((row) => {
              const isBusy = pending && busyId === row.id;
              return (
                <tr key={row.id} className={isBusy ? "opacity-50" : undefined}>
                  <td className="px-4 py-3">
                    <Link
                      href={`${basePath}/${row.id}`}
                      className="text-ink-900 hover:text-brand-700 font-medium"
                    >
                      {row.title}
                    </Link>
                    <p className="text-ink-400 text-xs">/{row.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {isArchived ? (
                      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Archivado
                      </span>
                    ) : (
                      <span
                        className={
                          row.status === "PUBLISHED"
                            ? "inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700"
                            : "bg-ink-100 text-ink-600 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                        }
                      >
                        {row.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                      </span>
                    )}
                  </td>
                  <td className="text-ink-500 hidden px-4 py-3 sm:table-cell">
                    {row.publishedAt ? formatDate(row.publishedAt) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {isArchived ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => run(row.id, () => restoreArticle(row.id), "Restaurado.")}
                          aria-label="Restaurar"
                          title="Restaurar"
                          className="text-ink-500 rounded p-1.5 transition-colors hover:bg-green-50 hover:text-green-700"
                        >
                          <ArchiveRestore size={15} aria-hidden />
                        </button>
                      ) : (
                        <>
                          <Link
                            href={`${basePath}/${row.id}`}
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
                                () => toggleArticlePublish(row.id),
                                row.status === "PUBLISHED" ? "Pasado a borrador." : "Publicado.",
                              )
                            }
                            aria-label={row.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                            title={row.status === "PUBLISHED" ? "Pasar a borrador" : "Publicar"}
                            className="text-ink-500 hover:bg-ink-100 hover:text-ink-900 rounded p-1.5 transition-colors"
                          >
                            {row.status === "PUBLISHED" ? (
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
