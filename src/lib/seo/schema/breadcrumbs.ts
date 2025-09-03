import { SITE_URL } from "@/lib/config";

type Crumb = { name: string; path: string }; // path starts with "/"

export const breadcrumbsSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
});
