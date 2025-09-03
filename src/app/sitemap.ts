import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

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

/**
 * Optional: auto-discover blog posts from a content folder.
 * Put your MD/MDX files in:  content/blog/my-post.mdx (or .md)
 * URL becomes: /blog/my-post
 */
function getBlogEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) return entries;

  const files = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    const abs = path.join(blogDir, file);
    const stat = fs.statSync(abs);

    entries.push({
      url: `${BASE}/blog/${slug}`,
      lastModified: stat.mtime, // file's last modified time
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Map static paths
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((item) => ({
    url: `${BASE}${item.path}`,
    lastModified: now,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // Blog entries (optional; auto-skips if folder not present)
  const blogEntries = getBlogEntries();

  // Combine and return
  return [...staticEntries, ...blogEntries];
}
