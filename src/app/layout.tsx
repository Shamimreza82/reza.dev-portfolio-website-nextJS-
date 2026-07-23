import { Metadata } from "next";
import Script from "next/script";
import Navber from "@/components/Navber";
import { Footer } from "@/components/homePage/Footer";
import { Toaster } from "sonner";
import LayoutProvider from "@/providers/LayoutProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rezahub.com"),
  title: {
    default: "SHAMIM REZA | Full-Stack Developer (Backend Focused)",
    template: "%s | SHAMIM REZA - Backend Specialist",
  },
  description:
    "Portfolio of SHAMIM REZA, a Full-Stack Developer specializing in Node.js, PostgreSQL, and AI-powered backend systems.",
  keywords: [
    "Full-Stack Web Developer Bangladesh",
    "Backend Specialist",
    "Node.js Developer",
    "PostgreSQL Expert",
    "AI Integration Developer",
    "SaaS Architect",
  ],
  alternates: {
    canonical: "https://rezahub.com/",
  },
  openGraph: {
    type: "website",
    url: "https://rezahub.com/",
    title: "SHAMIM REZA - Full-Stack Developer Portfolio",
    description: "Backend-focused developer specializing in scalable architectures and AI automation.",
    images: ["https://rezahub.com/rezahub.png"],
    siteName: "rezahub",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAMIM REZA - Backend Specialist",
    description: "Hire me to build scalable, high-performance backend systems.",
    images: ["https://rezahub.com/rezahub.png"],
  },
  category: "technology",
  authors: [{ name: "SHAMIM REZA", url: "https://rezahub.com" }],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Navber />
          <LayoutProvider><main id="main-content">{children}</main></LayoutProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
