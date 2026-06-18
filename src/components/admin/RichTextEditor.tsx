"use client";

import * as React from "react";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { tiptapExtensions } from "@/lib/tiptap";
import { uploadImage } from "@/components/admin/ImageUploadField";

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (json: JSONContent) => void;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 disabled:opacity-40",
        active && "bg-brand-50 text-brand-700",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] max-w-none px-4 py-3 text-base leading-relaxed text-ink-800 focus:outline-none [&_a]:text-brand-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_blockquote]:text-ink-600 [&_h2]:mt-5 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-ink-900 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-900 [&_img]:my-3 [&_img]:rounded-md [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  });

  if (!editor) {
    return (
      <div className="rounded-md border border-ink-200 bg-white px-4 py-3 text-sm text-ink-400">
        Cargando editor…
      </div>
    );
  }

  function setLink() {
    const previous = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  async function insertImage(file: File) {
    try {
      const url = await uploadImage(file);
      editor!.chain().focus().setImage({ src: url }).run();
    } catch {
      window.alert("No se pudo subir la imagen");
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-ink-200 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ink-200 bg-ink-50 px-2 py-1.5">
        <ToolbarButton
          label="Negrita"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label="Cursiva"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} aria-hidden />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-200" aria-hidden />
        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label="Título 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={16} aria-hidden />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-200" aria-hidden />
        <ToolbarButton
          label="Lista con viñetas"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label="Cita"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} aria-hidden />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-200" aria-hidden />
        <ToolbarButton label="Enlace" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton label="Imagen" onClick={() => fileRef.current?.click()}>
          <ImagePlus size={16} aria-hidden />
        </ToolbarButton>
        <span className="mx-1 h-5 w-px bg-ink-200" aria-hidden />
        <ToolbarButton
          label="Deshacer"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={16} aria-hidden />
        </ToolbarButton>
        <ToolbarButton
          label="Rehacer"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={16} aria-hidden />
        </ToolbarButton>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void insertImage(file);
          e.target.value = "";
        }}
      />

      <EditorContent editor={editor} />
    </div>
  );
}
