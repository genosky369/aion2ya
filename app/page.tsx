'use client';

import { useSearchParams } from 'next/navigation';
import FAQSection from '@/components/FAQSection';
import YoutubeVideos from '@/components/YoutubeVideos';
import SideInfo from '@/components/SideInfo';

export default function Home() {
  const searchParams = useSearchParams();
  const design = searchParams.get('design') || 'default';

  // 디자인별 색상 클래스
  const getStyles = () => {
    switch (design) {
      case 'A':
        return {
          banner: 'bg-gradient-to-r from-blue-600 to-purple-600',
          bannerText: 'text-white',
          bannerSubtext: 'text-blue-100',
          card: 'bg-black border border-gray-900',
          cardHover: 'hover:border-gray-800',
          cardText: 'text-white',
          cardSubtext: 'text-gray-500',
          notice: 'bg-blue-600 bg-opacity-10 border border-blue-600',
          noticeText: 'text-blue-400',
          link: 'bg-black hover:bg-gray-900 border border-gray-900 hover:border-gray-800',
        };
      case 'B':
        return {
          banner: 'bg-gradient-to-r from-cyan-500 via-blue-600 to-pink-600',
          bannerText: 'text-white',
          bannerSubtext: 'text-cyan-100',
          card: 'bg-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/10',
          cardHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
          cardText: 'text-cyan-100',
          cardSubtext: 'text-cyan-500/70',
          notice: 'bg-cyan-500/10 border border-cyan-500/50',
          noticeText: 'text-cyan-300',
          link: 'bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/10',
        };
      case 'C':
        return {
          banner: 'bg-gradient-to-r from-blue-600 to-blue-500',
          bannerText: 'text-white',
          bannerSubtext: 'text-blue-100',
          card: 'bg-zinc-800 border border-zinc-700 shadow-md',
          cardHover: 'hover:bg-zinc-750 hover:border-zinc-600',
          cardText: 'text-zinc-100',
          cardSubtext: 'text-zinc-400',
          notice: 'bg-blue-600/10 border border-blue-600',
          noticeText: 'text-blue-400',
          link: 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 shadow-md',
        };
      default:
        return {
          banner: 'bg-gradient-to-r from-blue-600 to-blue-800',
          bannerText: 'text-white',
          bannerSubtext: 'text-blue-100',
          card: 'bg-gray-800',
          cardHover: 'hover:bg-gray-700',
          cardText: 'text-white',
          cardSubtext: 'text-gray-400',
          notice: 'bg-blue-600 bg-opacity-20 border border-blue-600',
          noticeText: 'text-blue-400',
          link: 'bg-gray-800 hover:bg-gray-700',
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 웰컴 배너 */}
      <div className={`mb-8 ${styles.banner} rounded-lg p-8 text-center`}>
        <h1 className={`text-4xl md:text-5xl font-bold ${styles.bannerText} mb-4`}>
          아이온2야에 오신 것을 환영합니다!
        </h1>
        <p className={`${styles.bannerSubtext} text-lg`}>
          아이온2 게임 정보와 커뮤니티의 모든 것
        </p>
      </div>

      {/* 3단 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 좌측: FAQ */}
        <div className="lg:col-span-3">
          <FAQSection />
        </div>

        {/* 중앙: 공지사항 */}
        <div className="lg:col-span-6">
          <div className={`${styles.card} rounded-lg p-6 mb-6 transition-colors ${styles.cardHover}`}>
            <h2 className={`text-2xl font-bold ${styles.cardText} mb-4`}>📢 공지사항</h2>
            <div className="space-y-3">
              <div className={`${styles.notice} rounded-lg p-4 transition-all`}>
                <p className={`${styles.noticeText} font-medium mb-2`}>🎮 아이온2 정식 출시 임박!</p>
                <p className={`${styles.cardSubtext} text-sm`}>
                  2025년 11월 19일 정식 출시 예정입니다. 사전 다운로드는 11월 17일부터!
                </p>
              </div>
              <div className={`${styles.card} rounded-lg p-4 transition-colors ${styles.cardHover}`}>
                <p className={`${styles.cardText} font-medium mb-2`}>📊 패키지 효율 계산기 준비 중</p>
                <p className={`${styles.cardSubtext} text-sm`}>
                  인앱 패키지의 효율을 한눈에! 곧 만나보실 수 있습니다.
                </p>
              </div>
              <div className={`${styles.card} rounded-lg p-4 transition-colors ${styles.cardHover}`}>
                <p className={`${styles.cardText} font-medium mb-2`}>💬 커뮤니티 오픈</p>
                <p className={`${styles.cardSubtext} text-sm`}>
                  게시판과 건의사항 게시판이 오픈되었습니다. 자유롭게 소통해주세요!
                </p>
              </div>
            </div>
          </div>

          {/* 유튜브 영상 */}
          <YoutubeVideos />
        </div>

        {/* 우측: 출시 정보 & 플랫폼 */}
        <div className="lg:col-span-3">
          <SideInfo />
        </div>
      </div>

      {/* 빠른 링크 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={`/board?design=${design}`}
          className={`${styles.link} rounded-lg p-6 transition-all text-center`}
        >
          <div className="text-4xl mb-3">📝</div>
          <h3 className={`text-xl font-bold ${styles.cardText} mb-2`}>게시판</h3>
          <p className={`${styles.cardSubtext} text-sm`}>관리자의 공지와 정보를 확인하세요</p>
        </a>
        <a
          href={`/suggestion?design=${design}`}
          className={`${styles.link} rounded-lg p-6 transition-all text-center`}
        >
          <div className="text-4xl mb-3">💡</div>
          <h3 className={`text-xl font-bold ${styles.cardText} mb-2`}>건의사항</h3>
          <p className={`${styles.cardSubtext} text-sm`}>자유롭게 의견을 남겨주세요</p>
        </a>
        <a
          href={`/calculator?design=${design}`}
          className={`${styles.link} rounded-lg p-6 transition-all text-center`}
        >
          <div className="text-4xl mb-3">🧮</div>
          <h3 className={`text-xl font-bold ${styles.cardText} mb-2`}>패키지 효율</h3>
          <p className={`${styles.cardSubtext} text-sm`}>패키지 효율을 계산해보세요</p>
        </a>
      </div>
    </div>
  );
}
