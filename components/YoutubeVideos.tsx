'use client';

import { YOUTUBE_VIDEOS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function YoutubeVideos() {
  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-bold mb-4 text-cyan-100">아이온2 영상</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {YOUTUBE_VIDEOS.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video rounded-lg overflow-hidden bg-slate-800 border border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent group-hover:from-slate-900 transition-all flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-cyan-600 to-pink-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-4">
              <div className="flex items-center justify-between">
                <p className="text-cyan-100 text-sm font-medium line-clamp-2">{video.title}</p>
                <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 ml-2" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
