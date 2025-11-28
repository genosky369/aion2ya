'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  accent: 'from-blue-600 to-violet-600',
};

export default function NewUpdatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    // 관리자 인증 확인
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('updates')
        .insert([formData]);

      if (error) throw error;

      alert('업데이트가 성공적으로 작성되었습니다!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating update:', error);
      alert('업데이트 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      {/* 헤더 */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              대시보드로 돌아가기
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Card className={`${THEME.card} border backdrop-blur-xl`}>
          <CardHeader>
            <CardTitle className="text-3xl">새 업데이트 작성</CardTitle>
            <CardDescription className="text-slate-400">
              업데이트 & 라이브 요약 작성
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="예: 12.5 대형 패치 - 신규 던전 및 밸런스 조정"
                  className="bg-slate-800/50 border-slate-700 focus:border-blue-500"
                />
              </div>

              {/* 카테고리 */}
              <div className="space-y-2">
                <Label htmlFor="category">카테고리 *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 focus:border-blue-500">
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="패치">패치</SelectItem>
                    <SelectItem value="라이브 방송">라이브 방송</SelectItem>
                    <SelectItem value="이벤트">이벤트</SelectItem>
                    <SelectItem value="공지">공지</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content">내용 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  placeholder="업데이트 내용을 작성하세요...

예:
• 신규 레이드 던전 '심연의 성채' 추가
• 클래스 밸런스 대폭 조정 (검사, 마법사 상향)
• 펫 시스템 개편 및 새로운 펫 추가
• 겨울 시즌 이벤트 시작"
                  rows={15}
                  className="bg-slate-800/50 border-slate-700 focus:border-blue-500"
                />
                <p className="text-xs text-slate-500">
                  줄바꿈은 Enter로, 항목은 • 기호로 시작하세요.
                </p>
              </div>

              {/* 버튼 */}
              <div className="flex gap-4 pt-4">
                <Link href="/admin/dashboard" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-700"
                    disabled={loading}
                  >
                    취소
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className={`flex-1 bg-gradient-to-r ${THEME.accent} hover:opacity-90`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      작성 중...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      작성 완료
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
