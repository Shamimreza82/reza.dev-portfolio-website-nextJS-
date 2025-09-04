import type { MetadataRoute } from "next";


// Ensure this runs in a Node runtime (needed for fs)
export const runtime = "nodejs";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Static routes you want in the sitemap */
const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  { path: "",                         changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",                   changeFrequency: "monthly", priority: 0.7 },
  { path: "/services",                changeFrequency: "monthly", priority: 0.8 },
  { path: "/nextjs-development",      changeFrequency: "monthly", priority: 0.8 },
  { path: "/react-development",       changeFrequency: "monthly", priority: 0.8 },
  { path: "/nodejs-api-development",  changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects",                changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",                 changeFrequency: "monthly", priority: 0.7 },
];



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Map static paths
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((item) => ({
    url: `${BASE}${item.path}`,
    lastModified: new Date('2025-09-04'),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Combine and return
  return [...staticEntries];
}
