"use client";
import { useEffect } from "react";

export default function ClickSoundProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio("/sounds/click.mp3");
    audio.preload = "auto";
    audio.volume = 0.6; // adjust bass/volume

    const handleClick = () => {
      try {
        audio.currentTime = 0; // restart if clicked fast
        void audio.play();
      } catch (err) {
        console.warn("Click sound play failed", err);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null; // this component renders nothing
}
