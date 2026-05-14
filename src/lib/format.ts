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

export function formatDate(value: string | Date): string {
  return dateFormatter.format(new Date(value));
}

export function formatShortDate(value: string | Date): string {
  return shortDateFormatter.format(new Date(value));
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const s = new Date(start);
  const e = new Date(end);
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
