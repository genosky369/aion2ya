'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navigation } from '@/config/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <span className="text-xl font-bold">A2</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AION2YA</h1>
            <p className="text-[10px] text-muted-foreground">아이온2 정보 & 시뮬레이터</p>
          </div>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            !item.children ? (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white text-white/90"
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white text-white/90"
                >
                  {item.label}
                </Link>
              </div>
            )
          ))}
        </nav>

        {/* 모바일 메뉴 버튼만 */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-white/70 hover:text-white transition-colors text-sm block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
