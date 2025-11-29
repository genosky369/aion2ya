'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post, Comment } from '@/types';
import { ArrowLeft, Eye, MessageCircle, Shield, Trash2, Loader2, Send } from 'lucide-react';
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

  // 댓글 관련 상태
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ author: '', password: '', content: '' });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<string | null>(null);
  const [deleteCommentPassword, setDeleteCommentPassword] = useState('');
  const [deletingComment, setDeletingComment] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
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

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentForm.author.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!commentForm.password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!commentForm.content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          ...commentForm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCommentForm({ author: '', password: '', content: '' });
        fetchComments();
        // 댓글 수 업데이트
        if (post) {
          setPost({ ...post, commentCount: post.commentCount + 1 });
        }
      } else {
        alert(data.error || '댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!deleteCommentId || !deleteCommentPassword) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    setDeletingComment(true);
    try {
      const response = await fetch(
        `/api/comments?id=${deleteCommentId}&password=${encodeURIComponent(deleteCommentPassword)}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (response.ok) {
        fetchComments();
        setDeleteCommentId(null);
        setDeleteCommentPassword('');
        // 댓글 수 업데이트
        if (post) {
          setPost({ ...post, commentCount: Math.max(0, post.commentCount - 1) });
        }
      } else {
        alert(data.error || '댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingComment(false);
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

        {/* 댓글 섹션 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            댓글 {comments.length}개
          </h2>

          {/* 댓글 작성 폼 */}
          <form onSubmit={handleSubmitComment} className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="닉네임"
                value={commentForm.author}
                onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={commentForm.password}
                onChange={(e) => setCommentForm({ ...commentForm, password: e.target.value })}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <textarea
                placeholder="댓글을 입력하세요..."
                value={commentForm.content}
                onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 self-end"
              >
                {submittingComment ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                등록
              </button>
            </div>
          </form>

          {/* 댓글 목록 */}
          {commentsLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin mx-auto" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{comment.author}</span>
                      {comment.isAdmin && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          <Shield className="w-3 h-3 mr-1" />
                          관리자
                        </span>
                      )}
                      <span className="text-sm text-gray-500">{getRelativeTime(comment.date)}</span>
                    </div>
                    <button
                      onClick={() => setDeleteCommentId(comment.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
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

      {/* 댓글 삭제 모달 */}
      {deleteCommentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">댓글 삭제</h3>
            <p className="text-gray-300 mb-4">
              작성 시 입력한 비밀번호를 입력하세요.
            </p>

            <input
              type="password"
              placeholder="비밀번호"
              value={deleteCommentPassword}
              onChange={(e) => setDeleteCommentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !deletingComment) {
                  handleDeleteComment();
                }
              }}
            />

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setDeleteCommentId(null);
                  setDeleteCommentPassword('');
                }}
                disabled={deletingComment}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDeleteComment}
                disabled={deletingComment}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {deletingComment ? (
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
