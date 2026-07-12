"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroVideoProps {
  videoId: string;
  title?: string;
  playLabel?: string;
}

export default function HeroVideo({ videoId, title = "Video Player", playLabel = "Play Video" }: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleFallback = () => {
    // Fall back to hqdefault if maxresdefault is not available (common for older or non-HD YouTube videos)
    if (imgSrc.includes("maxresdefault")) {
      setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else if (imgSrc.includes("hqdefault")) {
      // Final fallback if hqdefault also fails
      setImgSrc("/podcast-fallback.png");
    }
  };

  if (isPlaying) {
    return (
      <div className="relative pt-[56.25%] w-full h-0 rounded-2xl overflow-hidden bg-black shadow-2xl transition-all duration-300">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
            <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
          </div>
        )}
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&mute=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="relative pt-[56.25%] w-full h-0 rounded-2xl overflow-hidden bg-black group cursor-pointer select-none shadow-2xl transition-all duration-500 border border-glass-border hover:border-glass-border-hover"
      onClick={handlePlay}
    >
      {/* Thumbnail image */}
      <Image
        src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
        onError={handleFallback}
      />

      {/* Modern, unified dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Decorative ambient subtle glow behind the play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-32 h-32 bg-white/5 rounded-full blur-xl transition-all duration-500 scale-75 group-hover:scale-125 group-hover:bg-white/10" />
      </div>

      {/* Glassmorphic Play Button Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Pulsing ring + central button */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing external ring */}
          <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
          <div className="absolute w-20 h-20 rounded-full border-2 border-white/40 animate-ping opacity-40" style={{ animationDuration: '2s' }} />

          {/* Core play button */}
          <button
            type="button"
            className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25 group-hover:border-white/50"
            aria-label={playLabel}
          >
            {/* Inner Play Triangle Icon */}
            <svg
              className="w-8 h-8 fill-current ml-1 text-white filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Watch label below button */}
        <span className="text-white/80 text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform translate-y-1 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white">
          {playLabel}
        </span>
      </div>
    </div>
  );
}
