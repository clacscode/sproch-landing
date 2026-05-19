"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  /** Retraso en ms aplicado por transición */
  delay?: number;
  /** Distancia inicial del fade en px */
  offset?: number;
  /** Cómo entra: arriba, abajo, izquierda, derecha o solo fade */
  from?: "bottom" | "top" | "left" | "right" | "none";
}

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  offset = 24,
  from = "bottom",
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const initialTransform = {
    bottom: `translateY(${offset}px)`,
    top: `translateY(-${offset}px)`,
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    none: "none",
  }[from];

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("transition-all duration-700 ease-out will-change-transform", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialTransform,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
