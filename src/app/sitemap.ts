import type { MetadataRoute } from "next";
import { listEvents } from "@/server/queries/events";
import { listNews } from "@/server/queries/news";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/noticias`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/eventos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const [news, events] = await Promise.all([listNews(), listEvents()]);

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${base}/noticias/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/eventos/${e.slug}`,
    lastModified: new Date(e.startDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
