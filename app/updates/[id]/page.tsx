'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';
import { supabase, Update } from '@/lib/supabase';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  accent: 'from-blue-600 to-violet-600',
  badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function UpdateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [update, setUpdate] = useState<Update | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchUpdate();
    }
  }, [params.id]);

  async function fetchUpdate() {
    try {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setUpdate(data);
    } catch (error) {
      console.error('Error fetching update:', error);
      alert('업데이트를 불러올 수 없습니다.');
      router.push('/updates');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-slate-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white flex items-center justify-center`}>
        <div className="text-center">
          <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">업데이트를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* 뒤로가기 */}
        <Link href="/updates">
          <Button variant="ghost" className="mb-6 hover:bg-slate-800/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
        </Link>

        {/* 헤더 카드 */}
        <Card className={`${THEME.card} border backdrop-blur-xl mb-6`}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Badge className={THEME.badge}>
                {update.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(update.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {update.title}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 본문 */}
        <Card className={`${THEME.card} border backdrop-blur-xl`}>
          <CardContent className="pt-6">
            <div className="prose prose-invert prose-slate max-w-none">
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {update.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex justify-center">
          <Link href="/updates">
            <Button className={`bg-gradient-to-r ${THEME.accent} hover:opacity-90`}>
              목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
