'use client';

import { SITE_INFO, RELEASE_INFO } from '@/lib/constants';
import { Calendar, Download, MessageCircle, Gamepad2 } from 'lucide-react';

export default function SideInfo() {
  return (
    <div className="space-y-6">
      {/* 오픈채팅 배너 */}
      <div className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 rounded-lg p-6 hover:shadow-xl hover:shadow-pink-500/30 transition-all cursor-pointer group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
        <div className="relative">
          <div className="flex items-center space-x-3 mb-3">
            <MessageCircle className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">오픈채팅</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">
            아이온2 유저들과 실시간으로 소통하세요!
          </p>
          <a
            href={SITE_INFO.openChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white/20 backdrop-blur-sm text-white text-center py-2 rounded-lg font-bold hover:bg-white/30 transition-colors border border-white/30"
          >
            참여하기
          </a>
        </div>
      </div>

      {/* 출시 정보 */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-lg shadow-cyan-500/10">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-100">출시 정보</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Gamepad2 className="w-4 h-4 text-green-400" />
              <p className="text-xs text-cyan-500/70">정식 출시</p>
            </div>
            <p className="text-lg font-bold text-cyan-100">{RELEASE_INFO.officialRelease}</p>
          </div>
          <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Download className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-cyan-500/70">사전 다운로드</p>
            </div>
            <p className="text-lg font-bold text-cyan-100">{RELEASE_INFO.preDownload}</p>
          </div>
        </div>
      </div>

      {/* 플랫폼 정보 */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-lg shadow-cyan-500/10">
        <h3 className="text-xl font-bold text-cyan-100 mb-4">지원 플랫폼</h3>
        <div className="space-y-2">
          {RELEASE_INFO.platforms.map((platform, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg text-center font-bold transition-all ${
                platform.includes('예정')
                  ? 'bg-slate-800/50 border border-cyan-500/20 text-cyan-500/50'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
              }`}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>

      {/* 사이트 정보 */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 shadow-lg shadow-cyan-500/10">
        <h3 className="text-xl font-bold text-cyan-100 mb-4">사이트 소개</h3>
        <p className="text-cyan-200/80 text-sm leading-relaxed mb-4">
          {SITE_INFO.description}
        </p>
        <div className="flex items-center space-x-2 text-xs text-cyan-500/70">
          <Calendar className="w-4 h-4" />
          <span>출시일: {SITE_INFO.launchDate}</span>
        </div>
      </div>
    </div>
  );
}
