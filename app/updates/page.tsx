'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase, Update } from '@/lib/supabase';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
  badge: {
    '패치': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    '라이브 방송': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    '이벤트': 'bg-green-500/10 text-green-400 border-green-500/20',
    '공지': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
};

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = ['전체', '패치', '라이브 방송', '이벤트', '공지'];

  useEffect(() => {
    fetchUpdates();
  }, []);

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

  const filteredUpdates = selectedCategory === '전체'
    ? updates
    : updates.filter(update => update.category === selectedCategory);

  const totalPages = Math.ceil(filteredUpdates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUpdates = filteredUpdates.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg}`}>
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">업데이트 내역</h1>
          </div>
          <p className="text-slate-400 text-lg">
            AION2의 최신 업데이트와 라이브 방송 요약을 확인하세요.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90'
                  : 'border-slate-700 hover:bg-slate-800 text-white'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* 업데이트 목록 */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-slate-400">로딩 중...</p>
          </div>
        ) : paginatedUpdates.length === 0 ? (
          <Card className={`${THEME.card} border backdrop-blur-xl`}>
            <CardContent className="py-20 text-center">
              <p className="text-slate-400 text-lg">
                {selectedCategory === '전체'
                  ? '작성된 업데이트가 없습니다.'
                  : `${selectedCategory} 카테고리에 작성된 업데이트가 없습니다.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedUpdates.map((update) => (
                <Card
                  key={update.id}
                  className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={THEME.badge[update.category as keyof typeof THEME.badge] || THEME.badge['공지']}>
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
                        <h3 className="text-xl font-bold text-white mb-3">
                          {update.title}
                        </h3>
                        <div className="text-slate-300 whitespace-pre-line">
                          {update.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-slate-700 hover:bg-slate-800 text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90'
                        : 'border-slate-700 hover:bg-slate-800 text-white'
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-slate-700 hover:bg-slate-800 text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
