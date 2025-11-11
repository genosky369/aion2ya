'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post } from '@/types';
import { ArrowLeft, Eye, MessageCircle, Shield, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getRelativeTime } from '@/lib/utils';

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts?id=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
      } else {
        alert('게시글을 찾을 수 없습니다.');
        router.push('/board');
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      alert('게시글을 불러오는데 실패했습니다.');
      router.push('/board');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(
        `/api/posts?id=${postId}&password=${encodeURIComponent(deletePassword)}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('게시글이 삭제되었습니다.');
        router.push('/board');
      } else {
        alert(data.error || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeletePassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/board"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </Link>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        {/* 게시글 내용 */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          {/* 제목 & 작성자 정보 */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold text-white flex-1">{post.title}</h1>
              {post.isAdmin && (
                <span className="ml-4 flex-shrink-0 relative">
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-md blur-sm opacity-75 animate-pulse"></span>
                  <span className="relative inline-flex items-center px-3 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white border border-red-400 shadow-lg">
                    <Shield className="w-3 h-3 mr-1" />
                    ADMIN
                  </span>
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
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
          </div>

          {/* 본문 */}
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">게시글 삭제</h3>
            <p className="text-gray-300 mb-2">
              {post.isAdmin
                ? '관리자 게시글입니다. 관리자 비밀번호를 입력하세요.'
                : '작성 시 입력한 비밀번호를 입력하세요.'}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              💡 관리자는 관리자 비밀번호로 모든 게시글을 삭제할 수 있습니다.
            </p>

            <input
              type="password"
              placeholder={post.isAdmin ? "관리자 비밀번호" : "작성 비밀번호 또는 관리자 비밀번호"}
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !deleting) {
                  handleDelete();
                }
              }}
            />

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                }}
                disabled={deleting}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>삭제 중...</span>
                  </>
                ) : (
                  <span>삭제</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
