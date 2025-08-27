"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Twitter, Linkedin, Github, Codepen, Dribbble } from "lucide-react";

type Item = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const ITEMS: Item[] = [
  { href: "https://twitter.com/yourhandle", label: "Twitter / X", Icon: Twitter },
  { href: "https://www.linkedin.com/in/yourprofile", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/yourname", label: "GitHub", Icon: Github },
  { href: "https://codepen.io/yourname", label: "CodePen", Icon: Codepen },
  { href: "https://dribbble.com/yourname", label: "Dribbble", Icon: Dribbble },
];

export default function RightSocialRail({
  className,
  items = ITEMS,
}: {
  className?: string;
  items?: Item[];
}) {
  return (
    <TooltipProvider delayDuration={80}>
      <nav
        aria-label="Social links"
        className={cn(
          // layout / position
          "pointer-events-auto fixed right-4 top-1/2 -translate-y-1/2 z-40",
          // hide on very small screens (show >= md)
          "hidden md:block",
          className
        )}
      >
        <ul
          className={cn(
            "flex flex-col items-center gap-5",
            // container style
            "rounded-2xl border border-white/10 bg-black/20 backdrop-blur",
            "p-3 shadow-xl shadow-black/20"
          )}
        >
          {/* small top accent arrow/marker */}
          <li aria-hidden className="mb-1">
            <span className="block h-2 w-2 rotate-45 rounded-[2px] bg-cyan-300/80" />
          </li>

          {items.map(({ href, label, Icon }) => (
            <li key={href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={cn(
                      "group grid h-11 w-11 place-items-center",
                      "rounded-xl border border-white/10",
                      "bg-neutral-900/60 hover:bg-neutral-900",
                      "outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-neutral-950",
                      "transition-all"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        "text-neutral-400 group-hover:text-white",
                        "transition-colors"
                      )}
                      strokeWidth={1.75}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="left" className="px-2 py-1 text-xs">
                  {label}
                </TooltipContent>
              </Tooltip>
            </li>
          ))}

          {/* small bottom accent circle */}
          <li aria-hidden className="mt-1">
            <span className="block h-3 w-3 rounded-full border border-cyan-300/70" />
          </li>
        </ul>
      </nav>
    </TooltipProvider>
  );
}
