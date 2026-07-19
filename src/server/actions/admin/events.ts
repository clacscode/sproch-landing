"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { eventSchema, type EventInput } from "@/lib/validations/event";
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
  while (
    await prisma.event.findFirst({
      where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    })
  ) {
    candidate = `${root}-${n++}`;
  }
  return candidate;
}

function toUTCDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function handleError(err: unknown): ActionError {
  if (err instanceof NotAuthorizedError) return { ok: false, error: "No autorizado" };
  if (err instanceof ZodError)
    return { ok: false, error: "Revisa los campos marcados", fieldErrors: fieldErrorsFromZod(err) };
  console.error("[admin/events]", err);
  return { ok: false, error: "Ocurrió un error al guardar. Intenta nuevamente." };
}

/** Normaliza los datos validados a las columnas del modelo Event. */
function toEventData(data: EventInput) {
  return {
    title: data.title,
    summary: data.summary,
    content: data.content as Prisma.InputJsonValue,
    startDate: toUTCDate(data.startDate),
    endDate: toUTCDate(data.endDate),
    location: data.location,
    coverImage: data.coverImage || null,
    capacity: data.capacity ?? null,
    priceCLP: data.priceCLP,
    priceFrom: data.priceFrom,
    hidePrice: data.hidePrice,
    registrationUrl: data.registrationUrl || null,
    featured: data.featured,
    aboutEyebrow: data.aboutEyebrow?.trim() || null,
    aboutTitle: data.aboutTitle?.trim() || null,
    speakers: data.speakers as unknown as Prisma.InputJsonValue,
    sponsors: data.sponsors as unknown as Prisma.InputJsonValue,
    program: data.program as unknown as Prisma.InputJsonValue,
    category: data.category,
    status: data.status,
  };
}

function revalidateEvent(slug: string) {
  revalidatePath("/eventos");
  revalidatePath(`/eventos/${slug}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}

export async function createEvent(input: EventInput): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = eventSchema.parse(input);
    const slug = await uniqueSlug(data.slug || data.title);
    const created = await prisma.event.create({
      data: { slug, ...toEventData(data) },
      select: { id: true, slug: true },
    });
    revalidateEvent(created.slug);
    return { ok: true, id: created.id };
  } catch (err) {
    return handleError(err);
  }
}

export async function updateEvent(
  id: string,
  input: EventInput,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = eventSchema.parse(input);
    const slug = await uniqueSlug(data.slug || data.title, id);
    const updated = await prisma.event.update({
      where: { id },
      data: { slug, ...toEventData(data) },
      select: { id: true, slug: true },
    });
    revalidateEvent(updated.slug);
    return { ok: true, id: updated.id };
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const deleted = await prisma.event.delete({ where: { id }, select: { slug: true } });
    revalidateEvent(deleted.slug);
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function toggleEventPublish(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const current = await prisma.event.findUnique({
      where: { id },
      select: { status: true, slug: true },
    });
    if (!current) return { ok: false, error: "No encontrado" };
    const nextStatus = current.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await prisma.event.update({ where: { id }, data: { status: nextStatus } });
    revalidateEvent(current.slug);
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}
