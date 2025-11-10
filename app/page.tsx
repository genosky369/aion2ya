import FAQSection from '@/components/FAQSection';
import YoutubeVideos from '@/components/YoutubeVideos';
import SideInfo from '@/components/SideInfo';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 웰컴 배너 */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          아이온2야에 오신 것을 환영합니다!
        </h1>
        <p className="text-blue-100 text-lg">
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
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">📢 공지사항</h2>
            <div className="space-y-3">
              <div className="bg-blue-600 bg-opacity-20 border border-blue-600 rounded-lg p-4 hover:bg-opacity-30 transition-all">
                <p className="text-blue-400 font-medium mb-2">🎮 아이온2 정식 출시 임박!</p>
                <p className="text-gray-300 text-sm">
                  2025년 11월 19일 정식 출시 예정입니다. 사전 다운로드는 11월 17일부터!
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                <p className="text-white font-medium mb-2">📊 패키지 효율 계산기 준비 중</p>
                <p className="text-gray-300 text-sm">
                  인앱 패키지의 효율을 한눈에! 곧 만나보실 수 있습니다.
                </p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                <p className="text-white font-medium mb-2">💬 커뮤니티 오픈</p>
                <p className="text-gray-300 text-sm">
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
          href="/board"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors text-center"
        >
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-xl font-bold text-white mb-2">게시판</h3>
          <p className="text-gray-400 text-sm">관리자의 공지와 정보를 확인하세요</p>
        </a>
        <a
          href="/suggestion"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors text-center"
        >
          <div className="text-4xl mb-3">💡</div>
          <h3 className="text-xl font-bold text-white mb-2">건의사항</h3>
          <p className="text-gray-400 text-sm">자유롭게 의견을 남겨주세요</p>
        </a>
        <a
          href="/calculator"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors text-center"
        >
          <div className="text-4xl mb-3">🧮</div>
          <h3 className="text-xl font-bold text-white mb-2">패키지 효율</h3>
          <p className="text-gray-400 text-sm">패키지 효율을 계산해보세요</p>
        </a>
      </div>
    </div>
  );
}
