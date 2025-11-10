import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

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
      <body className="bg-gray-900 text-white antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>&copy; 2025 아이온2야.com - 아이온2 커뮤니티 & 정보 사이트</p>
            <p className="mt-2">본 사이트는 NCSOFT와 무관한 팬 사이트입니다.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
