"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils" // shadcn helper

// Variants & sizes
const buttonVariants = cva(
  "relative group isolate overflow-hidden rounded-xl font-semibold flex items-center justify-center gap-2 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-950 shadow",
        outline:
          "border-2 border-cyan-500/30 bg-gray-900/50 text-cyan-300 backdrop-blur-sm hover:border-cyan-400/60",
        danger:
          "bg-gradient-to-br from-red-500 to-pink-600 text-white shadow hover:from-red-600 hover:to-pink-700",
        ghost:
          "bg-transparent text-gray-300 hover:bg-gray-800/40 hover:text-white",
      },
      size: {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-6 py-3 text-sm rounded-lg",
        lg: "px-8 py-4 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

type Props = VariantProps<typeof buttonVariants> & {
  name: string
  href?: string
  target?: "_blank" | "_self"
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  soundSrc?: string
  className?: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export default function SoundButton({
  name,
  href,
  target = "_self",
  iconLeft,
  iconRight,
  soundSrc = "/sounds/click.mp3",
  className,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant,
  size,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([])
  const prefersReducedMotion = useReducedMotion()

  const handlePlay = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  const spawnRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((r) => [...r, { id, x, y }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 500)
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    handlePlay()
    spawnRipple(e)
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.96 },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }

  const Inner = (
    <motion.button
      {...motionProps}
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && "w-full",
        className
      )}
    >
      {/* Ripple effect */}
      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-xl">
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{ left: r.x, top: r.y }}
            className="absolute h-0 w-0 rounded-full bg-white/40 animate-[ripple_500ms_ease-out_forwards]"
          />
        ))}
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          iconLeft && <span className="shrink-0">{iconLeft}</span>
        )}
        <span>{name}</span>
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </span>

      {/* Hidden audio */}
      <audio ref={audioRef} src={soundSrc} preload="auto" />
    </motion.button>
  )

  if (href) {
    return (
      <Link href={href} target={target} className="inline-block">
        {Inner}
      </Link>
    )
  }

  return Inner
}
