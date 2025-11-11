'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

// Option B: 사이버 네온 글로우
export default function HeaderB() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: '홈', href: '/' },
    { name: '게시판', href: '/board' },
    { name: '건의사항', href: '/suggestion' },
    { name: '패키지 효율', href: '/calculator' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const currentPath = pathname.includes('board') ? '/board' : '/suggestion';
      window.location.href = `${currentPath}?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-slate-950 border-b border-cyan-500/30 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 - 네온 글로우 */}
          <Link href="/?design=B" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* 글로우 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <Zap className="w-6 h-6 text-white" fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent leading-none">
                AION2YA
              </span>
              <span className="text-[10px] text-cyan-500/70 font-medium tracking-widest">
                CYBER ZONE
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 - 네온 스타일 */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href + '?design=B'}
                className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-cyan-400/70 hover:text-cyan-300'
                }`}
              >
                {isActive(item.href) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-lg blur opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 rounded-lg"></div>
                  </>
                )}
                <span className="relative">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* 검색바 & 모바일 메뉴 */}
          <div className="flex items-center space-x-4">
            {(pathname.includes('/board') || pathname.includes('/suggestion')) && (
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 px-4 py-2 pl-10 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-lg shadow-cyan-500/10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
                </div>
              </form>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-cyan-400 hover:text-cyan-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/30">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href + '?design=B'}
                  onClick={() => setIsMenuOpen(false)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-cyan-400/70 hover:text-cyan-300'
                  }`}
                >
                  {isActive(item.href) && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-lg blur opacity-60"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 rounded-lg"></div>
                    </>
                  )}
                  <span className="relative">{item.name}</span>
                </Link>
              ))}
            </nav>

            {(pathname.includes('/board') || pathname.includes('/suggestion')) && (
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-sm text-cyan-100 placeholder-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
