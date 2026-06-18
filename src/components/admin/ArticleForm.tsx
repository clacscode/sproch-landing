"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  type FieldErrors,
  type Resolver,
  useForm,
} from "react-hook-form";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, Select, TagsInput } from "@/components/admin/form-bits";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useConfirm, useToast } from "@/components/admin/feedback";
import { scrollToFirstError } from "@/lib/form-utils";
import { useUnsavedChanges } from "@/lib/use-unsaved-changes";
import { EMPTY_DOC } from "@/lib/tiptap";
import { articleSchema } from "@/lib/validations/news";
import { createArticle, updateArticle } from "@/server/actions/admin/news";

export interface ArticleFormValues {
  type: "NEWS" | "PATIENT";
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  tags: string[];
  authorName: string;
}

interface ArticleFormProps {
  type: "NEWS" | "PATIENT";
  mode: "create" | "edit";
  id?: string;
  initial?: ArticleFormValues;
}

const NOUN = { NEWS: "noticia", PATIENT: "artículo" } as const;

export function ArticleForm({ type, mode, id, initial }: ArticleFormProps) {
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const listPath = type === "PATIENT" ? "/admin/pacientes" : "/admin/noticias";

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema) as unknown as Resolver<ArticleFormValues>,
    defaultValues:
      initial ??
      ({
        type,
        title: "",
        slug: "",
        excerpt: "",
        content: EMPTY_DOC,
        coverImage: "",
        status: "DRAFT",
        publishedAt: "",
        tags: [],
        authorName: "",
      } satisfies ArticleFormValues),
  });

  useUnsavedChanges(isDirty && !isSubmitting);

  async function onSubmit(values: ArticleFormValues) {
    setServerError(null);
    const res =
      mode === "edit" && id ? await updateArticle(id, values) : await createArticle(values);
    if (res.ok) {
      toast.success(mode === "edit" ? "Cambios guardados." : "Creado correctamente.");
      router.push(listPath);
      router.refresh();
      return;
    }
    setServerError(res.error);
    if (res.fieldErrors) {
      for (const [key, message] of Object.entries(res.fieldErrors)) {
        setError(key as keyof ArticleFormValues, { message });
      }
      scrollToFirstError(res.fieldErrors);
    } else {
      toast.error(res.error);
    }
  }

  function onInvalid(formErrors: FieldErrors<ArticleFormValues>) {
    toast.error("Revisa los campos marcados en rojo.");
    scrollToFirstError(formErrors);
  }

  async function onCancel() {
    if (isDirty) {
      const ok = await confirm({
        title: "¿Descartar los cambios?",
        description: "Tienes cambios sin guardar que se perderán.",
        confirmLabel: "Descartar",
        cancelLabel: "Seguir editando",
        danger: true,
      });
      if (!ok) return;
    }
    router.push(listPath);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-8">
      <input type="hidden" {...register("type")} />

      {serverError && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} aria-hidden />
          {serverError}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Columna principal */}
        <div className="space-y-6 lg:col-span-2">
          <Field label="Título" htmlFor="title" required error={errors.title?.message}>
            <Input id="title" {...register("title")} placeholder={`Título de la ${NOUN[type]}`} />
          </Field>

          <Field
            label="Resumen"
            htmlFor="excerpt"
            required
            error={errors.excerpt?.message}
            hint="Texto corto que se muestra en las tarjetas y como bajada."
          >
            <Textarea id="excerpt" rows={3} {...register("excerpt")} />
          </Field>

          <Field label="Contenido" required error={errors.content?.message as string | undefined}>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </Field>
        </div>

        {/* Barra lateral */}
        <div className="space-y-6">
          <div className="space-y-6 rounded-lg border border-ink-200 bg-white p-5">
            <Field label="Estado" htmlFor="status" error={errors.status?.message}>
              <Select id="status" {...register("status")}>
                <option value="DRAFT">Borrador</option>
                <option value="PUBLISHED">Publicado</option>
              </Select>
            </Field>

            <Field
              label="Fecha de publicación"
              htmlFor="publishedAt"
              error={errors.publishedAt?.message}
              hint="Si se deja vacío al publicar, se usa la fecha de hoy."
            >
              <Input id="publishedAt" type="date" {...register("publishedAt")} />
            </Field>

            <Field
              label="Slug (URL)"
              htmlFor="slug"
              error={errors.slug?.message}
              hint="Opcional. Se genera automáticamente desde el título."
            >
              <Input id="slug" {...register("slug")} placeholder="se-genera-solo" />
            </Field>

            <Field label="Autor" htmlFor="authorName" error={errors.authorName?.message}>
              <Input id="authorName" {...register("authorName")} placeholder="Equipo SPROCh" />
            </Field>
          </div>

          <div className="space-y-6 rounded-lg border border-ink-200 bg-white p-5">
            <Field label="Imagen de portada" error={errors.coverImage?.message}>
              <Controller
                control={control}
                name="coverImage"
                render={({ field }) => (
                  <ImageUploadField value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>

            <Field label="Etiquetas" error={errors.tags?.message as string | undefined}>
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <TagsInput value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-ink-200 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden />}
          {isSubmitting
            ? "Guardando…"
            : mode === "edit"
              ? "Guardar cambios"
              : "Crear"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
