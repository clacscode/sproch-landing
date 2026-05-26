import * as React from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Section({ className, as: Tag = "section", ...props }: SectionProps) {
  return <Tag className={cn("py-16 md:py-24", className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** En secciones oscuras, "dark" ajusta el color del eyebrow/título. */
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
      data-align={align}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em]",
            isDark ? "text-brand-600" : "text-brand-700",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-8",
              isDark ? "bg-brand-500/70" : "bg-brand-600/70",
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.018em] sm:text-4xl md:text-5xl lg:text-[56px]",
          isDark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            isDark ? "text-ink-200" : "text-ink-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
