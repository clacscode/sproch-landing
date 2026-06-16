import "server-only";
import type { JSONContent } from "@tiptap/core";
import { generateHTML, generateJSON } from "@tiptap/html/server";
import { EMPTY_DOC, tiptapExtensions } from "@/lib/tiptap";

/**
 * Convierte un documento TipTap (JSON guardado en DB) a HTML para el render
 * público. Las páginas de detalle inyectan este HTML con dangerouslySetInnerHTML
 * y le aplican estilos tipográficos vía clases del contenedor.
 */
export function richTextToHtml(doc: unknown): string {
  const json = (doc ?? EMPTY_DOC) as JSONContent;
  if (!json || typeof json !== "object" || !("type" in json)) return "";
  try {
    return generateHTML(json, tiptapExtensions);
  } catch {
    return "";
  }
}

/**
 * Convierte HTML (contenido legacy de los mocks) a documento TipTap.
 * Usado por el seed para migrar el contenido existente.
 */
export function htmlToRichText(html: string): JSONContent {
  try {
    return generateJSON(html, tiptapExtensions) as JSONContent;
  } catch {
    return EMPTY_DOC;
  }
}
