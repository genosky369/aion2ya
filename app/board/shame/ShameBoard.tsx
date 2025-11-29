'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, AlertCircle, Trash2 } from 'lucide-react';
import { supabase, ShamePost } from '@/lib/supabase';
import ShameRanking from '@/components/ShameRanking';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
  accent: 'from-blue-600 to-violet-600',
  text: 'text-blue-400',
  textHover: 'hover:text-blue-300',
};

// 동일 유저의 신고 횟수를 계산하는 타입
interface ShamePostWithCount extends ShamePost {
  calculatedReportCount: number;
}

export default function ShameBoard() {
  const [shamePosts, setShamePosts] = useState<ShamePostWithCount[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ShamePostWithCount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState<string>('전체');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 관리자 권한 확인
    const token = localStorage.getItem('admin_token');
    setIsAdmin(!!token);

    fetchShamePosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchQuery, selectedServer, shamePosts]);

  async function fetchShamePosts() {
    try {
      const { data, error } = await supabase
        .from('shame_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 동일 유저(player_id + server + race)별 신고 횟수 계산
      const posts = data || [];
      const countMap = new Map<string, number>();

      // 먼저 각 유저별 글 개수를 계산
      posts.forEach(post => {
        const key = `${post.player_id}-${post.server}-${post.race}`;
        countMap.set(key, (countMap.get(key) || 0) + 1);
      });

      // 각 글에 계산된 신고 횟수 추가
      const postsWithCount: ShamePostWithCount[] = posts.map(post => {
        const key = `${post.player_id}-${post.server}-${post.race}`;
        return {
          ...post,
          calculatedReportCount: countMap.get(key) || 1
        };
      });

      setShamePosts(postsWithCount);
    } catch (error) {
      console.error('Error fetching shame posts:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterPosts() {
    let filtered = shamePosts;

    // 종족 필터
    if (selectedServer !== '전체') {
      filtered = filtered.filter(post => post.race === selectedServer);
    }

    // 검색어 필터 (플레이어 ID)
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.player_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        alert('관리자 로그인이 필요합니다.');
        return;
      }

      const response = await fetch(`/api/admin/shame/${id}`, {
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
      fetchShamePosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.');
    }
  }

  const servers = ['전체', '천족', '마족'];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 shadow-lg">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">🚨 박제 게시판</h1>
              <p className="text-slate-400 mt-1">비매너 유저 공유 및 검색</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 왼쪽: 메인 컨텐츠 (3칸) */}
          <div className="lg:col-span-3">
            {/* 검색 및 필터 */}
            <Card className={`${THEME.card} border backdrop-blur-xl mb-8`}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* 검색창 */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <Input
                      placeholder="플레이어 ID 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500"
                    />
                  </div>

                  {/* 서버 필터 */}
                  <div className="flex gap-2">
                    {servers.map(server => (
                      <Button
                        key={server}
                        variant={selectedServer === server ? 'default' : 'outline'}
                        onClick={() => setSelectedServer(server)}
                        className={selectedServer === server ? 'bg-gradient-to-r from-red-600 to-orange-600' : ''}
                      >
                        {server}
                      </Button>
                    ))}
                  </div>

                  {/* 작성 버튼 */}
                  <Link href="/board/shame/new">
                    <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 w-full md:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      박제하기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 게시글 목록 */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-slate-400">로딩 중...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className={`${THEME.card} border backdrop-blur-xl`}>
                <CardContent className="py-20 text-center">
                  <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">검색 결과가 없습니다.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/board/shame/${post.id}`}>
                    <Card className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all cursor-pointer group`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-bold text-lg px-4 py-1">
                              {post.player_id}
                            </Badge>
                            <div className="flex gap-3 text-sm text-slate-500">
                              <span>{post.server}</span>
                              <span>•</span>
                              <span>{post.race}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-red-700 text-red-400">
                              신고 {post.calculatedReportCount}회
                            </Badge>
                            {isAdmin && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-700 hover:bg-red-900/20 text-red-400"
                                onClick={(e) => handleDelete(post.id, e)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-300 mb-3 group-hover:text-white transition-colors">
                          {post.reason}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                          {post.screenshot_url && (
                            <Badge variant="outline" className="text-xs border-slate-700 text-slate-500">
                              스크린샷 포함
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 오른쪽: 사이드바 (1칸) - 박제 랭킹 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ShameRanking limit={10} showTitle={true} compact={false} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
