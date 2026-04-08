'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VesselTourVideoProps {
  videoId: string;
  platform?: 'youtube' | 'vimeo';
  title: string;
  thumbnailUrl?: string;
}

export function VesselTourVideo({
  videoId,
  platform = 'youtube',
  title,
  thumbnailUrl,
}: VesselTourVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl =
    platform === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${videoId}?autoplay=1`;

  const defaultThumbnail =
    platform === 'youtube'
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : thumbnailUrl;

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      aria-label={`Play virtual tour of ${title}`}
    >
      {defaultThumbnail ? (
        <Image
          src={defaultThumbnail}
          alt={`Virtual tour thumbnail — ${title}`}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy/70" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/20 transition-colors duration-300" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 group-hover:bg-gold transition-colors duration-300 shadow-lg group-hover:scale-110 transform">
          <Play className="h-7 w-7 text-navy ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4">
        <span className="text-white text-sm font-medium bg-navy/60 backdrop-blur-sm rounded-full px-3 py-1">
          Virtual Tour
        </span>
      </div>
    </button>
  );
}
