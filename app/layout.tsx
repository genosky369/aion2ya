import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VisitorTracker from '@/components/VisitorTracker';

export const metadata: Metadata = {
  title: '아이온2야 - 아이온2 커뮤니티 & 정보 사이트',
  description: '아이온2 게임 정보, 패키지 효율 계산기, 커뮤니티 게시판을 제공하는 아이온2 종합 정보 사이트입니다.',
  keywords: ['아이온2', 'AION2', '엔씨소프트', 'MMORPG', '패키지효율', '커뮤니티'],
  openGraph: {
    title: '아이온2야 - 아이온2 커뮤니티 & 정보 사이트',
    description: '아이온2 게임 정보, 패키지 효율 계산기, 커뮤니티 게시판',
    url: 'https://www.aion2ya.com',
    siteName: '아이온2야',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <ThemeProvider>
            <VisitorTracker />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
