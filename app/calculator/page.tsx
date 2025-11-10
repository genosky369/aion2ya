import { Calculator, Clock, Sparkles } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">패키지 효율 계산기</h1>
          <p className="text-gray-400 text-lg">
            아이온2 인앱 패키지의 효율을 한눈에 비교해보세요
          </p>
        </div>

        {/* 준비 중 카드 */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-12 text-center mb-8">
          <Clock className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-white mb-4">곧 만나보실 수 있습니다!</h2>
          <p className="text-blue-100 text-lg mb-6">
            패키지 효율 계산기를 열심히 준비하고 있습니다.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 px-6 py-3 rounded-lg">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">출시 예정일: 2025년 11월 중</span>
          </div>
        </div>

        {/* 기능 소개 */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">제공 예정 기능</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">패키지 효율 분석</h4>
                <p className="text-gray-400 text-sm">
                  모든 인앱 패키지의 가격 대비 효율을 자동으로 계산해드립니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">상세 비교</h4>
                <p className="text-gray-400 text-sm">
                  여러 패키지를 한눈에 비교하여 최적의 선택을 도와드립니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">실시간 업데이트</h4>
                <p className="text-gray-400 text-sm">
                  패키지 정보가 변경되면 자동으로 반영됩니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">추천 시스템</h4>
                <p className="text-gray-400 text-sm">
                  플레이 스타일별 최적의 패키지를 추천해드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 신청 (추후 구현) */}
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">출시 알림 받기</h3>
          <p className="text-gray-400 mb-6">
            패키지 효율 계산기가 출시되면 가장 먼저 알려드립니다!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="email"
              placeholder="이메일 주소 입력 (준비 중)"
              disabled
              className="flex-1 max-w-md px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              disabled
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              신청하기
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            * 알림 신청 기능은 곧 추가될 예정입니다
          </p>
        </div>
      </div>
    </div>
  );
}
