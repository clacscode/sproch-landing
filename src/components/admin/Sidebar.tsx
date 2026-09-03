"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  CalendarDays,
  ExternalLink,
  FileText,
  HeartPulse,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Lock,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

function initials(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.split("@")[0] || "A";
  const parts = source.split(/[\s.]+/).filter(Boolean);
  const letters =
    parts.length >= 2 ? `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}` : source.slice(0, 2);
  return letters.toUpperCase();
}

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  locked?: boolean;
}

const primary: NavItem[] = [
  { label: "Panel", href: "/admin", icon: LayoutDashboard },
  { label: "Noticias", href: "/admin/noticias", icon: Newspaper },
  { label: "Pacientes", href: "/admin/pacientes", icon: HeartPulse },
  { label: "Cursos y congresos", href: "/admin/eventos", icon: CalendarDays },
  { label: "Mensajes", href: "/admin/mensajes", icon: Inbox },
  { label: "Configuración", href: "/admin/configuracion", icon: Settings },
];

const extras: NavItem[] = [
  { label: "Directiva", href: "/admin/directiva", icon: Users },
  { label: "Filiales", href: "/admin/filiales", icon: Users },
  { label: "Auspiciadores", href: "/admin/auspiciadores", icon: ImageIcon },
  { label: "Textos del sitio", href: "/admin/contenido", icon: FileText },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Contador de pendientes (badge rojo). Cap visual en 99+. */
function CountBadge({ count, active }: { count: number; active?: boolean }) {
  if (count <= 0) return null;
  return (
    <span
      aria-label={`${count} pendientes`}
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold tabular-nums",
        active ? "text-brand-700 bg-white" : "bg-brand-600 text-white",
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function NavLink({
  item,
  pathname,
  badge = 0,
}: {
  item: NavItem;
  pathname: string;
  badge?: number;
}) {
  const Icon = item.icon;
  const active = isActive(pathname, item.href);
  const locked = item.locked;
  return (
    <Link
      href={item.href}
      aria-disabled={locked}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
        locked && "opacity-60",
      )}
    >
      <Icon
        size={17}
        aria-hidden
        className={cn(!active && "text-ink-400 group-hover:text-ink-600")}
      />
      <span className="flex-1">{item.label}</span>
      <CountBadge count={badge} active={active} />
      {locked && <Lock size={13} aria-hidden className="text-ink-400" />}
    </Link>
  );
}

export function Sidebar({
  user,
  pendingMessages = 0,
}: {
  user: { name?: string | null; email?: string | null };
  pendingMessages?: number;
}) {
  const pathname = usePathname();
  const extrasEnabled = siteConfig.features.adminExtras;

  return (
    <aside className="border-ink-200 fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-white lg:flex">
      <div className="border-ink-200 flex h-16 items-center gap-2 border-b px-5">
        <span className="font-display text-brand-700 text-xl tracking-tight uppercase">SPROCh</span>
        <span className="text-ink-400 text-xs font-medium tracking-[0.18em] uppercase">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {primary.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            badge={item.href === "/admin/mensajes" ? pendingMessages : 0}
          />
        ))}

        {extrasEnabled && (
          <>
            <p className="text-ink-400 px-3 pt-5 pb-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
              Más módulos
            </p>
            {extras.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </>
        )}
      </nav>

      <div className="border-ink-200 space-y-1 border-t p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-600 hover:bg-ink-100 hover:text-ink-900 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <ExternalLink size={17} aria-hidden className="text-ink-400" />
          Ver sitio
        </a>
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="bg-brand-50 text-brand-700 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
            {initials(user.name, user.email)}
          </span>
          <div className="min-w-0">
            <p className="text-ink-900 truncate text-sm font-medium">
              {user.name ?? "Administrador"}
            </p>
            <p className="text-ink-500 truncate text-xs">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="text-ink-600 hover:bg-ink-100 hover:text-ink-900 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <LogOut size={17} aria-hidden className="text-ink-400" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

/** Barra superior para móvil (el sidebar fijo se oculta bajo lg). */
export function MobileTopbar() {
  return (
    <header className="border-ink-200 sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-white px-4 lg:hidden">
      <Link href="/admin" className="font-display text-brand-700 text-lg tracking-tight uppercase">
        SPROCh <span className="text-ink-400 text-xs">Admin</span>
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="text-ink-600 inline-flex items-center gap-1.5 text-sm"
      >
        <LogOut size={16} aria-hidden />
        Salir
      </button>
    </header>
  );
}

export function MobileNav({ pendingMessages = 0 }: { pendingMessages?: number }) {
  const pathname = usePathname();
  return (
    <nav className="border-ink-200 sticky top-14 z-10 flex gap-1 overflow-x-auto border-b bg-white px-3 py-2 lg:hidden">
      {primary.map((item) => {
        const active = isActive(pathname, item.href);
        const badge = item.href === "/admin/mensajes" ? pendingMessages : 0;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap",
              active ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600",
            )}
          >
            {item.label}
            <CountBadge count={badge} active={active} />
          </Link>
        );
      })}
    </nav>
  );
}
