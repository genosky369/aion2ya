'use client'

import Link from 'next/link'
import { Search, Moon, Sun, Menu, X, Youtube, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { siteConfig } from '@/config/site-config'
import { navigation } from '@/config/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">{siteConfig.logo.icon}</span>
          <span className="text-xl font-bold">{siteConfig.logo.text}</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 아이콘들 */}
        <div className="flex items-center space-x-1">
          {/* 소셜 링크 */}
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Youtube className="h-4 w-4 text-red-600 dark:text-red-500" />
            </Button>
          </a>
          <a
            href={siteConfig.social.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
            </Button>
          </a>

          {siteConfig.features.search && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-5 w-5" />
            </Button>
          )}
          {siteConfig.features.darkMode && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
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
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* 모바일에서 소셜 링크 */}
            <div className="flex gap-2 pt-3 border-t">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
              >
                <Youtube className="h-4 w-4 text-red-600" />
                유튜브
              </a>
              <a
                href={siteConfig.social.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-yellow-500" />
                카톡방
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
