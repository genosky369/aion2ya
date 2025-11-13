'use client'

import Link from 'next/link'
import { Eye, MessageCircle, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { articles } from '@/data/articles'
import { contentConfig } from '@/config/content-config'

export default function ArticleList() {
  const { articles: config } = contentConfig.home

  const getCategoryColor = (color: string) => {
    const colorMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      blue: 'default',
      green: 'secondary',
      purple: 'outline',
    }
    return colorMap[color] || 'default'
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
            {config.title}
          </h2>
          <p className="text-muted-foreground">
            {config.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <Card className="p-6 hover:border-primary hover:shadow-md transition-all cursor-pointer bg-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getCategoryColor(article.categoryColor)}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {article.publishedAt}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors text-card-foreground">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {article.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes}
                      </span>
                      <span className="ml-auto">
                        작성자: {article.author}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
