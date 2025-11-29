'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Shield, MessageCircle, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ShameRanking from '@/components/ShameRanking';

// 모던하고 세련된 색상 테마
const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
  accent: 'from-blue-600 to-violet-600',
  accentLight: 'from-blue-500 to-violet-500',
  text: 'text-blue-400',
  textHover: 'hover:text-blue-300',
  badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  nav: 'bg-slate-900/80 border-slate-800/50',
};

// 임시 업데이트 데이터
const MOCK_UPDATES = [
  {
    id: 1,
    title: '12.5 대형 패치 - 신규 던전 및 밸런스 조정',
    date: '2025.11.28',
    category: '패치',
  },
  {
    id: 2,
    title: '포셔 라이브 방송 요약 - 12월 업데이트 미리보기',
    date: '2025.11.27',
    category: '라이브',
  },
  {
    id: 3,
    title: '겨울 시즌 이벤트 안내',
    date: '2025.11.26',
    category: '이벤트',
  },
  {
    id: 4,
    title: '클래스 밸런스 패치 내용 정리',
    date: '2025.11.25',
    category: '패치',
  },
];

// 박제 데이터 타입 정의
interface ShamePostDisplay {
  id: number;
  playerId: string;
  server: string;
  race: string;
  reason: string;
  date: string;
  reportCount: number;
}

// 커뮤니티 게시글 타입 정의
interface CommunityPost {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  commentCount: number;
  isAdmin: boolean;
  isPinned: boolean;
}

const SIMULATORS = [
  {
    id: 'pet',
    name: '펫 이해도',
    description: '펫 스탯 리롤 시뮬레이터 & 기댓값 계산기',
    href: '/simulator/pet-comprehension',
    available: true,
  },
  {
    id: 'stone',
    name: '마석/영석',
    description: '자동 각인 기댓값 계산기',
    href: '/simulator/manastone',
    available: true,
  },
];

export default function HomePage() {
  const [shamePosts, setShamePosts] = useState<ShamePostDisplay[]>([]);
  const [shameLoading, setShameLoading] = useState(true);
  const [updates, setUpdates] = useState<typeof MOCK_UPDATES>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // 박제 게시판 데이터 가져오기
      const { data: shameData, error: shameError } = await supabase
        .from('shame_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!shameError && shameData) {
        setShamePosts(shameData.map(post => ({
          id: post.id,
          playerId: post.player_id,
          server: post.server,
          race: post.race,
          reason: post.reason,
          date: new Date(post.created_at).toLocaleDateString('ko-KR'),
          reportCount: post.report_count
        })));
      }
      setShameLoading(false);

      // 업데이트 데이터 가져오기
      const { data: updateData, error: updateError } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (!updateError && updateData && updateData.length > 0) {
        setUpdates(updateData.map(update => ({
          id: update.id,
          title: update.title,
          date: new Date(update.created_at).toLocaleDateString('ko-KR'),
          category: update.category,
        })));
      }

      // 커뮤니티 게시글 가져오기
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('post_type', 'board')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);

      if (!postsError && postsData) {
        setCommunityPosts(postsData.map(post => ({
          id: post.id,
          title: post.title,
          author: post.author,
          date: new Date(post.created_at).toLocaleDateString('ko-KR'),
          views: post.views,
          commentCount: post.comment_count,
          isAdmin: post.is_admin,
          isPinned: post.is_pinned || false,
        })));
      }
      setCommunityLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setShameLoading(false);
      setCommunityLoading(false);
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 메인 컨텐츠 (2칸) */}
          <div className="lg:col-span-2 space-y-8">
            {/* AION2 업데이트 & 라이브 요약 (관리자 작성) */}
            <Card className={`${THEME.card} border backdrop-blur-xl overflow-hidden shadow-2xl`}>
              <div className={`h-1 bg-gradient-to-r ${THEME.accent}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">업데이트 & 라이브 요약</CardTitle>
                    <CardDescription className="text-slate-400">운영진이 직접 작성하는 소식</CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">관리자 작성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {updates.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">아직 작성된 업데이트가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {updates.map((update) => (
                      <Link key={update.id} href={`/updates/${update.id}`}>
                        <div className={`p-4 rounded-xl ${THEME.cardHover} transition-all cursor-pointer group border border-transparent hover:border-blue-700/50`}>
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={`${THEME.badge} text-xs`}>
                              {update.category}
                            </Badge>
                            <span className="text-xs text-slate-600">{update.date}</span>
                          </div>
                          <h3 className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                            {update.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 시뮬레이터 섹션 */}
            <Card className={`${THEME.card} border backdrop-blur-xl shadow-xl`}>
              <CardHeader>
                <div>
                  <CardTitle className="text-2xl">시뮬레이터</CardTitle>
                  <CardDescription className="text-slate-400">정확한 확률 계산과 시뮬레이션</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SIMULATORS.map((sim) => (
                    <Link
                      key={sim.id}
                      href={sim.available ? sim.href : '#'}
                      className={`group ${!sim.available && 'pointer-events-none opacity-60'}`}
                    >
                      <div className={`${THEME.card} ${THEME.cardHover} border rounded-xl p-5 transition-all duration-300 ${sim.available && 'hover:scale-[1.02] hover:shadow-xl hover:border-blue-700/50'}`}>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">{sim.name}</h3>
                        <p className="text-sm text-slate-400">{sim.description}</p>
                        {!sim.available && (
                          <Badge variant="outline" className="mt-3 text-xs border-slate-700 text-slate-500">
                            준비중
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 커뮤니티 섹션 */}
            <Card className={`${THEME.card} border backdrop-blur-xl shadow-xl`}>
              <CardHeader>
                <div>
                  <CardTitle className="text-2xl">커뮤니티</CardTitle>
                  <CardDescription className="text-slate-400">자유롭게 소통하는 공간</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {communityLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : communityPosts.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    아직 게시글이 없습니다.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {communityPosts.map((post) => (
                      <Link key={post.id} href={`/board/${post.id}`}>
                        <div className={`p-4 rounded-xl ${THEME.cardHover} transition-all cursor-pointer group border ${post.isPinned ? 'border-yellow-600/50 bg-yellow-900/10' : 'border-transparent'} hover:border-blue-700/50`}>
                          <div className="flex items-center gap-2 mb-1">
                            {post.isPinned && (
                              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                공지
                              </Badge>
                            )}
                            {post.isAdmin && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                관리자
                              </Badge>
                            )}
                            <h3 className="text-sm font-medium group-hover:text-blue-400 transition-colors truncate flex-1">
                              {post.title}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{post.author}</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {post.commentCount}
                              </span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <Link href="/board">
                  <Button className={`w-full mt-4 bg-gradient-to-r ${THEME.accent} hover:opacity-90`}>
                    게시판 바로가기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 사이드바 (1칸) - 박제 게시판 */}
          <div className="space-y-8">
            {/* 박제 게시판 */}
            <Card className={`${THEME.card} border backdrop-blur-xl shadow-xl`}>
              <CardHeader>
                <div>
                  <CardTitle className="text-2xl">박제 게시판</CardTitle>
                  <CardDescription className="text-slate-400">비매너 유저 공유 및 검색</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {shameLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                  </div>
                ) : shamePosts.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    아직 박제된 유저가 없습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {shamePosts.map((post) => (
                      <Link key={post.id} href={`/board/shame/${post.id}`}>
                        <div className={`p-4 rounded-xl ${THEME.cardHover} transition-all cursor-pointer group border border-transparent hover:border-red-700/50`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-bold">
                                {post.playerId}
                              </Badge>
                              <span className="text-xs text-slate-500">{post.server}</span>
                              <span className="text-xs text-slate-500">{post.race}</span>
                            </div>
                            <Badge variant="outline" className="text-xs border-red-700 text-red-400">
                              신고 {post.reportCount}회
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{post.reason}</p>
                          <span className="text-xs text-slate-600">{post.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <Link href="/board/shame">
                  <Button className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90">
                    박제하러 가기
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 박제 랭킹 */}
            <ShameRanking limit={5} showTitle={true} />
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-slate-800/50 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 mb-4`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${THEME.accent} flex items-center justify-center`}>
                <span className="text-sm font-bold">A2</span>
              </div>
              <span className="font-bold text-lg">AION2YA</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">AION2 커뮤니티 & 시뮬레이터</p>
            <p className="text-xs text-slate-600">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
