"use client";

/**
 * Lleva el foco/scroll al primer campo con error tras un submit inválido.
 * Busca por `name` y por `id` (algunos controles sólo tienen uno u otro);
 * si no encuentra el elemento, sube al inicio del formulario.
 */
export function scrollToFirstError(errors: Record<string, unknown>) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;

  const el =
    document.querySelector<HTMLElement>(`[name="${firstKey}"]`) ??
    document.getElementById(firstKey);

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // El editor de texto enriquecido no es focusable directamente.
    if (typeof (el as HTMLElement).focus === "function") {
      window.setTimeout(() => (el as HTMLElement).focus({ preventScroll: true }), 300);
    }
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
