import Link from "next/link";
import { ArrowUpRight, CalendarDays, HeartPulse, Newspaper, Plus } from "lucide-react";
import { adminCounts } from "@/server/queries/admin";

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
  const counts = await adminCounts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl uppercase tracking-tight text-ink-900">Panel</h1>
        <p className="mt-1 text-sm text-ink-500">Gestiona el contenido publicado en el sitio.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          const data = counts[card.key];
          return (
            <div
              key={card.key}
              className="flex flex-col rounded-xl border border-ink-200 bg-white p-6"
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
      </div>
    </div>
  );
}
