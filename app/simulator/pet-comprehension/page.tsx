'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, RotateCw, Calculator } from 'lucide-react';
import Link from 'next/link';
import {
  PetData,
  SlotData,
  rollSlot,
  rollAllSlots,
  GRADES,
  Grade,
} from '@/lib/pet-simulator';

const GRADE_COLORS = {
  일반: 'bg-gray-500',
  희귀: 'bg-green-500',
  전승: 'bg-blue-500',
  유일: 'bg-purple-500',
  영웅: 'bg-orange-500',
};

export default function PetComprehensionSimulator() {
  const [data, setData] = useState<PetData | null>(null);
  const [species, setSpecies] = useState<string>('지성');
  const [level, setLevel] = useState<string>('1');
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // 데이터 로드
  useEffect(() => {
    fetch('/data/pet-comprehension.json')
      .then((res) => res.json())
      .then((data: PetData) => {
        setData(data);
        // 첫 번째 종족으로 초기화
        const firstSpecies = Object.keys(data.data.gradeByLevel)[0];
        setSpecies(firstSpecies);
      })
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, []);

  // 종족/레벨 변경 시 슬롯 초기화
  useEffect(() => {
    if (data) {
      initializeSlots();
    }
  }, [species, level, data]);

  // 슬롯 초기화
  const initializeSlots = () => {
    if (!data) return;

    const levelNum = parseInt(level);
    const newSlots: SlotData[] = [];

    for (let i = 0; i < levelNum; i++) {
      try {
        const slot = rollSlot(data, species, level, i + 1);
        newSlots.push(slot);
      } catch (error) {
        console.error(`슬롯 ${i + 1} 생성 실패:`, error);
      }
    }

    setSlots(newSlots);
    setTotalCost(0);
  };

  // 전체 리롤
  const handleReroll = () => {
    if (!data) return;

    try {
      const result = rollAllSlots(data, species, level, slots);
      setSlots(result.slots);
      setTotalCost((prev) => prev + result.cost);
    } catch (error) {
      console.error('리롤 실패:', error);
    }
  };

  // 슬롯 잠금 토글
  const toggleLock = (index: number) => {
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = { ...newSlots[index], locked: !newSlots[index].locked };
      return newSlots;
    });
  };

  // 리셋
  const handleReset = () => {
    initializeSlots();
    setTotalCost(0);
  };

  // 다음 리롤 비용 계산
  const calculateNextCost = () => {
    const unlockedCount = slots.filter((s) => !s.locked).length;
    const lockedCount = slots.filter((s) => s.locked).length;
    return unlockedCount * 5 + lockedCount * 10;
  };

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  const species_list = Object.keys(data.data.gradeByLevel);
  const level_list = Object.keys(data.data.gradeByLevel[species] || {});
  const nextCost = calculateNextCost();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">펫 이해도 시뮬레이터</h1>
            <p className="text-muted-foreground">
              종족 이해도 레벨에 따른 옵션을 직접 리롤하며 체험해보세요
            </p>
          </div>
          <Link href="/simulator/pet-comprehension/calculator">
            <Button variant="outline" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              계산기로 이동
            </Button>
          </Link>
        </div>
      </div>

      {/* 설정 영역 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>시뮬레이션 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* 종족 선택 */}
            <div>
              <label className="block text-sm font-medium mb-2">종족</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {species_list.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 레벨 선택 */}
            <div>
              <label className="block text-sm font-medium mb-2">레벨</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {level_list.map((l) => (
                  <option key={l} value={l}>
                    레벨 {l}
                  </option>
                ))}
              </select>
            </div>

            {/* 총 소모 재화 */}
            <div>
              <label className="block text-sm font-medium mb-2">총 소모 영혼결정</label>
              <div className="text-3xl font-bold text-primary">{totalCost.toLocaleString()}</div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2">
            <Button onClick={handleReroll} size="lg" className="flex-1" disabled={slots.length === 0}>
              <RotateCw className="mr-2 h-4 w-4" />
              리롤 (영혼결정 {nextCost})
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 슬롯 표시 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>슬롯 목록 (레벨 {level})</CardTitle>
          <CardDescription>
            잠금 버튼을 눌러 좋은 스탯을 고정한 후 리롤하세요
            <br />
            <span className="text-xs">
              리롤 비용: 활성 슬롯 × 5 + 잠긴 슬롯 × 10 영혼결정
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              종족과 레벨을 선택하세요
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 transition-all ${
                    slot.locked
                      ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                      : 'border-border'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      슬롯 {index + 1}
                    </div>
                    <Button
                      size="sm"
                      variant={slot.locked ? 'default' : 'outline'}
                      onClick={() => toggleLock(index)}
                      className="h-8"
                    >
                      {slot.locked ? (
                        <>
                          <Lock className="mr-1 h-3 w-3" />
                          잠금
                        </>
                      ) : (
                        <>
                          <Unlock className="mr-1 h-3 w-3" />
                          해제
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {/* 등급 */}
                    <div>
                      <Badge
                        className={`${GRADE_COLORS[slot.grade as Grade]} text-white`}
                      >
                        {slot.grade}
                      </Badge>
                    </div>

                    {/* 옵션명 */}
                    <div className="font-medium text-lg">{slot.option}</div>

                    {/* 수치 */}
                    <div className="text-2xl font-bold text-primary">
                      +{slot.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 등급 확률 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>등급 확률 (레벨 {level} 기준)</CardTitle>
          <CardDescription>NC 공식 확률 데이터</CardDescription>
        </CardHeader>
        <CardContent>
          {data.data.gradeByLevel[species]?.[level] && (
            <div className="grid grid-cols-5 gap-2">
              {GRADES.map((grade) => {
                const prob = data.data.gradeByLevel[species][level][grade];
                return (
                  <div key={grade} className="text-center">
                    <div
                      className={`${GRADE_COLORS[grade]} text-white font-bold py-2 rounded-t`}
                    >
                      {grade}
                    </div>
                    <div className="bg-muted py-2 rounded-b">
                      {prob.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
