import { Metadata } from "next";
import Script from "next/script";
import { AuthProvider } from "@/components/auth-provider";
import Navber from "@/components/Navber";
import { Footer } from "@/components/homePage/Footer";
import { Toaster } from "sonner";
import LayoutProvider from "@/providers/LayoutProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rezahub.com"),
  title: {
    default: "Reza | Full-Stack Web Developer (Next.js, React, Node.js)",
    template: "%s | Reza - Full-Stack Developer",
  },
  description:
    "Hire Reza, a full-stack web developer specializing in Next.js, React, Node.js, and APIs.",
  keywords: [
    "Full-Stack Web Developer Bangladesh",
    "Next.js Developer",
    "React Developer",
    "Node.js API Developer",
    "Freelance Web Developer",
  ],
  alternates: {
    canonical: "https://rezahub.com/",
  },
  openGraph: {
    type: "website",
    url: "https://rezahub.com/",
    title: "Reza - Full-Stack Developer Portfolio",
    description: "Next.js, React, and Node.js specialist for fast web apps.",
    images: ["https://rezahub.com/rezahub.png"],
    siteName: "rezahub",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza - Full-Stack Developer",
    description: "Hire me to build scalable, SEO-friendly web apps.",
    images: ["https://rezahub.com/rezahub.png"],
  },
  category: "technology",
  authors: [{ name: "Reza", url: "https://rezahub.com" }],
  other: {
    "google-adsense-account": "ca-pub-4704565974989640",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased font-Roboto">
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
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4704565974989640"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <AuthProvider>
          <Navber />
          <LayoutProvider>{children}</LayoutProvider>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
