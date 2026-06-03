const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "short",
  day: "numeric",
});

const moneyFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/**
 * Parsea fechas "YYYY-MM-DD" como fecha local (calendario), evitando el
 * desfase de un día que produce `new Date("2026-07-30")` al interpretarse
 * como medianoche UTC y renderizarse en zonas horarias detrás de UTC (ej. Chile).
 */
function toDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Date(value);
}

export function formatDate(value: string | Date): string {
  return dateFormatter.format(toDate(value));
}

export function formatShortDate(value: string | Date): string {
  return shortDateFormatter.format(toDate(value));
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = toDate(start);
  const e = toDate(end);
  if (s.toDateString() === e.toDateString()) return formatDate(s);
  const sameYear = s.getFullYear() === e.getFullYear();
  const sameMonth = sameYear && s.getMonth() === e.getMonth();
  if (sameMonth) {
    return `${s.getDate()}–${e.getDate()} de ${dateFormatter
      .formatToParts(e)
      .find((p) => p.type === "month")?.value} ${e.getFullYear()}`;
  }
  return `${formatShortDate(s)} – ${formatDate(e)}`;
}

export function formatCLP(value: number): string {
  return moneyFormatter.format(value);
}

export function formatEventPrice(value: number, opts?: { from?: boolean }): string {
  if (value === 0) return "Sin costo";
  return opts?.from ? `Desde ${formatCLP(value)}` : formatCLP(value);
}
