'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Hexagon } from 'lucide-react';
import { useState } from 'react';

// Option A: 미니멀 모던 다크
export default function HeaderA() {
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
    <header className="bg-black border-b border-gray-900 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 - 미니멀 디자인 */}
          <Link href="/?design=A" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Hexagon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight leading-none">
                AION2YA
              </span>
              <span className="text-[10px] text-gray-500 font-light tracking-widest">
                COMMUNITY
              </span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 - 깔끔한 스타일 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href + '?design=A'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
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
                    className="w-48 px-4 py-2 pl-10 bg-gray-900 border border-gray-800 rounded-md text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white focus:border-white"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>
              </form>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-900">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href + '?design=A'}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
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
                    className="w-full px-4 py-2 pl-10 bg-gray-900 border border-gray-800 rounded-md text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
