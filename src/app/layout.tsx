
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
import Navber from "@/components/Navber";
import { Toaster } from "sonner";
import { Footer } from "@/components/homePage/Footer";
import { MusicProvider } from "@/providers/MusicProvider";
import ClickSoundProvider from "@/providers/ClickSoundProvider";

import { Metadata } from "next";
import Script from "next/script";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/seo/schema/person";
import { webSiteSchema } from "@/lib/seo/schema/website";
import { faqSchema } from "@/lib/seo/schema/faq";

export const metadata: Metadata = {
  metadataBase: new URL("https://rezahub.com"),
  title: {
    default: "Reza | Full-Stack Web Developer (Next.js, React, Node.js)",
    template: "%s | Reza — Full-Stack Developer",
  },
  description:
    "Hire Reza, a full-stack web developer specializing in Next.js, React, Node.js & APIs. I build fast, SEO-friendly apps that convert.",
  keywords: [
    "Full-Stack Web Developer Bangladesh",
    "Next.js Developer",
    "React Developer",
    "Node.js API Developer",
    "Freelance Web Developer",
    "Hire Web Developer",
  ],
  alternates: {
    canonical: "https://rezahub.com/",
    languages: { "en": "/", "bn": "/bn" }, // if you add Bangla later
  },
  openGraph: {
    type: "website",
    url: "https://rezahub.com/",
    title: "Reza — Full-Stack Developer Portfolio",
    description:
      "Next.js, React & Node.js specialist. High-performance web apps for startups & SMBs.",
    images: ["https://rezahub.com/rezahub.png"], // put this in /public
    siteName: "rezahub",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza — Full-Stack Developer",
    description:
      "Hire me to build scalable, SEO-friendly web apps (Next.js, React, Node).",
    images: ["https://rezahub.com/og-image.png"],
  },
  category: "technology",
  authors: [{ name: "Reza", url: "https://rezahub.com" }],
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-Roboto">
        <MusicProvider>
          <AuthProvider>
            <Navber />
            <ClickSoundProvider />
            {children}
            {/* Google Analytics */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-NE4D2QJFXX" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NE4D2QJFXX');
              `}
            </Script>

            <JsonLd id="person-schema" data={personSchema()} />
            <JsonLd id="website-schema" data={webSiteSchema()} />
            {/* Global FAQ (optional). Prefer one FAQ per page. */}
            <JsonLd
              id="faq-schema"
              data={faqSchema([
                {
                  q: "What services do you provide as a Full-Stack Developer?",
                  a: "I build modern web applications using Next.js, React, Node.js, and PostgreSQL. Services include SEO-friendly Next.js apps, React frontends, Node.js APIs, auth, and custom dashboards.",
                },
                {
                  q: "How much does a project cost?",
                  a: "Depends on scope and complexity. I offer a free consultation and a clear estimate before starting.",
                },
                {
                  q: "Why should I hire you?",
                  a: "I deliver end-to-end solutions (frontend + backend) optimized for speed, SEO, and scalability—ideal for startups and SMEs.",
                },
              ])}
            />
            <Toaster />
            <Footer />
          </AuthProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
