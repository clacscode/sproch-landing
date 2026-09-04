"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  type ActionError,
  type ActionResult,
  NotAuthorizedError,
  requireAdmin,
} from "@/server/actions/admin/_guard";

function handleError(err: unknown): ActionError {
  if (err instanceof NotAuthorizedError) return { ok: false, error: "No autorizado" };
  console.error("[admin/messages]", err);
  return { ok: false, error: "Ocurrió un error. Intenta nuevamente." };
}

function refresh() {
  revalidatePath("/admin/mensajes");
  revalidatePath("/admin");
}

export async function toggleContactResolved(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const row = await prisma.contactMessage.findUnique({
      where: { id },
      select: { resolved: true },
    });
    if (!row) return { ok: false, error: "El mensaje ya no existe" };
    const resolved = !row.resolved;
    await prisma.contactMessage.update({
      where: { id },
      data: { resolved, resolvedAt: resolved ? new Date() : null },
    });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Archiva el mensaje: desaparece de la bandeja activa pero la fila se conserva.
 * En este proyecto nada de lo que llega por los formularios se borra.
 */
export async function archiveContactMessage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.contactMessage.update({ where: { id }, data: { archivedAt: new Date() } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function restoreContactMessage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.contactMessage.update({ where: { id }, data: { archivedAt: null } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function toggleMembershipResolved(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    const row = await prisma.membershipApplication.findUnique({
      where: { id },
      select: { resolved: true },
    });
    if (!row) return { ok: false, error: "La solicitud ya no existe" };
    const resolved = !row.resolved;
    await prisma.membershipApplication.update({
      where: { id },
      data: { resolved, resolvedAt: resolved ? new Date() : null },
    });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

/** Archiva la solicitud conservando todos los antecedentes en la base de datos. */
export async function archiveMembershipApplication(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.membershipApplication.update({ where: { id }, data: { archivedAt: new Date() } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function restoreMembershipApplication(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.membershipApplication.update({ where: { id }, data: { archivedAt: null } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

/**
 * Da de baja al suscriptor sin borrar la fila (queda el registro de que estuvo
 * suscrito y de cuándo se dio de baja). Si vuelve a suscribirse, se reactiva.
 */
export async function archiveNewsletterSubscriber(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.newsletterSubscriber.update({ where: { id }, data: { archivedAt: new Date() } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function restoreNewsletterSubscriber(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.newsletterSubscriber.update({ where: { id }, data: { archivedAt: null } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}
