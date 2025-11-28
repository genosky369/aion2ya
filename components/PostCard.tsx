'use client';

import { Post } from '@/types';
import { getRelativeTime } from '@/lib/utils';
import { Eye, MessageCircle, Shield, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  type: 'board' | 'suggestion';
  isAdmin?: boolean;
  onDelete?: () => void;
}

export default function PostCard({ post, type, isAdmin = false, onDelete }: PostCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        alert('관리자 로그인이 필요합니다.');
        return;
      }

      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '삭제 실패');
      }

      alert('게시글이 삭제되었습니다.');
      onDelete?.();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <Link
      href={`/${type}/${post.id}`}
      className="block bg-gray-800 hover:bg-gray-750 rounded-lg p-4 transition-colors border border-gray-700 hover:border-gray-600"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white truncate">{post.title}</h3>
        </div>
        <div className="flex items-center gap-2 ml-2">
          {post.isAdmin && (
            <span className="flex-shrink-0 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-md blur-sm opacity-75 animate-pulse"></span>
              <span className="relative inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white border border-red-400 shadow-lg">
                <Shield className="w-3 h-3 mr-1" />
                관리자
              </span>
            </span>
          )}
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="flex-shrink-0 p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
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
