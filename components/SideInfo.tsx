'use client';

import { SITE_INFO, RELEASE_INFO } from '@/lib/constants';
import { Calendar, Download, MessageCircle, Gamepad2 } from 'lucide-react';

export default function SideInfo() {
  return (
    <div className="space-y-6">
      {/* 오픈채팅 배너 */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-6 hover:shadow-lg hover:shadow-yellow-500/50 transition-all cursor-pointer">
        <div className="flex items-center space-x-3 mb-3">
          <MessageCircle className="w-6 h-6 text-gray-900" />
          <h3 className="text-xl font-bold text-gray-900">오픈채팅</h3>
        </div>
        <p className="text-gray-900 text-sm mb-4">
          아이온2 유저들과 실시간으로 소통하세요!
        </p>
        <a
          href={SITE_INFO.openChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gray-900 text-yellow-400 text-center py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          참여하기
        </a>
      </div>

      {/* 출시 정보 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">출시 정보</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Gamepad2 className="w-4 h-4 text-green-400" />
              <p className="text-xs text-gray-400">정식 출시</p>
            </div>
            <p className="text-lg font-bold text-white">{RELEASE_INFO.officialRelease}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Download className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-gray-400">사전 다운로드</p>
            </div>
            <p className="text-lg font-bold text-white">{RELEASE_INFO.preDownload}</p>
          </div>
        </div>
      </div>

      {/* 플랫폼 정보 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">지원 플랫폼</h3>
        <div className="space-y-2">
          {RELEASE_INFO.platforms.map((platform, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg text-center font-medium ${
                platform.includes('예정')
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>

      {/* 사이트 정보 */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">사이트 소개</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {SITE_INFO.description}
        </p>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>출시일: {SITE_INFO.launchDate}</span>
        </div>
      </div>
    </div>
  );
}
