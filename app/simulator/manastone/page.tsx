'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MANA_STONE_DATA,
  NORMAL_ITEMS,
  GRADE_ORDER,
  GRADE_COLORS
} from '@/lib/data/manaStoneData';
import { Calculator, Info } from 'lucide-react';

const THEME = {
  bg: 'from-slate-950 via-slate-900 to-slate-950',
  card: 'bg-slate-900/50 border-slate-800/50',
  cardHover: 'hover:bg-slate-800/50 hover:border-slate-700/50',
};

export default function ManaStoneCalculator() {
  // 상태
  const [selectedItem, setSelectedItem] = useState<string>('상급 심연의 마석');
  const [minGrade, setMinGrade] = useState<string>('기본');
  const [slotCount, setSlotCount] = useState<number>(3); // 스탯 슬롯 개수 (장비 등급에 따라 1~5)
  const [requiredCount, setRequiredCount] = useState<number>(1);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);

  // 선택된 아이템의 데이터
  const itemData = useMemo(() => {
    return MANA_STONE_DATA[selectedItem];
  }, [selectedItem]);

  // 사용 가능한 등급 목록
  const availableGrades = useMemo(() => {
    if (!itemData) return [];
    return GRADE_ORDER.filter(grade => itemData.grades[grade]);
  }, [itemData]);

  // 사용 가능한 스탯 목록 (선택된 등급 이상에서)
  const availableStats = useMemo(() => {
    if (!itemData) return [];

    const statsSet = new Set<string>();
    const minGradeIndex = GRADE_ORDER.indexOf(minGrade);

    GRADE_ORDER.forEach((grade, index) => {
      if (index >= minGradeIndex && itemData.grades[grade]) {
        itemData.grades[grade].stats.forEach(stat => {
          statsSet.add(stat.name);
        });
      }
    });

    return Array.from(statsSet);
  }, [itemData, minGrade]);

  // 아이템 변경 핸들러
  const handleItemChange = useCallback((item: string) => {
    setSelectedItem(item);
    setSelectedStats([]);
  }, []);

  // 등급 변경 핸들러
  const handleGradeChange = useCallback((grade: string) => {
    setMinGrade(grade);
  }, []);

  // 슬롯 개수 변경 핸들러
  const handleSlotCountChange = useCallback((count: number) => {
    setSlotCount(count);
    // 슬롯 개수가 줄어들면 필요 개수도 조정
    if (requiredCount > count) {
      setRequiredCount(count);
    }
  }, [requiredCount]);

  // 필요 개수 변경 핸들러
  const handleRequiredCountChange = useCallback((count: number) => {
    setRequiredCount(count);
  }, []);

  // 스탯 토글
  const toggleStat = useCallback((stat: string) => {
    setSelectedStats(prev =>
      prev.includes(stat)
        ? prev.filter(s => s !== stat)
        : [...prev, stat]
    );
  }, []);

  // 성공 확률 계산
  const calculateSuccessProbability = useMemo(() => {
    if (!itemData || selectedStats.length === 0) return 0;

    const minGradeIndex = GRADE_ORDER.indexOf(minGrade);

    // 각 스탯이 나올 확률 계산 (등급 조건 포함)
    let statProbabilities: number[] = [];

    selectedStats.forEach(statName => {
      let statProb = 0;

      GRADE_ORDER.forEach((grade, index) => {
        if (index >= minGradeIndex && itemData.grades[grade]) {
          const statData = itemData.grades[grade].stats.find(s => s.name === statName);
          if (statData) {
            statProb += statData.probability;
          }
        }
      });

      statProbabilities.push(statProb);
    });

    // slotCount번 뽑기에서 requiredCount개 이상 성공할 확률
    const n = slotCount;
    const k = requiredCount;

    // 선택한 스탯 중 하나라도 나올 확률
    const anyStatProb = Math.min(1, statProbabilities.reduce((a, b) => a + b, 0));

    // n번 중 k번 이상 성공할 확률 (이항분포 누적)
    let successProb = 0;
    for (let i = k; i <= n; i++) {
      const combination = factorial(n) / (factorial(i) * factorial(n - i));
      successProb += combination * Math.pow(anyStatProb, i) * Math.pow(1 - anyStatProb, n - i);
    }

    return successProb;
  }, [itemData, selectedStats, minGrade, requiredCount, slotCount]);

  // 기댓값 계산
  const expectedAttempts = useMemo(() => {
    if (calculateSuccessProbability <= 0) return Infinity;
    return 1 / calculateSuccessProbability;
  }, [calculateSuccessProbability]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME.bg} text-white`}>
      <main className="container mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">마석/영석 계산기</h1>
          <p className="text-slate-400 mt-2">자동 각인 기댓값 계산</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 설정 패널 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: 재료 선택 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-sm">1</span>
                  재료 선택
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {NORMAL_ITEMS.map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleItemChange(item)}
                      className={`text-xs h-auto py-3 px-3 rounded-md border transition-all ${
                        selectedItem === item
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: 등급 설정 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-sm">2</span>
                  최소 등급 설정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {availableGrades.map(grade => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => handleGradeChange(grade)}
                      className={`py-2 px-4 rounded-md border transition-all ${
                        minGrade === grade
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                      } ${GRADE_COLORS[grade]}`}
                    >
                      {grade} 이상
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  선택한 등급 이상의 옵션만 성공으로 인정합니다.
                </p>
              </CardContent>
            </Card>

            {/* Step 3: 스탯 슬롯 개수 설정 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-sm">3</span>
                  스탯 슬롯 개수 설정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5].map(count => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleSlotCountChange(count)}
                      className={`py-2 px-4 rounded-md border transition-all ${
                        slotCount === count
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      {count}개
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  장비 등급에 따라 부여되는 스탯 슬롯 개수를 선택합니다.
                </p>
              </CardContent>
            </Card>

            {/* Step 4: 필요 개수 설정 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-sm">4</span>
                  필요 개수 설정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: slotCount }, (_, i) => i + 1).map(count => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => handleRequiredCountChange(count)}
                      className={`py-2 px-4 rounded-md border transition-all ${
                        requiredCount === count
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      {count === slotCount ? `${count}개` : `${count}개 이상`}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {slotCount}개 슬롯 중 몇 개의 원하는 옵션이 필요한지 선택합니다.
                </p>
              </CardContent>
            </Card>

            {/* Step 5: 옵션 선택 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-sm">5</span>
                  원하는 옵션 선택
                  <Badge variant="outline" className="ml-2">{selectedStats.length}개 선택</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableStats.map(stat => (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => toggleStat(stat)}
                      className={`text-xs h-auto py-2 px-3 rounded-md border transition-all ${
                        selectedStats.includes(stat)
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
                {selectedStats.length === 0 && (
                  <p className="text-yellow-500 text-sm mt-2">옵션을 1개 이상 선택해주세요.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 결과 패널 */}
          <div className="space-y-6">
            {/* 기댓값 계산 */}
            <Card className={`${THEME.card} border backdrop-blur-xl`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  계산 결과
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">1회 성공 확률</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {(calculateSuccessProbability * 100).toFixed(4)}%
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">평균 시도 횟수 (기댓값)</div>
                  <div className="text-2xl font-bold text-green-400">
                    {expectedAttempts === Infinity ? '-' : expectedAttempts.toFixed(1)}회
                  </div>
                </div>

                {selectedStats.length > 0 && (
                  <div className="text-xs text-slate-500">
                    <Info className="w-4 h-4 inline mr-1" />
                    {slotCount}개 슬롯에서 선택한 옵션이 {requiredCount}개{requiredCount < slotCount ? ' 이상' : ''} {minGrade} 등급 이상으로 나올 확률
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
