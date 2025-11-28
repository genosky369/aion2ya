'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, LogOut, BarChart3, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
  accent: 'from-blue-600 to-violet-600',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState({
    totalUpdates: 0,
    totalShamePosts: 0,
  });

  useEffect(() => {
    // 토큰 확인
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // 토큰 디코딩 (간단한 방법)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    } catch (error) {
      router.push('/admin/login');
    }

    // 통계 데이터 가져오기
    fetchStats();
  }, [router]);

  async function fetchStats() {
    try {
      // 업데이트 글 개수
      const { count: updatesCount, error: updatesError } = await supabase
        .from('updates')
        .select('*', { count: 'exact', head: true });

      // 박제 글 개수
      const { count: shameCount, error: shameError } = await supabase
        .from('shame_posts')
        .select('*', { count: 'exact', head: true });

      if (!updatesError && !shameError) {
        setStats({
          totalUpdates: updatesCount || 0,
          totalShamePosts: shameCount || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (!username) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} flex items-center justify-center`}>
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      {/* 헤더 */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">관리자 대시보드</h1>
              <p className="text-sm text-slate-400">환영합니다, {username}님</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-slate-700 hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`${THEME.card} border backdrop-blur-xl`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">총 업데이트 글</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUpdates}</div>
            </CardContent>
          </Card>

          <Card className={`${THEME.card} border backdrop-blur-xl`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">총 박제 글</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalShamePosts}</div>
            </CardContent>
          </Card>

          <Card className={`${THEME.card} border backdrop-blur-xl`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">오늘 방문자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
              <p className="text-xs text-slate-500 mt-1">추후 구현 예정</p>
            </CardContent>
          </Card>
        </div>

        {/* 주요 기능 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 업데이트 관리 */}
          <Card className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${THEME.accent}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>업데이트 관리</CardTitle>
                  <CardDescription className="text-slate-400">
                    업데이트 & 라이브 요약 작성/수정/삭제
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/updates/new">
                <Button className={`w-full bg-gradient-to-r ${THEME.accent} hover:opacity-90`}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 업데이트 작성
                </Button>
              </Link>
              <Link href="/admin/updates">
                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                  업데이트 목록 관리
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 박제 게시판 관리 */}
          <Card className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-orange-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>박제 게시판 관리</CardTitle>
                  <CardDescription className="text-slate-400">
                    신고된 유저 관리 및 삭제
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/board/shame">
                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
                  박제 게시판 보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
