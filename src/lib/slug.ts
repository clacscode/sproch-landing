// Rango Unicode de marcas diacríticas combinantes (acentos) para eliminarlas.
const COMBINING_MARKS = /[̀-ͯ]/g;

/** Genera un slug URL-safe a partir de un texto (sin acentos, en minúsculas). */
export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(COMBINING_MARKS, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "item"
  );
}
