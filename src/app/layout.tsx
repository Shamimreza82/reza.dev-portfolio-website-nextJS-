import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
import Navber from "@/components/Navber";
import { Toaster } from "sonner";
import { Footer } from "@/components/homePage/Footer";
import { MusicProvider } from "@/providers/MusicProvider";
import ClickSoundProvider from "@/providers/ClickSoundProvider";

import { Metadata } from "next";
import Script from "next/script";
import LayoutProvider from "@/providers/LayoutProvider";

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
    languages: { en: "/", bn: "/bn" },
  },
  openGraph: {
    type: "website",
    url: "https://rezahub.com/",
    title: "Reza — Full-Stack Developer Portfolio",
    description:
      "Next.js, React & Node.js specialist. High-performance web apps for startups & SMBs.",
    images: ["https://rezahub.com/rezahub.png"],
    siteName: "rezahub",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza — Full-Stack Developer",
    description:
      "Hire me to build scalable, SEO-friendly web apps (Next.js, React, Node).",
    images: ["httpshttps://rezahub.com/rezahub.png"],
  },
  category: "technology",
  authors: [{ name: "Reza", url: "https://rezahub.com" }],
  other: {
    // Adds AdSense meta verification
    "google-adsense-account": "ca-pub-4704565974989640",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Google AdSense verification script (must be in <head>) */}
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4704565974989640"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NE4D2QJFXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NE4D2QJFXX');
          `}
        </Script>

        {/* ✅ JSON-LD Schemas */}

      </head>

      <body className="antialiased font-Roboto">

        <MusicProvider>
          <AuthProvider>
            <Navber />
            <ClickSoundProvider />
            <LayoutProvider>
              {children}
            </LayoutProvider>
            <Toaster />
            <Footer />
          </AuthProvider>
        </MusicProvider>

    </body>
    </html >
  );
}
