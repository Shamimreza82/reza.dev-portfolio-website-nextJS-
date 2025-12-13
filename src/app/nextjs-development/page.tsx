import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Next.js Development Services | Reza — Full-Stack Developer",
  description:
    "SEO-optimized, fast Next.js apps with SSR/SSG, API integrations, dashboards, and auth.",
  alternates: { canonical: "/nextjs-development" },
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Next.js Development Services.</h1>
      <p className="mt-4">
        I build SEO-friendly, high-performance Next.js applications for startups and businesses.
      </p>

    </main>
  );
}
