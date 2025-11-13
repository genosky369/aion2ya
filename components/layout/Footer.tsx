import Link from 'next/link'
import { Youtube, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site-config'
import { footerNavigation } from '@/config/navigation'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 사이트 소개 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">{siteConfig.logo.icon}</span>
              <span className="text-lg font-bold text-foreground">{siteConfig.logo.text}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {siteConfig.description}
            </p>
            {/* 소셜 링크 */}
            <div className="flex gap-2">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
                title="유튜브"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
                title="카카오톡 오픈채팅"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 사이트 정보 */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">사이트 정보</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNavigation.about.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법률 정보 */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">법률 정보</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 커뮤니티 */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">커뮤니티</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNavigation.community.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
