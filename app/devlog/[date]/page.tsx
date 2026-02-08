'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Devlog, DevlogWorkItem } from '@/types';
import { Loader2, Calendar, Eye, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORY_STYLES: Record<string, { bg: string; icon: string }> = {
  기획: { bg: 'bg-violet-500/20 text-violet-300 border-violet-500/30', icon: '📋' },
  설계: { bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '🏗️' },
  구현: { bg: 'bg-green-500/20 text-green-300 border-green-500/30', icon: '💻' },
  테스트: { bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', icon: '🧪' },
  인프라: { bg: 'bg-orange-500/20 text-orange-300 border-orange-500/30', icon: '⚙️' },
  기타: { bg: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: '📌' },
};

function parseSlug(slug: string): { date: string; version: number } {
  const vMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-v(\d+)$/);
  if (vMatch) {
    return { date: vMatch[1], version: parseInt(vMatch[2], 10) };
  }
  return { date: slug, version: 1 };
}

export default function DevlogDetailPage() {
  const params = useParams();
  const slug = params.date as string;
  const { date, version } = parseSlug(slug);

  const [devlog, setDevlog] = useState<Devlog | null>(null);
  const [workItems, setWorkItems] = useState<DevlogWorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (date) fetchDevlog();
  }, [date, version]);

  const fetchDevlog = async () => {
    try {
      const { data: devlogData, error: devlogError } = await supabase
        .from('devlogs')
        .select('*')
        .eq('date', date)
        .eq('version', version)
        .single();

      if (devlogError || !devlogData) {
        setNotFound(true);
        return;
      }

      setDevlog(devlogData);

      await supabase
        .from('devlogs')
        .update({ view_count: (devlogData.view_count || 0) + 1 })
        .eq('id', devlogData.id);

      const { data: itemsData } = await supabase
        .from('devlog_work_items')
        .select('*')
        .eq('devlog_id', devlogData.id)
        .order('order_index', { ascending: true });

      setWorkItems(itemsData || []);
    } catch (error) {
      console.error('개발일지 로드 실패:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (notFound || !devlog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">
            해당 날짜의 개발일지를 찾을 수 없습니다.
          </p>
          <Link
            href="/devlog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const groupedItems: Record<string, DevlogWorkItem[]> = {};
  workItems.forEach((item) => {
    if (!groupedItems[item.category]) groupedItems[item.category] = [];
    groupedItems[item.category].push(item);
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/devlog"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        목록으로
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-white">{devlog.title}</h1>
          {devlog.version > 1 && (
            <span className="px-2.5 py-1 rounded text-sm font-mono bg-blue-600/20 text-blue-300 border border-blue-500/30">
              v{String(devlog.version).padStart(2, '0')}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {devlog.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            조회 {devlog.view_count}
          </span>
        </div>
        {devlog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {devlog.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-900/30 to-violet-900/30 border border-blue-800/30 rounded-lg p-5 mb-8">
        <p className="text-gray-200 text-lg leading-relaxed">{devlog.summary}</p>
      </div>

      {Object.keys(groupedItems).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">작업 항목</h2>
          <div className="space-y-3">
            {Object.entries(groupedItems).map(([category, items]) => {
              const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['기타'];
              return (
                <div key={category} className={`rounded-lg border p-4 ${style.bg}`}>
                  <h3 className="font-medium mb-2">
                    {style.icon} {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.id} className="ml-6">
                        <span className="font-medium text-white">
                          {item.title}
                        </span>
                        {item.description && (
                          <p className="text-sm opacity-80 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
          {devlog.content}
        </div>
      </div>
    </div>
  );
}
