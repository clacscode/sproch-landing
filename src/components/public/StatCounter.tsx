"use client";

import * as React from "react";

interface StatCounterProps {
  /** Valor textual original (ej "70+", "12+", "100%") — se extrae número y sufijo */
  value: string;
  /** Duración total del conteo en ms */
  durationMs?: number;
}

function parseValue(v: string): { num: number; prefix: string; suffix: string } {
  // Match negativo o positivo seguido de dígitos opcionalmente con .
  const m = v.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { num: 0, prefix: "", suffix: v };
  return { num: Number(m[2]), prefix: m[1] ?? "", suffix: m[3] ?? "" };
}

export function StatCounter({ value, durationMs = 1200 }: StatCounterProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = React.useState(0);
  const parsed = React.useMemo(() => parseValue(value), [value]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      setDisplay(parsed.num);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const animate = (start: number) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(parsed.num * eased);
        if (t < 1) raf = window.requestAnimationFrame(tick);
        else setDisplay(parsed.num);
      };
      raf = window.requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            animate(performance.now());
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parsed.num, durationMs]);

  const rounded = parsed.num % 1 === 0 ? Math.round(display) : display.toFixed(1);

  return (
    <span ref={ref} aria-label={value}>
      {parsed.prefix}
      {rounded}
      {parsed.suffix}
    </span>
  );
}
