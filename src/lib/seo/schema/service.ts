import { SITE_URL, PERSON } from "@/lib/config";

type ServiceArgs = {
  serviceType: string;          // e.g., "Next.js Development"
  pagePath: string;             // e.g., "/nextjs-development"
  startingPriceUSD?: number;    // optional
  areaServedCountry?: string;   // default: Bangladesh
};

export const serviceSchema = ({
  serviceType,
  pagePath,
  startingPriceUSD,
  areaServedCountry = "Bangladesh",
}: ServiceArgs) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType,
  serviceOutput: "Custom web application",
  provider: {
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: areaServedCountry },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}${pagePath}`,
    priceCurrency: "USD",
    ...(startingPriceUSD ? { price: String(startingPriceUSD) } : {}),
    availability: "https://schema.org/InStock",
  },
});
