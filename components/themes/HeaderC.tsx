'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';

// Option C: 프로페셔널 클린
export default function HeaderC() {
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
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 - 프로페셔널 디자인 */}
          <Link href="/?design=C" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <Shield className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-zinc-100 leading-none">
                AION2YA
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wider">
                PROFESSIONAL
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 - 클린 스타일 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href + '?design=C'}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                {item.name}
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
                    className="w-48 px-4 py-2 pl-10 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-inner"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                </div>
              </form>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href + '?design=C'}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {item.name}
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
                    className="w-full px-4 py-2 pl-10 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
