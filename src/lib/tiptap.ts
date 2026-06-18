import type { JSONContent } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

/**
 * Set de extensiones COMPARTIDO entre el editor del admin (cliente) y el
 * render del sitio público (servidor, vía generateHTML). Mantenerlo único
 * garantiza paridad: lo que se edita es exactamente lo que se renderiza.
 *
 * StarterKit v3 ya incluye Link y Underline, por eso no se agregan aparte.
 */
export const tiptapExtensions = [
  StarterKit.configure({
    link: {
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    },
  }),
  Image.configure({ inline: false, allowBase64: false }),
];

/** Documento TipTap vacío válido (un párrafo). */
export const EMPTY_DOC: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export type RichTextDoc = JSONContent;

/** True si el documento no tiene texto/contenido renderizable. */
export function isEmptyDoc(doc: JSONContent | null | undefined): boolean {
  if (!doc || !doc.content || doc.content.length === 0) return true;
  return !doc.content.some((node) => {
    if (node.type === "image") return true;
    if (node.text && node.text.trim()) return true;
    return Boolean(node.content && node.content.length > 0);
  });
}
