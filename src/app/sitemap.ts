import type { MetadataRoute } from "next";

export const runtime = "nodejs";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nextjs-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/react-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nodejs-api-development", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/web-services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/free-logo-maker", changeFrequency: "monthly", priority: 0.5 },
  { path: "/services-ditiles/web-development", changeFrequency: "monthly", priority: 0.7 },
  { path: "/react-development", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((item) => ({
    url: `${BASE}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  return [...staticEntries];
}
