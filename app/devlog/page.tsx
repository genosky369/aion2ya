'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Devlog } from '@/types';
import { Loader2, Calendar, Tag, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DevlogPage() {
  const [devlogs, setDevlogs] = useState<Devlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchDevlogs();
  }, []);

  const fetchDevlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('devlogs')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const logs = data || [];
      setDevlogs(logs);

      const tags = new Set<string>();
      logs.forEach((log) => log.tags?.forEach((t: string) => tags.add(t)));
      setAllTags(Array.from(tags).sort());
    } catch (error) {
      console.error('개발일지 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevlogs = selectedTag
    ? devlogs.filter((d) => d.tags?.includes(selectedTag))
    : devlogs;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">개발일지</h1>
        <p className="text-gray-400">
          AI와 함께하는 게임 기획 작업의 일일 기록
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !selectedTag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            전체
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                tag === selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredDevlogs.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">
            {selectedTag
              ? `"${selectedTag}" 태그의 개발일지가 없습니다.`
              : '아직 작성된 개발일지가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDevlogs.map((devlog) => (
            <Link
              key={devlog.id}
              href={`/devlog/${devlog.date}`}
              className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700 hover:border-gray-600"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-white mb-2 truncate">
                    {devlog.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {devlog.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {devlog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {devlog.view_count}
                    </span>
                    {devlog.tags?.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        {devlog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-gray-700 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
