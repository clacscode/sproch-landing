import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarDays,
  ExternalLink,
  HeartPulse,
  Inbox,
  Newspaper,
  Plus,
} from "lucide-react";
import { adminCounts, adminMessageCounts } from "@/server/queries/admin";

export const dynamic = "force-dynamic";

const cards = [
  {
    key: "news" as const,
    label: "Noticias",
    icon: Newspaper,
    href: "/admin/noticias",
    newHref: "/admin/noticias/nueva",
  },
  {
    key: "patients" as const,
    label: "Pacientes",
    icon: HeartPulse,
    href: "/admin/pacientes",
    newHref: "/admin/pacientes/nueva",
  },
  {
    key: "events" as const,
    label: "Cursos y congresos",
    icon: CalendarDays,
    href: "/admin/eventos",
    newHref: "/admin/eventos/nuevo",
  },
];

export default async function DashboardPage() {
  const [counts, messages] = await Promise.all([adminCounts(), adminMessageCounts()]);
  const messagesPending = messages.contact.pending + messages.membership.pending;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Panel</h1>
          <p className="mt-1 text-sm text-ink-500">Gestiona el contenido publicado en el sitio.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
        >
          <ExternalLink size={15} aria-hidden />
          Ver sitio
        </a>
      </div>

      {messagesPending > 0 && (
        <div
          role="status"
          className="flex flex-wrap items-center gap-4 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <BellRing size={18} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink-900">
              Tienes {messagesPending} {messagesPending === 1 ? "mensaje" : "mensajes"} por atender
            </p>
            <p className="text-sm text-ink-600">
              {[
                messages.contact.pending > 0 &&
                  `${messages.contact.pending} de contacto`,
                messages.membership.pending > 0 &&
                  `${messages.membership.pending} ${
                    messages.membership.pending === 1
                      ? "solicitud de socio"
                      : "solicitudes de socio"
                  }`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <Link
            href="/admin/mensajes"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Ver mensajes
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          const data = counts[card.key];
          return (
            <div
              key={card.key}
              className="flex flex-col rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon size={20} aria-hidden />
                </span>
                <h2 className="font-medium text-ink-900">{card.label}</h2>
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-ink-900">{data.published}</span>
                <span className="text-sm text-ink-500">publicados · {data.total} en total</span>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-4">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Gestionar
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
                <Link
                  href={card.newHref}
                  className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900"
                >
                  <Plus size={14} aria-hidden />
                  Nuevo
                </Link>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col rounded-xl border border-ink-200 bg-white p-6 shadow-card transition-shadow hover:shadow-lift">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <Inbox size={20} aria-hidden />
            </span>
            <h2 className="font-medium text-ink-900">Mensajes</h2>
          </div>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-4xl text-ink-900">{messagesPending}</span>
            <span className="text-sm text-ink-500">
              por atender · {messages.subscribers} suscriptores
            </span>
          </div>
          <div className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-4">
            <Link
              href="/admin/mensajes"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Gestionar
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
