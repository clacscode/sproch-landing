"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useConfirm, useToast } from "@/components/admin/feedback";
import {
  deleteContactMessage,
  deleteMembershipApplication,
  deleteNewsletterSubscriber,
  toggleContactResolved,
  toggleMembershipResolved,
} from "@/server/actions/admin/messages";

type ActionResult = { ok: true } | { ok: false; error: string };

export interface ContactRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  inquiryLabel: string;
  subject: string;
  message: string;
  resolved: boolean;
  createdAt: string;
}

export interface MembershipRow {
  id: string;
  fullName: string;
  rut: string;
  email: string;
  phone: string;
  resolved: boolean;
  createdAt: string;
  /** Antecedentes completos ya formateados (solo campos con valor). */
  fields: { label: string; value: string }[];
}

export interface SubscriberRow {
  id: string;
  email: string;
  createdAt: string;
}

function useRowActions() {
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

  return { run, confirm, isBusy: (id: string) => pending && busyId === id };
}

function StatusBadge({ resolved }: { resolved: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        resolved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700",
      )}
    >
      {resolved ? "Atendido" : "Pendiente"}
    </span>
  );
}

function RowButtons({
  resolved,
  busy,
  onToggle,
  onDelete,
}: {
  resolved: boolean;
  busy: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={onToggle}
        aria-label={resolved ? "Marcar como pendiente" : "Marcar como atendido"}
        title={resolved ? "Marcar como pendiente" : "Marcar como atendido"}
        className="rounded p-1.5 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
      >
        {resolved ? <Undo2 size={15} aria-hidden /> : <Check size={15} aria-hidden />}
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={onDelete}
        aria-label="Eliminar"
        className="rounded p-1.5 text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={15} aria-hidden />
      </button>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-ink-300 bg-white p-12 text-center text-sm text-ink-500">
      {children}
    </div>
  );
}

export function ContactMessagesList({ rows }: { rows: ContactRow[] }) {
  const { run, confirm, isBusy } = useRowActions();

  async function onDelete(row: ContactRow) {
    const ok = await confirm({
      title: `¿Eliminar el mensaje de ${row.name}?`,
      description: "Esta acción no se puede deshacer.",
      confirmLabel: "Sí, eliminar",
      danger: true,
    });
    if (ok) run(row.id, () => deleteContactMessage(row.id), "Mensaje eliminado.");
  }

  if (rows.length === 0) {
    return <EmptyState>Aún no llegan mensajes desde el formulario de contacto.</EmptyState>;
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className={cn(
            "rounded-lg border border-ink-200 bg-white p-5",
            isBusy(row.id) && "opacity-50",
            row.resolved && "opacity-75",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 font-medium text-ink-900">
                {row.name}
                <StatusBadge resolved={row.resolved} />
                <span className="inline-flex rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600">
                  {row.inquiryLabel}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-ink-500">
                <a href={`mailto:${row.email}`} className="hover:text-brand-700">
                  {row.email}
                </a>
                {row.phone && ` · ${row.phone}`} · {row.createdAt}
              </p>
            </div>
            <RowButtons
              resolved={row.resolved}
              busy={isBusy(row.id)}
              onToggle={() =>
                run(
                  row.id,
                  () => toggleContactResolved(row.id),
                  row.resolved ? "Marcado como pendiente." : "Marcado como atendido.",
                )
              }
              onDelete={() => onDelete(row)}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-ink-900">{row.subject}</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-ink-600">{row.message}</p>
        </article>
      ))}
    </div>
  );
}

export function MembershipApplicationsList({ rows }: { rows: MembershipRow[] }) {
  const { run, confirm, isBusy } = useRowActions();

  async function onDelete(row: MembershipRow) {
    const ok = await confirm({
      title: `¿Eliminar la solicitud de ${row.fullName}?`,
      description: "Se perderán todos los antecedentes. Esta acción no se puede deshacer.",
      confirmLabel: "Sí, eliminar",
      danger: true,
    });
    if (ok) run(row.id, () => deleteMembershipApplication(row.id), "Solicitud eliminada.");
  }

  if (rows.length === 0) {
    return <EmptyState>Aún no llegan solicitudes de incorporación como socio.</EmptyState>;
  }

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className={cn(
            "rounded-lg border border-ink-200 bg-white p-5",
            isBusy(row.id) && "opacity-50",
            row.resolved && "opacity-75",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 font-medium text-ink-900">
                {row.fullName}
                <StatusBadge resolved={row.resolved} />
              </p>
              <p className="mt-0.5 text-xs text-ink-500">
                {row.rut} ·{" "}
                <a href={`mailto:${row.email}`} className="hover:text-brand-700">
                  {row.email}
                </a>{" "}
                · {row.phone} · {row.createdAt}
              </p>
            </div>
            <RowButtons
              resolved={row.resolved}
              busy={isBusy(row.id)}
              onToggle={() =>
                run(
                  row.id,
                  () => toggleMembershipResolved(row.id),
                  row.resolved ? "Marcada como pendiente." : "Marcada como atendida.",
                )
              }
              onDelete={() => onDelete(row)}
            />
          </div>
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-semibold text-brand-700 hover:text-brand-800">
              Ver antecedentes completos
            </summary>
            <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {row.fields.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 whitespace-pre-wrap text-sm text-ink-700">{f.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        </article>
      ))}
    </div>
  );
}

export function SubscribersTable({ rows }: { rows: SubscriberRow[] }) {
  const { run, confirm, isBusy } = useRowActions();

  async function onDelete(row: SubscriberRow) {
    const ok = await confirm({
      title: `¿Eliminar a ${row.email} de la lista?`,
      description: "Dejará de figurar entre los suscriptores del newsletter.",
      confirmLabel: "Sí, eliminar",
      danger: true,
    });
    if (ok) run(row.id, () => deleteNewsletterSubscriber(row.id), "Suscriptor eliminado.");
  }

  if (rows.length === 0) {
    return <EmptyState>Aún no hay suscriptores al newsletter.</EmptyState>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-ink-200 bg-ink-50 text-left text-xs uppercase tracking-wide text-ink-500">
          <tr>
            <th className="px-4 py-3 font-medium">E-mail</th>
            <th className="px-4 py-3 font-medium">Suscrito el</th>
            <th className="px-4 py-3 text-right font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {rows.map((row) => (
            <tr key={row.id} className={isBusy(row.id) ? "opacity-50" : undefined}>
              <td className="px-4 py-3">
                <a href={`mailto:${row.email}`} className="font-medium text-ink-900 hover:text-brand-700">
                  {row.email}
                </a>
              </td>
              <td className="px-4 py-3 text-ink-500">{row.createdAt}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    disabled={isBusy(row.id)}
                    onClick={() => onDelete(row)}
                    aria-label="Eliminar"
                    className="rounded p-1.5 text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} aria-hidden />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
