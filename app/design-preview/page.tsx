'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Briefcase, Check } from 'lucide-react';

export default function DesignPreviewPage() {
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const designs = [
    {
      id: 'A',
      name: '미니멀 모던 다크',
      icon: Sparkles,
      description: '순수한 검정 배경에 블루/퍼플 그라데이션 강조',
      features: ['깔끔한 디자인', '가독성 우수', '심플한 아이콘', '화이트 텍스트'],
      preview: {
        bg: 'bg-black',
        accent: 'from-blue-500 to-purple-600',
        text: 'text-white',
        border: 'border-gray-800',
      },
    },
    {
      id: 'B',
      name: '사이버 네온 글로우',
      icon: Zap,
      description: '다크 네이비에 네온 블루/핑크 글로우 효과',
      features: ['화려한 효과', '네온 강조색', '미래지향적', '글로우 애니메이션'],
      preview: {
        bg: 'bg-slate-950',
        accent: 'from-cyan-400 via-blue-500 to-pink-500',
        text: 'text-cyan-300',
        border: 'border-cyan-500/50',
      },
    },
    {
      id: 'C',
      name: '프로페셔널 클린',
      icon: Briefcase,
      description: '밝은 다크 그레이에 블루 강조색',
      features: ['비즈니스 느낌', '카드 레이아웃', '프로페셔널', '안정적인 색상'],
      preview: {
        bg: 'bg-zinc-900',
        accent: 'from-blue-600 to-blue-400',
        text: 'text-zinc-100',
        border: 'border-zinc-700',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* 헤더 */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            디자인 선택
          </h1>
          <p className="text-xl text-gray-400">
            마음에 드는 디자인을 선택하세요
          </p>
        </div>

        {/* 디자인 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {designs.map((design) => {
            const Icon = design.icon;
            const isSelected = selectedDesign === design.id;

            return (
              <div
                key={design.id}
                onClick={() => setSelectedDesign(design.id)}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* 선택 표시 */}
                {isSelected && (
                  <div className="absolute -top-3 -right-3 z-20">
                    <div className="bg-green-500 rounded-full p-2 shadow-lg animate-bounce">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {/* 카드 */}
                <div
                  className={`relative h-full border-2 rounded-2xl overflow-hidden transition-all ${
                    isSelected
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/50'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {/* 프리뷰 영역 */}
                  <div className={`${design.preview.bg} p-8 relative overflow-hidden`}>
                    {/* 배경 효과 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${design.preview.accent} opacity-10`}
                    />

                    {/* 미니 프리뷰 */}
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-6">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${design.preview.accent}`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className={`text-2xl font-bold ${design.preview.text}`}>
                            AION2YA
                          </div>
                          <div className="text-xs text-gray-500">AION 2 COMMUNITY</div>
                        </div>
                      </div>

                      {/* 미니 카드들 */}
                      <div className="space-y-3">
                        <div
                          className={`${design.preview.bg} border ${design.preview.border} rounded-lg p-4 backdrop-blur`}
                        >
                          <div className={`text-sm font-medium ${design.preview.text}`}>
                            게시글 제목 예시
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            게시글 내용 미리보기...
                          </div>
                        </div>
                        <div
                          className={`${design.preview.bg} border ${design.preview.border} rounded-lg p-3 backdrop-blur`}
                        >
                          <div className={`text-xs ${design.preview.text} opacity-80`}>
                            버튼 및 UI 요소 예시
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 정보 영역 */}
                  <div className="bg-gray-900 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{design.name}</h3>
                      <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full">
                        Option {design.id}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{design.description}</p>

                    {/* 특징 */}
                    <div className="space-y-2">
                      {design.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${design.preview.accent}`}
                          />
                          <span className="text-xs text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 호버 오버레이 */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${design.preview.accent} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 선택 버튼 */}
        {selectedDesign && (
          <div className="text-center">
            <div className="inline-flex flex-col items-center space-y-4 bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <p className="text-gray-400">
                <span className="font-bold text-white">Option {selectedDesign}</span>를
                선택하셨습니다
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/?design=${selectedDesign}`}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  이 디자인으로 미리보기
                </Link>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
                >
                  다시 선택
                </button>
              </div>
            </div>
          </div>
        )}

        {!selectedDesign && (
          <div className="text-center">
            <p className="text-gray-500">↑ 원하는 디자인을 클릭하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
