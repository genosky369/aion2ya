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

export default function ShamePostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<ShamePost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('shame_posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setPost(data);
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
                신고 {post.report_count}회
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

        {/* 추가 신고 버튼 */}
        <Card className={`${THEME.card} border backdrop-blur-xl`}>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-slate-400 mb-4">
                이 플레이어에게 피해를 입으셨나요?
              </p>
              <Button
                className={`bg-gradient-to-r ${THEME.accent} hover:opacity-90`}
                onClick={async () => {
                  if (confirm('동일 플레이어를 추가 신고하시겠습니까?')) {
                    try {
                      const { error } = await supabase
                        .from('shame_posts')
                        .update({ report_count: post.report_count + 1 })
                        .eq('id', post.id);

                      if (error) throw error;

                      alert('신고가 접수되었습니다.');
                      fetchPost(); // 새로고침
                    } catch (error) {
                      console.error('Error updating report count:', error);
                      alert('신고 중 오류가 발생했습니다.');
                    }
                  }
                }}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                추가 신고하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
