'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { contentConfig } from '@/config/content-config'

export default function HeroSearch() {
  const { hero } = contentConfig.home

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-950 py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          {hero.subtitle}
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={hero.searchPlaceholder}
                className="pl-10 h-12 text-base bg-background"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              검색
            </Button>
          </div>

          {/* 인기 검색어 (선택사항) */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-muted-foreground">인기:</span>
            {['클래스', '레벨링', '던전', '아이템'].map((keyword) => (
              <button
                key={keyword}
                className="text-sm text-primary hover:underline font-medium"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
