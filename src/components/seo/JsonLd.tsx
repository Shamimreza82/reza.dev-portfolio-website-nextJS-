/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";

type JsonLdProps = {
  id: string;
  data: Record<string, any>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(data)}
    </Script>
  );
}
