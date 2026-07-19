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
    await prisma.contactMessage.update({ where: { id }, data: { resolved: !row.resolved } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteContactMessage(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.contactMessage.delete({ where: { id } });
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
    await prisma.membershipApplication.update({ where: { id }, data: { resolved: !row.resolved } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteMembershipApplication(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.membershipApplication.delete({ where: { id } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteNewsletterSubscriber(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await prisma.newsletterSubscriber.delete({ where: { id } });
    refresh();
    return { ok: true };
  } catch (err) {
    return handleError(err);
  }
}
