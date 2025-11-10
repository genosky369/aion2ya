'use client';

import { YOUTUBE_VIDEOS } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function YoutubeVideos() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">아이온2 영상</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {YOUTUBE_VIDEOS.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video rounded-lg overflow-hidden bg-gray-700 hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-medium line-clamp-2">{video.title}</p>
                <ExternalLink className="w-4 h-4 text-white flex-shrink-0 ml-2" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
