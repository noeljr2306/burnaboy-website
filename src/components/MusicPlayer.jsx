import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay prevented:", err);
        // fallback: wait for user interaction
        const onUserInteract = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            window.removeEventListener("click", onUserInteract);
          } catch (e) {
            console.error("Failed to play even after user interaction:", e);
          }
        };
        window.addEventListener("click", onUserInteract);
      }
    };

    tryAutoplay();
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/way-to-big.mp3" loop />
      <button
        onClick={togglePlayback}
        className="fixed bottom-5 right-4 cursor-pointer active:scale-75 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-lg z-50 hover:bg-yellow-300 transition"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </>
  );
}
