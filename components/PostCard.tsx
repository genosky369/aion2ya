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
          <span className="ml-2 flex-shrink-0 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
            <Shield className="w-3 h-3 mr-1" />
            관리자
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
