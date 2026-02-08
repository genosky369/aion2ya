'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollText, Swords, FlaskConical } from 'lucide-react';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50 hover:scale-[1.02]',
};

const specs = [
  {
    title: '장비 슬롯 강화',
    description: '슬롯 기반 강화 시스템 기획서 v0.5 · 시뮬레이터 · 데이터 테이블 8종',
    href: '/spec/slot-enhance',
    icon: Swords,
    gradient: 'from-violet-600 to-purple-600',
    tags: ['시스템 설계', '시뮬레이터', 'v0.5'],
  },
];

export default function SpecListPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg">
              <ScrollText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">기획서</h1>
              <p className="text-slate-400 mt-1">마법기사 키우기 - 시스템 기획 & 시뮬레이터</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec) => (
            <Link key={spec.href} href={spec.href}>
              <Card className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all cursor-pointer h-full`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.gradient} flex items-center justify-center mb-4`}>
                    <spec.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{spec.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {spec.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {spec.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}

          {/* 추가 예정 카드 */}
          <Card className={`${THEME.card} border backdrop-blur-xl opacity-50`}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-slate-500" />
              </div>
              <CardTitle className="text-xl text-slate-500">추가 예정</CardTitle>
              <CardDescription className="text-slate-600">
                더 많은 시스템 기획서가 추가될 예정입니다
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
