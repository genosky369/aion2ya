'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { supabase, Update } from '@/lib/supabase';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
  accent: 'from-blue-600 to-violet-600',
  badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function AdminUpdatesPage() {
  const router = useRouter();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 관리자 인증 확인
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchUpdates();
  }, [router]);

  async function fetchUpdates() {
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUpdates(data || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('정말 이 업데이트를 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('업데이트가 삭제되었습니다.');
      fetchUpdates(); // 목록 새로고침
    } catch (error) {
      console.error('Error deleting update:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      {/* 헤더 */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="hover:bg-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                대시보드로 돌아가기
              </Button>
            </Link>
            <Link href="/admin/updates/new">
              <Button className={`bg-gradient-to-r ${THEME.accent} hover:opacity-90`}>
                <Plus className="w-4 h-4 mr-2" />
                새 업데이트 작성
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">업데이트 관리</h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-400">로딩 중...</p>
          </div>
        ) : updates.length === 0 ? (
          <Card className={`${THEME.card} border backdrop-blur-xl`}>
            <CardContent className="py-20 text-center">
              <p className="text-slate-400 text-lg mb-4">작성된 업데이트가 없습니다.</p>
              <Link href="/admin/updates/new">
                <Button className={`bg-gradient-to-r ${THEME.accent} hover:opacity-90`}>
                  <Plus className="w-4 h-4 mr-2" />
                  첫 업데이트 작성하기
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <Card key={update.id} className={`${THEME.card} border backdrop-blur-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={THEME.badge}>
                          {update.category}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {new Date(update.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{update.title}</h3>
                      <p className="text-slate-400 line-clamp-2">{update.content}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/updates/edit/${update.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 hover:bg-slate-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-700 hover:bg-red-900/20 text-red-400"
                        onClick={() => handleDelete(update.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
