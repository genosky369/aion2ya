'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { getRelativeTime } from '@/lib/utils';
import { Eye, MessageCircle, Shield, Trash2, Pin, PinOff } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  type: 'board' | 'suggestion';
  isAdmin?: boolean;
  onDelete?: () => void;
  onPinChange?: () => void;
}

export default function PostCard({ post, type, isAdmin = false, onDelete, onPinChange }: PostCardProps) {
  const [pinLoading, setPinLoading] = useState(false);

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

  const handlePinToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const action = post.isPinned ? '공지를 해제' : '공지로 설정';
    if (!confirm(`이 게시글을 ${action}하시겠습니까?`)) return;

    setPinLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        alert('관리자 로그인이 필요합니다.');
        return;
      }

      if (post.isPinned) {
        // 공지 해제
        const response = await fetch(`/api/posts/pin?postId=${post.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '공지 해제 실패');
        }
        alert('공지가 해제되었습니다.');
      } else {
        // 공지 설정
        const response = await fetch('/api/posts/pin', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: post.id,
            postType: type,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || '공지 설정 실패');
        }
        alert('공지로 설정되었습니다.');
      }

      onPinChange?.();
    } catch (error) {
      console.error('Error toggling pin:', error);
      alert(error instanceof Error ? error.message : '공지 설정 중 오류가 발생했습니다.');
    } finally {
      setPinLoading(false);
    }
  };

  return (
    <Link
      href={`/${type}/${post.id}`}
      className={`block rounded-lg p-4 transition-colors border ${
        post.isPinned
          ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-600/50 hover:border-yellow-500/70'
          : 'bg-gray-800 hover:bg-gray-750 border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 flex items-center gap-2">
          {post.isPinned && (
            <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              <Pin className="w-3 h-3 mr-1" />
              공지
            </span>
          )}
          <h3 className="text-lg font-medium text-white truncate">{post.title}</h3>
        </div>
        <div className="flex items-center gap-2 ml-2">
          {post.isAdmin && (
            <span className="flex-shrink-0 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-md blur-sm opacity-75 animate-pulse"></span>
              <span className="relative inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white border border-red-400 shadow-lg">
                <Shield className="w-3 h-3 mr-1" />
                대신 해주는 기계
              </span>
            </span>
          )}
          {isAdmin && (
            <>
              <button
                onClick={handlePinToggle}
                disabled={pinLoading}
                className={`flex-shrink-0 p-2 rounded-md transition-colors ${
                  post.isPinned
                    ? 'bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400'
                    : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-400'
                } ${pinLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={post.isPinned ? '공지 해제' : '공지로 설정'}
              >
                {post.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDelete}
                className="flex-shrink-0 p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
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
