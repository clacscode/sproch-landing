import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarDays,
  CreditCard,
  ExternalLink,
  HeartPulse,
  Inbox,
  Newspaper,
  Plus,
} from "lucide-react";
import { adminCounts, adminMessageCounts } from "@/server/queries/admin";
import { getSiteSettings } from "@/server/queries/settings";
import { DEFAULT_PAYMENT_LABEL } from "@/lib/validations/settings";

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

/** Dominio del link de pago, para mostrarlo corto en la tarjeta del panel. */
function linkHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default async function DashboardPage() {
  const [counts, messages, settings] = await Promise.all([
    adminCounts(),
    adminMessageCounts(),
    getSiteSettings(),
  ]);
  const messagesPending = messages.contact.pending + messages.membership.pending;
  const paymentLive = settings.paymentEnabled && settings.paymentUrl !== "";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-ink-900 text-3xl tracking-tight uppercase">Panel</h1>
          <p className="text-ink-500 mt-1 text-sm">Gestiona el contenido publicado en el sitio.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-600 hover:text-ink-900 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ExternalLink size={15} aria-hidden />
          Ver sitio
        </a>
      </div>

      {messagesPending > 0 && (
        <div
          role="status"
          className="border-brand-200 bg-brand-50 flex flex-wrap items-center gap-4 rounded-xl border px-5 py-4"
        >
          <span className="bg-brand-600 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
            <BellRing size={18} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-ink-900 font-semibold">
              Tienes {messagesPending} {messagesPending === 1 ? "mensaje" : "mensajes"} por atender
            </p>
            <p className="text-ink-600 text-sm">
              {[
                messages.contact.pending > 0 && `${messages.contact.pending} de contacto`,
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
            className="bg-brand-600 hover:bg-brand-700 inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
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
              className="border-ink-200 shadow-card hover:shadow-lift flex flex-col rounded-xl border bg-white p-6 transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="bg-brand-50 text-brand-700 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon size={20} aria-hidden />
                </span>
                <h2 className="text-ink-900 font-medium">{card.label}</h2>
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-ink-900 text-4xl">{data.published}</span>
                <span className="text-ink-500 text-sm">publicados · {data.total} en total</span>
              </div>
              <div className="border-ink-100 mt-6 flex items-center gap-3 border-t pt-4">
                <Link
                  href={card.href}
                  className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 text-sm font-semibold"
                >
                  Gestionar
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
                <Link
                  href={card.newHref}
                  className="text-ink-600 hover:text-ink-900 ml-auto inline-flex items-center gap-1 text-sm font-medium"
                >
                  <Plus size={14} aria-hidden />
                  Nuevo
                </Link>
              </div>
            </div>
          );
        })}

        <div className="border-ink-200 shadow-card hover:shadow-lift flex flex-col rounded-xl border bg-white p-6 transition-shadow">
          <div className="flex items-center gap-3">
            <span className="bg-brand-50 text-brand-700 inline-flex h-10 w-10 items-center justify-center rounded-lg">
              <Inbox size={20} aria-hidden />
            </span>
            <h2 className="text-ink-900 font-medium">Mensajes</h2>
          </div>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-ink-900 text-4xl">{messagesPending}</span>
            <span className="text-ink-500 text-sm">
              por atender · {messages.subscribers} suscriptores
            </span>
          </div>
          <div className="border-ink-100 mt-6 flex items-center gap-3 border-t pt-4">
            <Link
              href="/admin/mensajes"
              className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 text-sm font-semibold"
            >
              Gestionar
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="border-ink-200 shadow-card hover:shadow-lift flex flex-col rounded-xl border bg-white p-6 transition-shadow">
          <div className="flex items-center gap-3">
            <span className="bg-brand-50 text-brand-700 inline-flex h-10 w-10 items-center justify-center rounded-lg">
              <CreditCard size={20} aria-hidden />
            </span>
            <h2 className="text-ink-900 font-medium">
              {settings.paymentLabel || DEFAULT_PAYMENT_LABEL}
            </h2>
          </div>
          <div className="mt-5 flex flex-wrap items-baseline gap-2">
            <span
              className={
                paymentLive
                  ? "inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-sm font-semibold text-green-700"
                  : "bg-ink-100 text-ink-600 inline-flex rounded-full px-2.5 py-0.5 text-sm font-semibold"
              }
            >
              {paymentLive ? "Visible en el sitio" : "Oculto"}
            </span>
            <span className="text-ink-500 truncate text-sm">
              {settings.paymentUrl ? linkHost(settings.paymentUrl) : "sin link configurado"}
            </span>
          </div>
          <div className="border-ink-100 mt-6 flex items-center gap-3 border-t pt-4">
            <Link
              href="/admin/configuracion"
              className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 text-sm font-semibold"
            >
              Configurar
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
