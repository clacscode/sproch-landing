import { Prisma, PrismaClient } from "@prisma/client";
import { generateJSON } from "@tiptap/html/server";
import bcrypt from "bcryptjs";
import { newsMock } from "../src/data/news";
import { patientsMock } from "../src/data/patients";
import { eventsMock } from "../src/data/events";
import { EMPTY_DOC, tiptapExtensions } from "../src/lib/tiptap";

const prisma = new PrismaClient();

/** "YYYY-MM-DD" → Date a medianoche UTC (consistente con el mapper de lectura). */
function toUTCDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

/** HTML legacy de los mocks → documento TipTap (JSON) para guardar en DB. */
function toDoc(html: string) {
  const trimmed = html.trim();
  if (!trimmed) return EMPTY_DOC;
  try {
    return generateJSON(trimmed, tiptapExtensions);
  } catch {
    return EMPTY_DOC;
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Administrador";
  if (!email || !password) {
    console.warn("[seed] ADMIN_EMAIL/ADMIN_PASSWORD no definidos — se omite el admin.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    create: { email, name, hashedPassword, role: "ADMIN" },
    update: { name, hashedPassword, role: "ADMIN" },
  });
  console.log(`[seed] admin listo: ${email}`);
}

async function seedArticles() {
  const articles = [
    ...newsMock.map((a) => ({ ...a, type: "NEWS" as const })),
    ...patientsMock.map((a) => ({ ...a, type: "PATIENT" as const })),
  ];
  for (const a of articles) {
    const data = {
      type: a.type,
      title: a.title,
      excerpt: a.excerpt,
      content: toDoc(a.content),
      coverImage: a.coverImage || null,
      status: a.status,
      publishedAt: a.publishedAt ? toUTCDate(a.publishedAt) : null,
      tags: a.tags as unknown as Prisma.InputJsonValue,
      authorName: a.authorName ?? null,
    };
    await prisma.news.upsert({
      where: { slug: a.slug },
      create: { slug: a.slug, ...data },
      update: data,
    });
  }
  console.log(`[seed] ${articles.length} artículos (noticias + pacientes)`);
}

async function seedEvents() {
  for (const e of eventsMock) {
    const data = {
      title: e.title,
      summary: e.summary,
      content: toDoc(e.content),
      startDate: toUTCDate(e.startDate),
      endDate: toUTCDate(e.endDate),
      location: e.location,
      coverImage: e.coverImage || null,
      capacity: e.capacity ?? null,
      priceCLP: e.priceCLP,
      priceFrom: e.priceFrom ?? false,
      hidePrice: e.hidePrice ?? false,
      registrationUrl: e.registrationUrl ?? null,
      featured: e.featured ?? false,
      speakers: (e.speakers ?? []) as unknown as Prisma.InputJsonValue,
      sponsors: (e.sponsors ?? []) as unknown as Prisma.InputJsonValue,
      program: (e.program ?? []) as unknown as Prisma.InputJsonValue,
      category: e.category,
      status: e.status,
    };
    await prisma.event.upsert({
      where: { slug: e.slug },
      create: { slug: e.slug, ...data },
      update: data,
    });
  }
  console.log(`[seed] ${eventsMock.length} evento(s)`);
}

async function main() {
  await seedAdmin();
  await seedArticles();
  await seedEvents();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
