import { useRef } from "react";

export default function AutoMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-xl font-bold">Welcome to My Site</h1>

      <button
        onClick={playMusic}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start Experience
      </button>

      <audio ref={audioRef} src="/bg-music.mp3" loop />
    </div>
  );
}
