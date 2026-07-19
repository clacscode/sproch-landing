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

/** Listado de artículos para el panel (incluye borradores). */
export async function adminListArticles(type: ArticleType): Promise<News[]> {
  return prisma.news.findMany({
    where: { type },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function adminGetArticle(id: string): Promise<News | null> {
  return prisma.news.findUnique({ where: { id } });
}

/** Listado de eventos para el panel (incluye borradores y cancelados). */
export async function adminListEvents(): Promise<Event[]> {
  return prisma.event.findMany({ orderBy: { startDate: "desc" } });
}

export async function adminGetEvent(id: string): Promise<Event | null> {
  return prisma.event.findUnique({ where: { id } });
}

/** Conteos para el dashboard. */
export async function adminCounts() {
  const [newsTotal, newsPublished, patientsTotal, patientsPublished, eventsTotal, eventsPublished] =
    await Promise.all([
      prisma.news.count({ where: { type: "NEWS" } }),
      prisma.news.count({ where: { type: "NEWS", status: "PUBLISHED" } }),
      prisma.news.count({ where: { type: "PATIENT" } }),
      prisma.news.count({ where: { type: "PATIENT", status: "PUBLISHED" } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: "PUBLISHED" } }),
    ]);
  return {
    news: { total: newsTotal, published: newsPublished },
    patients: { total: patientsTotal, published: patientsPublished },
    events: { total: eventsTotal, published: eventsPublished },
  };
}

/** Mensajes del formulario de contacto (los pendientes primero). */
export async function adminListContactMessages(): Promise<ContactMessage[]> {
  return prisma.contactMessage.findMany({
    orderBy: [{ resolved: "asc" }, { createdAt: "desc" }],
  });
}

/** Solicitudes de incorporación como socio (las pendientes primero). */
export async function adminListMembershipApplications(): Promise<MembershipApplication[]> {
  return prisma.membershipApplication.findMany({
    orderBy: [{ resolved: "asc" }, { createdAt: "desc" }],
  });
}

export async function adminListNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
}

/** Conteos para las pestañas de /admin/mensajes y el dashboard. */
export async function adminMessageCounts() {
  const [contactTotal, contactPending, membershipTotal, membershipPending, subscribers] =
    await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { resolved: false } }),
      prisma.membershipApplication.count(),
      prisma.membershipApplication.count({ where: { resolved: false } }),
      prisma.newsletterSubscriber.count(),
    ]);
  return {
    contact: { total: contactTotal, pending: contactPending },
    membership: { total: membershipTotal, pending: membershipPending },
    subscribers,
  };
}
