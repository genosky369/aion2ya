'use client';

import { Post } from '@/types';
import { getRelativeTime } from '@/lib/utils';
import { Eye, MessageCircle, Shield } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  type: 'board' | 'suggestion';
}

export default function PostCard({ post, type }: PostCardProps) {
  return (
    <Link
      href={`/${type}/${post.id}`}
      className="block bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-colors border border-gray-700 hover:border-gray-600"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white truncate">{post.title}</h3>
        </div>
        {post.isAdmin && (
          <span className="ml-2 flex-shrink-0 relative">
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-md blur-sm opacity-75 animate-pulse"></span>
            <span className="relative inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white border border-red-400 shadow-lg">
              <Shield className="w-3 h-3 mr-1" />
              ADMIN
            </span>
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{post.content}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-300">{post.author}</span>
          <span>{getRelativeTime(post.date)}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
