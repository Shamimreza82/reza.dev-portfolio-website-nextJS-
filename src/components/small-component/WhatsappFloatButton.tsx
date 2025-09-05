"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn helper
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  phone: string; // e.g. "8801531297879"
  message?: string; // preset message (optional)
  position?: "fixed" | "absolute";
  className?: string;
  ariaLabel?: string;
};

export default function WhatsAppFloat({
  phone,
  message,
  position = "fixed",
  className,
  ariaLabel = "Chat on WhatsApp",
}: Props) {
  const href = React.useMemo(() => {
    const base = `https://wa.me/${phone}`;
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message)}`;
  }, [phone, message]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={cn(
              position === "fixed" ? "fixed" : "absolute",
              // ✅ Safe-area padding + LEFT alignment
              "bottom-[calc(env(safe-area-inset-bottom,0)+16px)] left-[calc(env(safe-area-inset-left,0)+16px)]",
              // ✅ On md+ screens, use normal spacing
              "md:bottom-5 md:left-5",
              // Look & feel
              "z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg",
              "transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]",
              // subtle pulse ring
              "after:absolute after:inset-0 after:rounded-full after:content-[''] motion-safe:after:animate-[ping_2s_ease-in-out_infinite] after:bg-[#25D366]/30",
              className
            )}
          >
            {/* WhatsApp SVG */}
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="h-7 w-7"
              fill="currentColor"
            >
              <path d="M19.11 17.2c-.27-.14-1.6-.8-1.85-.89-.25-.09-.43-.14-.62.14-.19.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.28 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.95 4.68 4.03 2.75 1.08 2.75.72 3.25.67.5-.05 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
              <path d="M26.63 5.36A12.62 12.62 0 0 0 16.06 2C8.83 2 3 7.83 3 15.06c0 2.3.62 4.47 1.7 6.33L3 30l8.8-1.63A13 13 0 0 0 16.06 28C23.29 28 29.12 22.17 29.12 14.94a12.62 12.62 0 0 0-2.49-9.58zM16.06 26.14c-2.04 0-3.94-.61-5.52-1.64l-.39-.25-5.2.96.99-5.07-.26-.41a10.9 10.9 0 0 1-1.62-5.67c0-6 4.87-10.88 10.99-10.88 2.94 0 5.71 1.15 7.78 3.23a10.86 10.86 0 0 1 3.21 7.65c0 6.01-4.87 10.88-10.98 10.88z" />
            </svg>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-foreground text-background">
          WhatsApp
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
