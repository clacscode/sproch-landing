"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Check, Search, SlidersHorizontal, Undo2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { ArchiveTabs, type ArchiveView } from "@/components/admin/ArchiveTabs";
import { useConfirm, useToast } from "@/components/admin/feedback";
import {
  archiveContactMessage,
  archiveMembershipApplication,
  archiveNewsletterSubscriber,
  restoreContactMessage,
  restoreMembershipApplication,
  restoreNewsletterSubscriber,
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
  /** Fecha en que se marcó como respondido (ya formateada); null si sigue pendiente. */
  resolvedAt: string | null;
  createdAt: string;
}

export interface MembershipRow {
  id: string;
  fullName: string;
  rut: string;
  email: string;
  phone: string;
  resolved: boolean;
  /** Fecha en que se marcó como respondida (ya formateada); null si sigue pendiente. */
  resolvedAt: string | null;
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

function StatusBadge({ resolved, resolvedAt }: { resolved: boolean; resolvedAt: string | null }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        resolved ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700",
      )}
    >
      {resolved ? (resolvedAt ? `Respondido el ${resolvedAt}` : "Respondido") : "Pendiente"}
    </span>
  );
}

function RestoreButton({ busy, onRestore }: { busy: boolean; onRestore: () => void }) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onRestore}
      aria-label="Restaurar"
      title="Restaurar"
      className="text-ink-500 rounded p-1.5 transition-colors hover:bg-green-50 hover:text-green-700"
    >
      <ArchiveRestore size={15} aria-hidden />
    </button>
  );
}

/**
 * Acción con texto visible: los íconos solos se leían como "eliminar" y nadie
 * encontraba el de marcar como respondido.
 */
function ActionButton({
  icon: Icon,
  label,
  busy,
  onClick,
}: {
  icon: typeof Check;
  label: string;
  busy: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onClick}
      className="border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-ink-900 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
    >
      <Icon size={14} aria-hidden />
      {label}
    </button>
  );
}

function RowButtons({
  resolved,
  busy,
  archived,
  onToggle,
  onArchive,
  onRestore,
}: {
  resolved: boolean;
  busy: boolean;
  archived: boolean;
  onToggle: () => void;
  onArchive: () => void;
  onRestore: () => void;
}) {
  if (archived) {
    return (
      <div className="flex items-center gap-1">
        <RestoreButton busy={busy} onRestore={onRestore} />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionButton
        icon={resolved ? Undo2 : Check}
        label={resolved ? "Marcar como pendiente" : "Marcar como respondido"}
        busy={busy}
        onClick={onToggle}
      />
      <ActionButton icon={Archive} label="Archivar" busy={busy} onClick={onArchive} />
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-ink-300 text-ink-500 rounded-lg border border-dashed bg-white p-12 text-center text-sm">
      {children}
    </div>
  );
}

/** Búsqueda insensible a mayúsculas y tildes. */
function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

interface SelectFilter {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

const ESTADO_OPTIONS = [
  { value: "todos", label: "Todos" },
  { value: "pendiente", label: "Pendiente" },
  { value: "respondido", label: "Respondido" },
];

function matchesEstado(resolved: boolean, estado: string): boolean {
  return estado === "todos" || resolved === (estado === "respondido");
}

function FilterBar({
  query,
  onQueryChange,
  selects,
  shown,
  total,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  selects?: SelectFilter[];
  shown: number;
  total: number;
}) {
  const hasActiveSelect = selects?.some((s) => s.value !== "todos") ?? false;
  const [open, setOpen] = React.useState(false);
  const showPanel = open || hasActiveSelect;

  return (
    <div className="border-ink-200 rounded-lg border bg-white p-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search
            size={15}
            aria-hidden
            className="text-ink-400 absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar..."
            className="border-ink-200 text-ink-900 placeholder:text-ink-400 focus:border-brand-600 w-full rounded-md border py-2 pr-3 pl-9 text-sm transition-colors outline-none"
          />
        </div>
        {selects && selects.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              showPanel
                ? "bg-brand-600 text-white"
                : "border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-ink-900 border",
            )}
          >
            <SlidersHorizontal size={15} aria-hidden />
            Filtros
          </button>
        )}
        <span className="text-ink-400 ml-auto text-xs">
          {shown === total ? `${total} en total` : `${shown} de ${total}`}
        </span>
      </div>
      {selects && showPanel && (
        <div className="border-ink-100 mt-3 grid gap-3 border-t pt-3 sm:grid-cols-2 lg:grid-cols-4">
          {selects.map((s) => (
            <label key={s.label} className="block">
              <span className="text-ink-400 text-[11px] font-semibold tracking-wide uppercase">
                {s.label}
              </span>
              <select
                value={s.value}
                onChange={(e) => s.onChange(e.target.value)}
                className="border-ink-200 text-ink-900 focus:border-brand-600 mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors outline-none"
              >
                {s.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function ContactMessagesList({
  rows,
  archivedRows = [],
}: {
  rows: ContactRow[];
  archivedRows?: ContactRow[];
}) {
  const { run, confirm, isBusy } = useRowActions();
  const [query, setQuery] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const [tipo, setTipo] = React.useState("todos");
  const [view, setView] = React.useState<ArchiveView>("activos");

  const isArchived = view === "archivados";
  const source = isArchived ? archivedRows : rows;
  const tipos = Array.from(new Set(source.map((r) => r.inquiryLabel))).sort();
  const visible = source.filter(
    (row) =>
      matchesEstado(row.resolved, estado) &&
      (tipo === "todos" || row.inquiryLabel === tipo) &&
      (!query.trim() ||
        norm([row.name, row.email, row.phone ?? "", row.subject, row.message].join(" ")).includes(
          norm(query.trim()),
        )),
  );

  async function onArchive(row: ContactRow) {
    const ok = await confirm({
      title: `¿Archivar el mensaje de ${row.name}?`,
      description:
        "Sale de la bandeja activa, pero no se borra: queda guardado en “Archivados” y puedes restaurarlo cuando quieras.",
      confirmLabel: "Archivar",
    });
    if (ok) run(row.id, () => archiveContactMessage(row.id), "Mensaje archivado.");
  }

  const tabs = (
    <ArchiveTabs
      view={view}
      onChange={setView}
      activeCount={rows.length}
      archivedCount={archivedRows.length}
    />
  );

  if (source.length === 0) {
    return (
      <div className="space-y-4">
        {tabs}
        <EmptyState>
          {isArchived
            ? "No hay mensajes archivados."
            : "Aún no llegan mensajes desde el formulario de contacto."}
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tabs}
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        shown={visible.length}
        total={source.length}
        selects={[
          { label: "Estado", value: estado, onChange: setEstado, options: ESTADO_OPTIONS },
          {
            label: "Tipo de consulta",
            value: tipo,
            onChange: setTipo,
            options: [
              { value: "todos", label: "Todos" },
              ...tipos.map((t) => ({ value: t, label: t })),
            ],
          },
        ]}
      />
      {visible.length === 0 && (
        <EmptyState>Ningún mensaje coincide con la búsqueda o los filtros.</EmptyState>
      )}
      {visible.map((row) => (
        <article
          key={row.id}
          className={cn(
            "border-ink-200 rounded-lg border bg-white p-5",
            isBusy(row.id) && "opacity-50",
            row.resolved && "opacity-75",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-ink-900 flex flex-wrap items-center gap-2 font-medium">
                {row.name}
                <StatusBadge resolved={row.resolved} resolvedAt={row.resolvedAt} />
                <span className="bg-ink-100 text-ink-600 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium">
                  {row.inquiryLabel}
                </span>
              </p>
              <p className="text-ink-500 mt-0.5 text-xs">
                <a href={`mailto:${row.email}`} className="hover:text-brand-700">
                  {row.email}
                </a>
                {row.phone && ` · ${row.phone}`} · {row.createdAt}
              </p>
            </div>
            <RowButtons
              resolved={row.resolved}
              busy={isBusy(row.id)}
              archived={isArchived}
              onToggle={() =>
                run(
                  row.id,
                  () => toggleContactResolved(row.id),
                  row.resolved ? "Marcado como pendiente." : "Marcado como respondido.",
                )
              }
              onArchive={() => onArchive(row)}
              onRestore={() =>
                run(row.id, () => restoreContactMessage(row.id), "Mensaje restaurado.")
              }
            />
          </div>
          <p className="text-ink-900 mt-3 text-sm font-medium">{row.subject}</p>
          <p className="text-ink-600 mt-1 text-sm whitespace-pre-wrap">{row.message}</p>
        </article>
      ))}
    </div>
  );
}

export function MembershipApplicationsList({
  rows,
  archivedRows = [],
}: {
  rows: MembershipRow[];
  archivedRows?: MembershipRow[];
}) {
  const { run, confirm, isBusy } = useRowActions();
  const [query, setQuery] = React.useState("");
  const [estado, setEstado] = React.useState("todos");
  const [view, setView] = React.useState<ArchiveView>("activos");

  const isArchived = view === "archivados";
  const source = isArchived ? archivedRows : rows;
  const visible = source.filter(
    (row) =>
      matchesEstado(row.resolved, estado) &&
      (!query.trim() ||
        norm(
          [row.fullName, row.rut, row.email, row.phone, ...row.fields.map((f) => f.value)].join(
            " ",
          ),
        ).includes(norm(query.trim()))),
  );

  async function onArchive(row: MembershipRow) {
    const ok = await confirm({
      title: `¿Archivar la solicitud de ${row.fullName}?`,
      description:
        "Sale del listado activo, pero los antecedentes se conservan: queda en “Archivados” y puedes restaurarla cuando quieras.",
      confirmLabel: "Archivar",
    });
    if (ok) run(row.id, () => archiveMembershipApplication(row.id), "Solicitud archivada.");
  }

  const tabs = (
    <ArchiveTabs
      view={view}
      onChange={setView}
      activeCount={rows.length}
      archivedCount={archivedRows.length}
    />
  );

  if (source.length === 0) {
    return (
      <div className="space-y-4">
        {tabs}
        <EmptyState>
          {isArchived
            ? "No hay solicitudes archivadas."
            : "Aún no llegan solicitudes de incorporación como socio."}
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tabs}
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        shown={visible.length}
        total={source.length}
        selects={[{ label: "Estado", value: estado, onChange: setEstado, options: ESTADO_OPTIONS }]}
      />
      {visible.length === 0 && (
        <EmptyState>Ninguna solicitud coincide con la búsqueda o los filtros.</EmptyState>
      )}
      {visible.map((row) => (
        <article
          key={row.id}
          className={cn(
            "border-ink-200 rounded-lg border bg-white p-5",
            isBusy(row.id) && "opacity-50",
            row.resolved && "opacity-75",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-ink-900 flex flex-wrap items-center gap-2 font-medium">
                {row.fullName}
                <StatusBadge resolved={row.resolved} resolvedAt={row.resolvedAt} />
              </p>
              <p className="text-ink-500 mt-0.5 text-xs">
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
              archived={isArchived}
              onToggle={() =>
                run(
                  row.id,
                  () => toggleMembershipResolved(row.id),
                  row.resolved ? "Marcada como pendiente." : "Marcada como respondida.",
                )
              }
              onArchive={() => onArchive(row)}
              onRestore={() =>
                run(row.id, () => restoreMembershipApplication(row.id), "Solicitud restaurada.")
              }
            />
          </div>
          <details className="mt-3">
            <summary className="text-brand-700 hover:text-brand-800 cursor-pointer text-sm font-semibold">
              Ver antecedentes completos
            </summary>
            <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {row.fields.map((f) => (
                <div key={f.label}>
                  <dt className="text-ink-400 text-[11px] font-semibold tracking-wide uppercase">
                    {f.label}
                  </dt>
                  <dd className="text-ink-700 mt-0.5 text-sm whitespace-pre-wrap">{f.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        </article>
      ))}
    </div>
  );
}

export function SubscribersTable({
  rows,
  archivedRows = [],
}: {
  rows: SubscriberRow[];
  archivedRows?: SubscriberRow[];
}) {
  const { run, confirm, isBusy } = useRowActions();
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<ArchiveView>("activos");

  const isArchived = view === "archivados";
  const source = isArchived ? archivedRows : rows;
  const visible = source.filter(
    (row) => !query.trim() || norm(row.email).includes(norm(query.trim())),
  );

  async function onArchive(row: SubscriberRow) {
    const ok = await confirm({
      title: `¿Dar de baja a ${row.email}?`,
      description:
        "Dejará de figurar entre los suscriptores activos. El registro se conserva y puedes reactivarlo.",
      confirmLabel: "Sí, dar de baja",
      danger: true,
    });
    if (ok) run(row.id, () => archiveNewsletterSubscriber(row.id), "Suscriptor dado de baja.");
  }

  const tabs = (
    <ArchiveTabs
      view={view}
      onChange={setView}
      activeCount={rows.length}
      archivedCount={archivedRows.length}
      activeLabel="Suscritos"
      archivedLabel="Dados de baja"
    />
  );

  if (source.length === 0) {
    return (
      <div className="space-y-4">
        {tabs}
        <EmptyState>
          {isArchived
            ? "No hay suscriptores dados de baja."
            : "Aún no hay suscriptores al newsletter."}
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tabs}
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        shown={visible.length}
        total={source.length}
      />
      {visible.length === 0 ? (
        <EmptyState>Ningún suscriptor coincide con la búsqueda.</EmptyState>
      ) : (
        <div className="border-ink-200 overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-sm">
            <thead className="border-ink-200 bg-ink-50 text-ink-500 border-b text-left text-xs tracking-wide uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">E-mail</th>
                <th className="px-4 py-3 font-medium">Suscrito el</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-ink-100 divide-y">
              {visible.map((row) => (
                <tr key={row.id} className={isBusy(row.id) ? "opacity-50" : undefined}>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${row.email}`}
                      className="text-ink-900 hover:text-brand-700 font-medium"
                    >
                      {row.email}
                    </a>
                  </td>
                  <td className="text-ink-500 px-4 py-3">{row.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      {isArchived ? (
                        <RestoreButton
                          busy={isBusy(row.id)}
                          onRestore={() =>
                            run(
                              row.id,
                              () => restoreNewsletterSubscriber(row.id),
                              "Suscriptor reactivado.",
                            )
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          disabled={isBusy(row.id)}
                          onClick={() => onArchive(row)}
                          aria-label="Dar de baja"
                          title="Dar de baja"
                          className="text-ink-500 rounded p-1.5 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Archive size={15} aria-hidden />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
