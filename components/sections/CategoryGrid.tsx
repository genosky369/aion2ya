'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { Card } from '@/components/ui/card'
import { categories } from '@/data/categories'
import { contentConfig } from '@/config/content-config'
import { cn } from '@/lib/utils'

export default function CategoryGrid() {
  const { categories: config } = contentConfig.home

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
      green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30',
      purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
      orange: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30',
      teal: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30',
      red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30',
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
            {config.title}
          </h2>
          <p className="text-muted-foreground">
            {config.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = Icons[category.icon as keyof typeof Icons] as any

            return (
              <Link key={category.id} href={category.href}>
                <Card className="p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full bg-card">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'p-3 rounded-lg',
                      getColorClasses(category.color)
                    )}>
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 text-card-foreground">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.count}개 문서
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
