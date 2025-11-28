'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft, Calendar, Server, Users } from 'lucide-react';
import { supabase, ShamePost } from '@/lib/supabase';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  accent: 'from-red-600 to-orange-600',
};

interface ShamePostWithCount extends ShamePost {
  calculatedReportCount: number;
}

export default function ShamePostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<ShamePostWithCount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  async function fetchPost() {
    try {
      // 현재 글 가져오기
      const { data, error } = await supabase
        .from('shame_posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      // 동일 유저의 총 신고 글 개수 계산
      const { count, error: countError } = await supabase
        .from('shame_posts')
        .select('*', { count: 'exact', head: true })
        .eq('player_id', data.player_id)
        .eq('server', data.server)
        .eq('race', data.race);

      if (countError) throw countError;

      setPost({
        ...data,
        calculatedReportCount: count || 1
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('게시글을 불러올 수 없습니다.');
      router.push('/board/shame');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
          <p className="text-slate-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white flex items-center justify-center`}>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* 뒤로가기 */}
        <Link href="/board/shame">
          <Button variant="ghost" className="mb-6 hover:bg-slate-800/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
        </Link>

        {/* 헤더 카드 */}
        <Card className={`${THEME.card} border backdrop-blur-xl mb-6`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-bold text-2xl px-6 py-2">
                {post.player_id}
              </Badge>
              <Badge variant="outline" className="border-red-700 text-red-400 text-lg px-4 py-2">
                신고 {post.calculatedReportCount}회
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4" />
                <span>{post.server}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{post.race}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 신고 사유 */}
        <Card className={`${THEME.card} border backdrop-blur-xl mb-6`}>
          <CardHeader>
            <CardTitle className="text-xl">신고 사유</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.reason}
            </p>
          </CardContent>
        </Card>

        {/* 스크린샷 */}
        {post.screenshot_url && (
          <Card className={`${THEME.card} border backdrop-blur-xl mb-6`}>
            <CardHeader>
              <CardTitle className="text-xl">증거 스크린샷</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={post.screenshot_url}
                alt="증거 스크린샷"
                className="w-full rounded-lg border border-slate-700"
              />
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
