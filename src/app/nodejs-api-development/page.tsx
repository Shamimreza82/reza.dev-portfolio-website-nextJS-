import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema/service";
import { breadcrumbsSchema } from "@/lib/seo/schema/breadcrumbs";

export const metadata: Metadata = {
  title: "Node.js & API Development Services | Reza — Full-Stack Developer",
  description:
    "Secure and scalable backend development with Node.js, Express, and PostgreSQL. I build APIs, authentication systems, and custom backends for businesses.",
  alternates: { canonical: "/nodejs-api-development" },
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Node.js & API Development Services</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        I specialize in **backend and API development** using Node.js, Express, 
        and PostgreSQL. From RESTful APIs to authentication systems and complex 
        workflows, I deliver reliable backends that scale.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What I Offer</h2>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>RESTful & GraphQL API design</li>
          <li>Secure authentication & authorization</li>
          <li>Database design with PostgreSQL</li>
          <li>File uploads, payments, and third-party integrations</li>
          <li>Scalable server-side logic for SaaS & fintech platforms</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Featured Work</h2>
        <p className="mt-2">
          Developed the backend for a fintech marketplace, handling thousands of 
          loan applications with secure APIs and real-time dashboards.
        </p>
      </section>

      <a
        href="/contact"
        className="mt-10 inline-block rounded-full px-6 py-3 bg-green-500 text-white font-medium"
      >
        Get Started Today
      </a>

      {/* JSON-LD */}
      <JsonLd
        id="service-nodejs"
        data={serviceSchema({
          serviceType: "Node.js & API Development",
          pagePath: "/nodejs-api-development",
          startingPriceUSD: 1000,
        })}
      />
      <JsonLd
        id="breadcrumbs-nodejs"
        data={breadcrumbsSchema([
          { name: "Home", path: "/" },
          { name: "Node.js & API Development", path: "/nodejs-api-development" },
        ])}
      />
    </main>
  );
}
