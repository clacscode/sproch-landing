"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/format";
import { deleteArticle, toggleArticlePublish } from "@/server/actions/admin/news";

export interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
}

export function ArticleTable({ basePath, rows }: { basePath: string; rows: ArticleRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [busyId, setBusyId] = React.useState<string | null>(null);

  function run(id: string, fn: () => Promise<unknown>) {
    setBusyId(id);
    startTransition(async () => {
      await fn();
      setBusyId(null);
      router.refresh();
    });
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-ink-300 bg-white p-12 text-center text-sm text-ink-500">
        Aún no hay contenido. Crea el primero con el botón “Nuevo”.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-ink-200 bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
          <tr>
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Fecha</th>
            <th className="px-4 py-3 text-right font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {rows.map((row) => {
            const isBusy = pending && busyId === row.id;
            return (
              <tr key={row.id} className={isBusy ? "opacity-50" : undefined}>
                <td className="px-4 py-3">
                  <Link href={`${basePath}/${row.id}`} className="font-medium text-ink-900 hover:text-brand-700">
                    {row.title}
                  </Link>
                  <p className="text-xs text-ink-400">/{row.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      row.status === "PUBLISHED"
                        ? "inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700"
                        : "inline-flex rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600"
                    }
                  >
                    {row.status === "PUBLISHED" ? "Publicado" : "Borrador"}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-ink-500 sm:table-cell">
                  {row.publishedAt ? formatDate(row.publishedAt) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`${basePath}/${row.id}`}
                      aria-label="Editar"
                      className="rounded p-1.5 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                    >
                      <Pencil size={15} aria-hidden />
                    </Link>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => run(row.id, () => toggleArticlePublish(row.id))}
                      aria-label={row.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                      title={row.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                      className="rounded p-1.5 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
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
                      onClick={() => {
                        if (window.confirm(`¿Eliminar “${row.title}”? Esta acción no se puede deshacer.`))
                          run(row.id, () => deleteArticle(row.id));
                      }}
                      aria-label="Eliminar"
                      className="rounded p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"
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
