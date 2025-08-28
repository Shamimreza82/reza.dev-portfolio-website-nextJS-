"use client"

import { createContext, useContext, useRef, useState, useEffect } from "react"

type MusicContextType = {
  isPlaying: boolean
  toggleMusic: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio("/sounds/superspacy-atmosphere-106826.mp3")
    audio.loop = true
    audio.volume = 1
    audioRef.current = audio

    // Try to autoplay
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked by browser, will play when user interacts
        console.log("Autoplay blocked, waiting for user interaction")
      })

    return () => {
      audio.pause()
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error("useMusic must be used within MusicProvider")
  return ctx
}
