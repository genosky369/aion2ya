'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import HeaderA from './themes/HeaderA';
import HeaderB from './themes/HeaderB';
import HeaderC from './themes/HeaderC';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const searchParams = useSearchParams();
  const design = searchParams.get('design') || 'B'; // 기본 디자인: Option B (사이버 네온 글로우)

  // 디자인에 따른 배경색 클래스
  const getBackgroundClass = () => {
    switch (design) {
      case 'A':
        return 'bg-black text-white';
      case 'B':
        return 'bg-slate-950 text-cyan-100';
      case 'C':
        return 'bg-zinc-900 text-zinc-100';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  // 디자인에 따른 Footer 스타일
  const getFooterClass = () => {
    switch (design) {
      case 'A':
        return 'bg-black border-gray-900';
      case 'B':
        return 'bg-slate-950 border-cyan-500/30';
      case 'C':
        return 'bg-zinc-900 border-zinc-800';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  const getFooterTextClass = () => {
    switch (design) {
      case 'A':
        return 'text-gray-500';
      case 'B':
        return 'text-cyan-500/50';
      case 'C':
        return 'text-zinc-500';
      default:
        return 'text-gray-400';
    }
  };

  // 디자인에 따른 Header 선택
  const renderHeader = () => {
    switch (design) {
      case 'A':
        return <HeaderA />;
      case 'B':
        return <HeaderB />;
      case 'C':
        return <HeaderC />;
      default:
        return <Header />;
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      {renderHeader()}
      <main className="min-h-screen">{children}</main>
      <footer className={`border-t py-8 mt-16 ${getFooterClass()}`}>
        <div className={`container mx-auto px-4 text-center text-sm ${getFooterTextClass()}`}>
          <p>&copy; 2025 아이온2야.com - 아이온2 커뮤니티 & 정보 사이트</p>
          <p className="mt-2">본 사이트는 NCSOFT와 무관한 팬 사이트입니다.</p>
          <p className="mt-2">
            Contact:{' '}
            <a
              href="mailto:aion2ya.com@gmail.com"
              className={`transition-colors ${
                design === 'A'
                  ? 'text-blue-500 hover:text-blue-400'
                  : design === 'B'
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : design === 'C'
                  ? 'text-blue-500 hover:text-blue-400'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              aion2ya.com@gmail.com
            </a>
          </p>
          {design && design !== 'default' && (
            <p className="mt-4 text-xs opacity-50">
              현재 디자인: Option {design} |{' '}
              <a href="/design-preview" className="underline hover:opacity-100">
                다른 디자인 보기
              </a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}
