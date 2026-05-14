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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
      data-align={align}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-600 md:text-lg">{description}</p>
      )}
    </div>
  );
}
