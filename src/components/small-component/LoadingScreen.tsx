"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Volume2, VolumeX } from "lucide-react"

type Props = {
  duration?: number
  messages?: string[]
  showOnReloadOnly?: boolean
  /** Path to your looped audio (public/...) */
  soundSrc?: string
  /** Default volume 0..1 */
  soundVolume?: number
  /** start with sound on (tries autoplay), show toggle if blocked */
  soundEnabled?: boolean
  children: React.ReactNode
}

const defaultMessages = [
  "Booting UI kernel",
  "Loading assets",
  "Negotiating frames",
  "Syncing state",
  "Ready to launch",
]

// robust reload detection
function isPageReload(): boolean {
  if (typeof performance === "undefined") return false
  const nav = (performance.getEntriesByType?.("navigation")?.[0] ??
    null) as PerformanceNavigationTiming | null
  if (nav && "type" in nav) return nav.type === "reload"
  return performance.navigation?.type === 1
}

export default function TechLoaderOverlay({
  duration = 2000,
  messages = defaultMessages,
  showOnReloadOnly = false,
  soundSrc = "/sounds/loader-ambience.mp3",
  soundVolume = 0.35,
  soundEnabled = true,
  children,
}: Props) {
  const prefersReduced = useReducedMotion()
  const [loading, setLoading] = useState<boolean>(() =>
    showOnReloadOnly ? isPageReload() : true
  )
  const [idx, setIdx] = useState(0)

  // ---- AUDIO STATE ----
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(!soundEnabled)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const volumeTargetRef = useRef(0) // 0..1 target volume
  const fadeTimerRef = useRef<number | null>(null)

  // create audio element once on client
  useEffect(() => {
    audioRef.current = new Audio(soundSrc)
    const el = audioRef.current
    el.loop = true
    el.preload = "auto"
    el.volume = 0 // start silent; we’ll fade in if allowed
    return () => {
      if (fadeTimerRef.current) cancelAnimationFrame(fadeTimerRef.current)
      el.pause()
      el.src = ""
      audioRef.current = null
    }
  }, [soundSrc])

  // helper: smooth volume ramp to target
  const fadeVolumeTo = (to: number, ms = 600) => {
    const el = audioRef.current
    if (!el) return
    const from = el.volume
    const start = performance.now()
    volumeTargetRef.current = to
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms)
      const v = from + (to - from) * p
      el.volume = Math.max(0, Math.min(1, v))
      if (p < 1 && Math.abs(volumeTargetRef.current - to) < 0.001) {
        fadeTimerRef.current = requestAnimationFrame(tick)
      }
    }
    if (fadeTimerRef.current) cancelAnimationFrame(fadeTimerRef.current)
    fadeTimerRef.current = requestAnimationFrame(tick)
  }

  // try autoplay when loading starts
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (!loading) return
    if (isMuted) return

    // attempt to play (may be blocked)
    el
      .play()
      .then(() => {
        setAutoplayBlocked(false)
        fadeVolumeTo(soundVolume, 700) // fade in
      })
      .catch(() => {
        // blocked by autoplay policy; show toggle
        setAutoplayBlocked(true)
      })
  }, [loading, isMuted, soundVolume])

  // stop sound and fade out when loading finishes
  useEffect(() => {
    if (!loading) {
      const el = audioRef.current
      if (!el) return
      fadeVolumeTo(0, 500)
      const stopTimeout = setTimeout(() => {
        el.pause()
        el.currentTime = 0
      }, 520)
      return () => clearTimeout(stopTimeout)
    }
  }, [loading])

  // text rotation
  useEffect(() => {
    if (!loading) return
    const iv = setInterval(() => setIdx((i) => (i + 1) % messages.length), 600)
    return () => clearInterval(iv)
  }, [loading, messages.length])

  // timer to end loading
  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), duration)
    return () => clearTimeout(t)
  }, [loading, duration])

  const ringAnim = useMemo(
    () => ({
      animate: prefersReduced ? {} : { rotateX: [12, 12], rotateY: [0, 360] },
      transition: prefersReduced ? {} : { repeat: Infinity, duration: 8, ease: "linear" },
    }),
    [prefersReduced]
  )

  // toggle sound manually (for autoplay blocked or user choice)
  const handleToggleSound = async () => {
    const el = audioRef.current
    if (!el) return
    if (isMuted) {
      setIsMuted(false)
      try {
        await el.play()
        setAutoplayBlocked(false)
        fadeVolumeTo(soundVolume, 700)
      } catch {
        // still blocked; keep showing button
        setAutoplayBlocked(true)
        setIsMuted(true)
      }
    } else {
      setIsMuted(true)
      fadeVolumeTo(0, 400)
      setTimeout(() => el.pause(), 420)
    }
  }

  // If not loading (e.g., SPA navigation), just render children
  if (!loading) return <>{children}</>

  return (
    <div className="relative min-h-screen">
      {children}

      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* sound toggle (only while loading) */}
            <button
              onClick={handleToggleSound}
              className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-cyan-100 hover:bg-white/10 active:scale-95 transition"
              title={isMuted ? "Enable sound" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{isMuted ? "Sound off" : "Sound on"}</span>
            </button>

            {/* backdrop grid */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #67e8f9 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="pointer-events-none absolute -z-0 h-[60vmin] w-[60vmin] rounded-full bg-cyan-500/20 blur-3xl" />

            {/* loader card */}
            <motion.div
              className="relative z-10 w-[320px] h-[320px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_120px_-30px_rgba(34,211,238,0.5)]"
              style={{ perspective: 900, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="absolute inset-0 grid place-items-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ring */}
                <motion.div
                  className="relative grid place-items-center"
                  style={{ width: 180, height: 180, transformStyle: "preserve-3d" }}
                  {...ringAnim}
                >
                  <div
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderColor: "rgba(103,232,249,0.35)",
                      boxShadow: "inset 0 0 40px rgba(103,232,249,0.18)",
                      transform: "translateZ(30px)",
                    }}
                  />
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-[2px] w-12 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(103,232,249,.9), transparent)",
                        transform: `rotate(${(360 / 18) * i}deg) translateX(80px) translateZ(12px)`,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </motion.div>

                {/* core */}
                <motion.div
                  initial={{ scale: 0.92, opacity: 0.9 }}
                  animate={
                    prefersReduced ? {} : { scale: [0.92, 1, 0.92], opacity: [0.9, 1, 0.9] }
                  }
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="grid place-items-center rounded-full"
                  style={{
                    width: 86,
                    height: 86,
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.25) 0%, rgba(14,165,233,0.15) 60%, rgba(0,0,0,0) 100%)",
                    boxShadow:
                      "0 0 40px rgba(34,211,238,0.25), inset 0 0 26px rgba(34,211,238,0.35)",
                    transform: "translateZ(55px)",
                  }}
                >
                  <Loader2 className="h-6 w-6 text-cyan-300" />
                </motion.div>
              </motion.div>

              {/* status text */}
              <div className="absolute inset-x-0 bottom-8 flex items-center justify-center">
                <p className="font-semibold tracking-[0.25em] text-cyan-200/90 text-sm md:text-base">
                  {messages[idx]}
                  <span className="ml-1 inline-block h-4 w-[2px] translate-y-[2px] bg-cyan-300 animate-pulse" />
                </p>
              </div>

              {/* small hint if blocked */}
              {autoplayBlocked && (
                <div className="absolute bottom-3 inset-x-0 text-center text-[11px] text-cyan-300/70">
                  Click “Sound on” to enable audio
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}






