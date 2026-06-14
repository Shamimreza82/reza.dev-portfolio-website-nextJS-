"use client";

import dynamic from "next/dynamic";

const GitHubStatus = dynamic(() => import("@/components/homePage/GitHubStatus"), {
  ssr: false,
  loading: () => (
    <section className="py-24 px-6 bg-background/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 animate-pulse rounded-full bg-muted-foreground/20" />
      </div>
    </section>
  ),
});

const AiAssistant = dynamic(() => import("@/components/homePage/assistent/AiAssistant"), {
  ssr: false,
});

export default function DynamicSections() {
  return (
    <>
      <GitHubStatus />
      <AiAssistant />
    </>
  );
}
