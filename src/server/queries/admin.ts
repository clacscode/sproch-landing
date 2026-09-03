import "server-only";
import type {
  ArticleType,
  ContactMessage,
  Event,
  MembershipApplication,
  News,
  NewsletterSubscriber,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * El contenido autogestionado no se borra: se archiva (`archivedAt`).
 * Por defecto los listados del panel muestran solo lo activo; con
 * `{ archived: true }` devuelven la papelera recuperable.
 */
export interface ArchiveScope {
  archived?: boolean;
}

function archiveWhere(opts?: ArchiveScope) {
  return { archivedAt: opts?.archived ? { not: null } : null };
}

/** Listado de artículos para el panel (incluye borradores). */
export async function adminListArticles(type: ArticleType, opts?: ArchiveScope): Promise<News[]> {
  return prisma.news.findMany({
    where: { type, ...archiveWhere(opts) },
    orderBy: opts?.archived
      ? [{ archivedAt: "desc" }]
      : [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function adminGetArticle(id: string): Promise<News | null> {
  return prisma.news.findUnique({ where: { id } });
}

/** Listado de eventos para el panel (incluye borradores y cancelados). */
export async function adminListEvents(opts?: ArchiveScope): Promise<Event[]> {
  return prisma.event.findMany({
    where: archiveWhere(opts),
    orderBy: opts?.archived ? { archivedAt: "desc" } : { startDate: "desc" },
  });
}

export async function adminGetEvent(id: string): Promise<Event | null> {
  return prisma.event.findUnique({ where: { id } });
}

/** Conteos para el dashboard (sin considerar lo archivado). */
export async function adminCounts() {
  const [newsTotal, newsPublished, patientsTotal, patientsPublished, eventsTotal, eventsPublished] =
    await Promise.all([
      prisma.news.count({ where: { type: "NEWS", archivedAt: null } }),
      prisma.news.count({ where: { type: "NEWS", status: "PUBLISHED", archivedAt: null } }),
      prisma.news.count({ where: { type: "PATIENT", archivedAt: null } }),
      prisma.news.count({ where: { type: "PATIENT", status: "PUBLISHED", archivedAt: null } }),
      prisma.event.count({ where: { archivedAt: null } }),
      prisma.event.count({ where: { status: "PUBLISHED", archivedAt: null } }),
    ]);
  return {
    news: { total: newsTotal, published: newsPublished },
    patients: { total: patientsTotal, published: patientsPublished },
    events: { total: eventsTotal, published: eventsPublished },
  };
}

/** Mensajes del formulario de contacto (los pendientes primero). */
export async function adminListContactMessages(opts?: ArchiveScope): Promise<ContactMessage[]> {
  return prisma.contactMessage.findMany({
    where: archiveWhere(opts),
    orderBy: opts?.archived
      ? [{ archivedAt: "desc" }]
      : [{ resolved: "asc" }, { createdAt: "desc" }],
  });
}

/** Solicitudes de incorporación como socio (las pendientes primero). */
export async function adminListMembershipApplications(
  opts?: ArchiveScope,
): Promise<MembershipApplication[]> {
  return prisma.membershipApplication.findMany({
    where: archiveWhere(opts),
    orderBy: opts?.archived
      ? [{ archivedAt: "desc" }]
      : [{ resolved: "asc" }, { createdAt: "desc" }],
  });
}

export async function adminListNewsletterSubscribers(
  opts?: ArchiveScope,
): Promise<NewsletterSubscriber[]> {
  return prisma.newsletterSubscriber.findMany({
    where: archiveWhere(opts),
    orderBy: opts?.archived ? { archivedAt: "desc" } : { createdAt: "desc" },
  });
}

/** Conteos para las pestañas de /admin/mensajes y el dashboard (sin archivados). */
export async function adminMessageCounts() {
  const [contactTotal, contactPending, membershipTotal, membershipPending, subscribers] =
    await Promise.all([
      prisma.contactMessage.count({ where: { archivedAt: null } }),
      prisma.contactMessage.count({ where: { resolved: false, archivedAt: null } }),
      prisma.membershipApplication.count({ where: { archivedAt: null } }),
      prisma.membershipApplication.count({ where: { resolved: false, archivedAt: null } }),
      prisma.newsletterSubscriber.count({ where: { archivedAt: null } }),
    ]);
  return {
    contact: { total: contactTotal, pending: contactPending },
    membership: { total: membershipTotal, pending: membershipPending },
    subscribers,
  };
}
