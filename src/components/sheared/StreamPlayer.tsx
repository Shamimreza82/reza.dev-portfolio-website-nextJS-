"use client";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

interface StreamPlayerProps {
  url: string;
  title?: string;
}

export default function StreamPlayer({ url, title }: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        video.play();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        setError("Stream error: " + data.details);
      });
    } else {
      // Safari
      video.src = url;
      video.onloadedmetadata = () => {
        setLoading(false);
        video.play();
      };
    }

    return () => {
      hls?.destroy();
    };
  }, [url]);

  return (
    <div className="w-full max-w-[900px] mx-auto p-5 bg-[#111] rounded-[14px] shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      {/* Title */}
      {title && (
        <h2 className="text-white mb-2.5 font-semibold text-lg">
          🎬 {title}
        </h2>
      )}

      {/* Video Player */}
      <div className="relative rounded-lg overflow-hidden bg-black">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-base bg-black/40 backdrop-blur-sm">
            Loading stream...
          </div>
        )}

        {error && (
          <div className="p-4 text-red-500 text-sm">{error}</div>
        )}

        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
