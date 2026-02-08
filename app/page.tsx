'use client';

import Link from 'next/link';
import { ArrowRight, ScrollText } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* 배경 애니메이션 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* 로고 */}
          <div className="mb-8 inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
              <span className="text-3xl font-bold">A2</span>
            </div>
          </div>

          {/* 바로가기 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/devlog"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/60 backdrop-blur-sm rounded-xl font-semibold border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <span className="text-slate-300 group-hover:text-white transition-colors">개발일지 보기</span>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/spec"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800/60 backdrop-blur-sm rounded-xl font-semibold border border-slate-700 hover:border-violet-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <ScrollText className="w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-all" />
              <span className="text-slate-300 group-hover:text-white transition-colors">기획서 & 시뮬레이터</span>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* 소셜 링크 (선택사항 - 필요시 활성화) */}
          {/* <div className="mt-16 flex gap-6 justify-center">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
              </svg>
            </a>
          </div> */}
        </div>
      </div>

      {/* 푸터 - 숨겨진 아이콘 */}
      <footer className="relative z-10 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-slate-500">
            <p>© 2025 AION2YA. All rights reserved.</p>
          </div>
        </div>

        {/* 레거시 사이트 접근 링크 */}
        <Link
          href="/legacy-home"
          className="absolute left-4 bottom-4 text-slate-500 hover:text-blue-400 transition-colors duration-300 text-sm group"
          title="Legacy Site"
        >
          <span className="underline decoration-dotted underline-offset-4">기존 사이트 방문하기</span>
        </Link>
      </footer>
    </div>
  );
}
