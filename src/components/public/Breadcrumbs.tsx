import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  variant?: "light" | "dark";
}

export function Breadcrumbs({ items, variant = "dark" }: BreadcrumbsProps) {
  const isDark = variant === "dark";
  return (
    <nav aria-label="Migas de pan">
      <ol className="flex flex-wrap items-center gap-1 text-xs">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={
                    isDark
                      ? "text-ink-300 transition-colors hover:text-white"
                      : "text-ink-500 transition-colors hover:text-ink-900"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={isDark ? "font-medium text-white" : "font-medium text-ink-900"}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  size={12}
                  aria-hidden
                  className={isDark ? "text-ink-400" : "text-ink-300"}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
