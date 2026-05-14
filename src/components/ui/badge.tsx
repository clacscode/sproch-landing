import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
  {
    variants: {
      variant: {
        brand: "bg-brand-600/10 text-brand-700",
        neutral: "bg-ink-100 text-ink-700",
        dark: "bg-ink-900 text-white",
        outline: "border border-ink-200 text-ink-700",
        success: "bg-emerald-50 text-emerald-700",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
