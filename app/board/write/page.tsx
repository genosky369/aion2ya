'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';

export default function BoardWritePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    password: '',
  });

  useEffect(() => {
    // 관리자 로그인 여부 확인
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAdmin(true);
      setFormData(prev => ({ ...prev, author: '대신 해주는 기계' }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!formData.author.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    // 관리자가 아닌 경우에만 비밀번호 체크
    if (!isAdmin && !formData.password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // 관리자인 경우 토큰 추가
      const token = localStorage.getItem('admin_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          type: 'board',
          isAdminPost: isAdmin, // 관리자 글 여부 전달
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('게시글이 작성되었습니다.');
        router.push('/board');
      } else {
        alert(data.error || '게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      alert('게시글 작성 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/board"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400" />
            </Link>
            <h1 className="text-3xl font-bold text-white">글쓰기</h1>
          </div>
        </div>

        {/* 관리자 모드 표시 */}
        {isAdmin && (
          <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-600/50 rounded-lg">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">관리자 모드로 작성합니다</span>
          </div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 닉네임 & 비밀번호 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                닉네임
              </label>
              <input
                id="author"
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isAdmin ? 'opacity-60' : ''}`}
                placeholder="닉네임을 입력하세요"
                required
                disabled={isAdmin}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호 {isAdmin && <span className="text-gray-500">(관리자는 입력 불필요)</span>}
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isAdmin ? 'opacity-60' : ''}`}
                placeholder={isAdmin ? "관리자 토큰 사용" : "비밀번호를 입력하세요"}
                required={!isAdmin}
                disabled={isAdmin}
              />
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          {/* 내용 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              내용
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-96 resize-none"
              placeholder="내용을 입력하세요"
              required
            />
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/board"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>작성 중...</span>
                </>
              ) : (
                <span>작성완료</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
