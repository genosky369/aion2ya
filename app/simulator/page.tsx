'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gem, Calculator } from 'lucide-react';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50 hover:scale-[1.02]',
};

const simulators = [
  {
    title: '마석/영석 계산기',
    description: '자동 각인 기댓값 계산',
    href: '/simulator/manastone',
    icon: Gem,
    gradient: 'from-purple-600 to-pink-600',
  },
];

export default function SimulatorPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
              <Calculator className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">시뮬레이터</h1>
              <p className="text-slate-400 mt-1">아이온2 확률 계산 & 시뮬레이션 도구</p>
            </div>
          </div>
        </div>

        {/* 시뮬레이터 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulators.map((sim) => (
            <Link key={sim.href} href={sim.href}>
              <Card className={`${THEME.card} ${THEME.cardHover} border backdrop-blur-xl transition-all cursor-pointer h-full`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sim.gradient} flex items-center justify-center mb-4`}>
                    <sim.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{sim.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {sim.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}

          {/* 추가 예정 카드 */}
          <Card className={`${THEME.card} border backdrop-blur-xl opacity-50`}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-slate-500" />
              </div>
              <CardTitle className="text-xl text-slate-500">추가 예정</CardTitle>
              <CardDescription className="text-slate-600">
                더 많은 시뮬레이터가 추가될 예정입니다
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
