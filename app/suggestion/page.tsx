'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

function SuggestionContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts?type=suggestion');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">건의사항</h1>
          <p className="text-gray-400">
            {searchQuery
              ? `"${searchQuery}" 검색 결과: ${filteredPosts.length}개`
              : `전체 ${filteredPosts.length}개의 건의사항`}
          </p>
        </div>
        <Link
          href="/suggestion/write"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>글쓰기</span>
        </Link>
      </div>

      {/* 게시글 목록 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">
            {searchQuery ? '검색 결과가 없습니다.' : '아직 건의사항이 없습니다.'}
          </p>
          {!searchQuery && (
            <Link
              href="/suggestion/write"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>첫 건의사항 작성하기</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} type="suggestion" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SuggestionPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    }>
      <SuggestionContent />
    </Suspense>
  );
}
