"use client";
import { useEffect, useRef } from "react";

export default function ClickSoundProvider() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleInteraction = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/click.mp3");
        audioRef.current.volume = 0.4;
      }
    };

    const handleClick = () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.currentTime = 0;
        void audioRef.current.play();
      } catch {}
    };

    document.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
