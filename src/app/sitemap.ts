import type { MetadataRoute } from "next";
import { listEvents } from "@/server/queries/events";
import { listNews } from "@/server/queries/news";
import { listPatients } from "@/server/queries/patients";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/noticias`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/eventos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/pacientes`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const [news, events, patients] = await Promise.all([listNews(), listEvents(), listPatients()]);

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${base}/noticias/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const patientRoutes: MetadataRoute.Sitemap = patients.map((p) => ({
    url: `${base}/pacientes/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/eventos/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...patientRoutes, ...eventRoutes];
}
