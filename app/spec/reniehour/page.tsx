'use client';

import Link from 'next/link';
import { ExternalLink, Play } from 'lucide-react';

export default function ReniehourSpecPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">홈</Link>
            <span>/</span>
            <Link href="/spec" className="hover:text-white transition-colors">기획서</Link>
            <span>/</span>
            <span className="text-gray-300">레니아워의 메타 대법관</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            레니아워의 메타 대법관
          </h1>
          <p className="text-gray-400">
            E-sports 예측 시뮬레이션 프로토타입 | 인터넷 방송 스타일 스트리머 육성 게임
          </p>
        </div>

        {/* Simulator */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">프로토타입 시뮬레이터</span>
            </div>
            <a
              href="/simulators/reniehour/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              새 탭에서 열기 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <iframe
            src="/simulators/reniehour/index.html"
            className="w-full border-0"
            style={{ height: 'calc(100vh - 220px)', minHeight: '700px' }}
            title="레니아워의 메타 대법관 시뮬레이터"
          />
        </div>
      </main>
    </div>
  );
}
