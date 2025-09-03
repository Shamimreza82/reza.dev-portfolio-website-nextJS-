import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema/service";
import { breadcrumbsSchema } from "@/lib/seo/schema/breadcrumbs";

export const metadata: Metadata = {
  title: "React Development Services | Reza — Full-Stack Developer",
  description:
    "Modern React development services: scalable, responsive, and user-friendly frontends. Built with React, TypeScript, Tailwind CSS, and Next.js.",
  alternates: { canonical: "/react-development" },
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">React Development Services</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        I create **dynamic, responsive, and user-friendly frontends** with React. 
        Using modern tools like TypeScript, Tailwind CSS, and Next.js, I deliver 
        applications that look great and perform fast on any device.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">What I Offer</h2>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Component-driven development with React + TypeScript</li>
          <li>Responsive, mobile-first designs with Tailwind CSS</li>
          <li>Integration with REST & GraphQL APIs</li>
          <li>Optimized performance and SEO best practices</li>
          <li>Reusable UI components for scalability</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Featured Work</h2>
        <p className="mt-2">
          Built a financial dashboard with React and Next.js, enabling 10,000+ users 
          to manage accounts with real-time updates.
        </p>
      </section>

      <a
        href="/contact"
        className="mt-10 inline-block rounded-full px-6 py-3 bg-green-500 text-white font-medium"
      >
        Book a Free Consultation
      </a>

      {/* JSON-LD */}
      <JsonLd
        id="service-react"
        data={serviceSchema({
          serviceType: "React Development",
          pagePath: "/react-development",
          startingPriceUSD: 800,
        })}
      />
      <JsonLd
        id="breadcrumbs-react"
        data={breadcrumbsSchema([
          { name: "Home", path: "/" },
          { name: "React Development", path: "/react-development" },
        ])}
      />
    </main>
  );
}
