/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Enable/disable click sound for this button. Default: true */
  sound?: boolean;
  /** Override sound file. Default: "/sounds/deep-click.mp3" */
  soundSrc?: string;
  /** Volume 0.0–1.0. Default: 0.6 */
  soundVolume?: number;
}

/** Module-level singleton to avoid injecting <audio> everywhere */
let sharedAudio: HTMLAudioElement | null = null;
function getAudio(src: string, volume: number) {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio(src);
    sharedAudio.preload = "auto";
  }
  // If dev hot-reload changed src/volume, update it
  if (sharedAudio.src !== new URL(src, window.location.origin).toString()) {
    sharedAudio.src = src;
  }
  sharedAudio.volume = Math.max(0, Math.min(1, volume));
  return sharedAudio;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      onClick,
      sound = true,
      soundSrc = "/sounds/deep-click.mp3",
      soundVolume = 0.6,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const playClick = React.useCallback(() => {
      if (!sound || disabled) return;
      const a = getAudio(soundSrc, soundVolume);
      if (!a) return;
      // Fast double-click safe
      try {
        a.currentTime = 0;
        void a.play();
      } catch {
        /* ignore (autoplay policies are fine on user gesture) */
      }
    }, [sound, disabled, soundSrc, soundVolume]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playClick();
      onClick?.(e);
    };

    return (
      <Comp
        ref={ref as any}
        onClick={handleClick}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
