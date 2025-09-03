import { SITE_URL, PERSON } from "@/lib/config";

export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${PERSON.name} — ${PERSON.jobTitle}`,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
