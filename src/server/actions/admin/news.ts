"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { articleSchema, type ArticleInput } from "@/lib/validations/news";
import {
  type ActionError,
  type ActionResult,
  NotAuthorizedError,
  requireAdmin,
} from "@/server/actions/admin/_guard";

function fieldErrorsFromZod(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = slugify(base);
  let candidate = root;
  let n = 2;
  // Busca colisiones excluyendo el propio registro (en edición).
  while (
    await prisma.news.findFirst({
      where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    candidate = `${root}-${n++}`;
  }
  return candidate;
}

function resolvePublishedAt(status: string, publishedAt?: string): Date | null {
  if (publishedAt) return new Date(`${publishedAt}T00:00:00.000Z`);
  return status === "PUBLISHED" ? new Date() : null;
}

function revalidateArticle(type: ArticleInput["type"], slug: string) {
  const base = type === "PATIENT" ? "/pacientes" : "/noticias";
  revalidatePath(base);
  revalidatePath(`${base}/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}

function handleError(err: unknown): ActionError {
  if (err instanceof NotAuthorizedError) return { ok: false, error: "No autorizado" };
  if (err instanceof ZodError)
    return { ok: false, error: "Revisa los campos marcados", fieldErrors: fieldErrorsFromZod(err) };
  console.error("[admin/news]", err);
  return { ok: false, error: "Ocurrió un error al guardar. Intenta nuevamente." };
}

export async function createArticle(input: ArticleInput): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = articleSchema.parse(input);
    const slug = await uniqueSlug(data.slug || data.title);
    const created = await prisma.news.create({
      data: {
        type: data.type,
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content as Prisma.InputJsonValue,
        coverImage: data.coverImage || null,
        status: data.status,
        publishedAt: resolvePublishedAt(data.status, data.publishedAt || undefined),
        tags: data.tags as unknown as Prisma.InputJsonValue,
        authorName: data.authorName || null,
      },
      select: { id: true, slug: true },
    });
    revalidateArticle(data.type, created.slug);
    return { ok: true, id: created.id };
  } catch (err) {
    return handleError(err);
  }
}

export async function updateArticle(
  id: string,
  input: ArticleInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = articleSchema.parse(input);
    const slug = await uniqueSlug(data.slug || data.title, id);
    const updated = await prisma.news.update({
      where: { id },
      data: {
        type: data.type,
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content as Prisma.InputJsonValue,
        coverImage: data.coverImage || null,
        status: data.status,
        publishedAt: resolvePublishedAt(data.status, data.publishedAt || undefined),
        tags: data.tags as unknown as Prisma.InputJsonValue,
        authorName: data.authorName || null,
      },
      select: { id: true, slug: true, type: true },
    });
    revalidateArticle(updated.type === "PATIENT" ? "PATIENT" : "NEWS", updated.slug);
    return { ok: true, id: updated.id };
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Archiva el artículo: sale del sitio público y del listado activo del panel,
 * pero la fila se conserva en la base de datos y se puede restaurar.
 * En este proyecto el contenido autogestionado nunca se borra.
 */
export async function archiveArticle(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const archived = await prisma.news.update({
      where: { id },
      data: { archivedAt: new Date() },
      select: { slug: true, type: true },
    });
    revalidateArticle(archived.type === "PATIENT" ? "PATIENT" : "NEWS", archived.slug);
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

/** Devuelve un artículo archivado al listado activo (conserva su estado de publicación). */
export async function restoreArticle(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const restored = await prisma.news.update({
      where: { id },
      data: { archivedAt: null },
      select: { slug: true, type: true },
    });
    revalidateArticle(restored.type === "PATIENT" ? "PATIENT" : "NEWS", restored.slug);
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function toggleArticlePublish(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const current = await prisma.news.findUnique({
      where: { id },
      select: { status: true, publishedAt: true, slug: true, type: true },
    });
    if (!current) return { ok: false, error: "No encontrado" };
    const nextStatus = current.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await prisma.news.update({
      where: { id },
      data: {
        status: nextStatus,
        publishedAt:
          nextStatus === "PUBLISHED" ? (current.publishedAt ?? new Date()) : current.publishedAt,
      },
    });
    revalidateArticle(current.type === "PATIENT" ? "PATIENT" : "NEWS", current.slug);
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}
