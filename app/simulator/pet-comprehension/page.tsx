'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Unlock, RotateCw, Calculator, Loader2 } from 'lucide-react';
import {
  PetData,
  SlotData,
  rollSlot,
  rollAllSlots,
  calculateExpectedCost,
  calculateProbability,
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

interface TargetSlot {
  grade: string;
  option: string;
}

export default function PetComprehensionPage() {
  const [data, setData] = useState<PetData | null>(null);
  const [species, setSpecies] = useState<string>('지성');
  const [level, setLevel] = useState<string>('1');

  // 시뮬레이터 상태
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // 계산기 상태
  const [targetSlots, setTargetSlots] = useState<TargetSlot[]>([]);
  const [calculating, setCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState<{
    expectedCost: number;
    trials: number;
    maxTrials: number;
  } | null>(null);

  // 데이터 로드
  useEffect(() => {
    fetch('/data/pet-comprehension.json')
      .then((res) => res.json())
      .then((data: PetData) => {
        setData(data);
        const firstSpecies = Object.keys(data.data.gradeByLevel)[0];
        setSpecies(firstSpecies);
      })
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, []);

  // 종족/레벨 변경 시 초기화
  useEffect(() => {
    if (data) {
      initializeSlots();
      initializeTargetSlots();
    }
  }, [species, level, data]);

  // === 시뮬레이터 함수 ===
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

  const toggleLock = (index: number) => {
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = { ...newSlots[index], locked: !newSlots[index].locked };
      return newSlots;
    });
  };

  const handleReset = () => {
    initializeSlots();
    setTotalCost(0);
  };

  const calculateNextCost = () => {
    const unlockedCount = slots.filter((s) => !s.locked).length;
    const lockedCount = slots.filter((s) => s.locked).length;
    return unlockedCount * 5 + lockedCount * 10;
  };

  // === 계산기 함수 ===
  const initializeTargetSlots = () => {
    if (!data) return;
    const levelNum = parseInt(level);
    const newTargets: TargetSlot[] = [];

    for (let i = 0; i < levelNum; i++) {
      const slotKey = `${i + 1}번 슬롯`;
      const options = data.data.optionByGrade[species]?.[slotKey]?.['영웅'];
      const defaultOption = options?.[0]?.name || '';
      newTargets.push({ grade: '영웅', option: defaultOption });
    }

    setTargetSlots(newTargets);
    setCalcResult(null);
  };

  const updateTargetGrade = (index: number, grade: string) => {
    if (!data) return;
    const slotKey = `${index + 1}번 슬롯`;
    const options = data.data.optionByGrade[species]?.[slotKey]?.[grade];
    const defaultOption = options?.[0]?.name || '';

    setTargetSlots((prev) => {
      const newTargets = [...prev];
      newTargets[index] = { grade, option: defaultOption };
      return newTargets;
    });
  };

  const updateTargetOption = (index: number, option: string) => {
    setTargetSlots((prev) => {
      const newTargets = [...prev];
      newTargets[index] = { ...newTargets[index], option };
      return newTargets;
    });
  };

  const handleCalculate = async () => {
    if (!data) return;
    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      try {
        const result = calculateExpectedCost(data, species, level, targetSlots);
        setCalcResult(result);
      } catch (error) {
        console.error('계산 실패:', error);
      } finally {
        setCalculating(false);
      }
    }, 100);
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
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">펫 이해도 시뮬레이터</h1>
        <p className="text-muted-foreground">
          직접 리롤을 체험하거나 목표 조합의 기댓값을 계산하세요
        </p>
      </div>

      {/* 공통 설정 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>기본 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </CardContent>
      </Card>

      {/* 탭 UI */}
      <Tabs defaultValue="simulator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="simulator" className="text-lg">
            <RotateCw className="mr-2 h-4 w-4" />
            시뮬레이터
          </TabsTrigger>
          <TabsTrigger value="calculator" className="text-lg">
            <Calculator className="mr-2 h-4 w-4" />
            기댓값 계산기
          </TabsTrigger>
        </TabsList>

        {/* 시뮬레이터 탭 */}
        <TabsContent value="simulator">
          <div className="space-y-6">
            {/* 컨트롤 영역 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">총 소모 영혼결정</div>
                    <div className="text-3xl font-bold text-primary">
                      {totalCost.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleReroll}
                      size="lg"
                      disabled={slots.length === 0}
                      className="min-w-[200px]"
                    >
                      <RotateCw className="mr-2 h-4 w-4" />
                      리롤 (영혼결정 {nextCost})
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="lg">
                      초기화
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  리롤 비용: 활성 슬롯 × 5 + 잠긴 슬롯 × 10 영혼결정
                </p>
              </CardContent>
            </Card>

            {/* 슬롯 표시 */}
            <Card>
              <CardHeader>
                <CardTitle>슬롯 목록 (레벨 {level})</CardTitle>
                <CardDescription>
                  잠금 버튼을 눌러 좋은 스탯을 고정한 후 리롤하세요
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
                          <div>
                            <Badge className={`${GRADE_COLORS[slot.grade as Grade]} text-white`}>
                              {slot.grade}
                            </Badge>
                          </div>
                          <div className="font-medium text-lg">{slot.option}</div>
                          <div className="text-2xl font-bold text-primary">+{slot.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 등급 확률 */}
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
                          <div className={`${GRADE_COLORS[grade]} text-white font-bold py-2 rounded-t`}>
                            {grade}
                          </div>
                          <div className="bg-muted py-2 rounded-b">{prob.toFixed(1)}%</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 계산기 탭 */}
        <TabsContent value="calculator">
          <div className="space-y-6">
            {/* 목표 설정 */}
            <Card>
              <CardHeader>
                <CardTitle>목표 조합 설정</CardTitle>
                <CardDescription>각 슬롯에서 달성하고자 하는 등급과 옵션을 선택하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {targetSlots.map((target, index) => {
                    const slotKey = `${index + 1}번 슬롯`;
                    const availableOptions =
                      data.data.optionByGrade[species]?.[slotKey]?.[target.grade] || [];

                    return (
                      <div key={index} className="border rounded-lg p-4 bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              슬롯 {index + 1}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">등급</label>
                            <select
                              value={target.grade}
                              onChange={(e) => updateTargetGrade(index, e.target.value)}
                              className="w-full p-2 border rounded-md bg-background text-sm"
                            >
                              {GRADES.map((grade) => (
                                <option key={grade} value={grade}>
                                  {grade}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">옵션</label>
                            <select
                              value={target.option}
                              onChange={(e) => updateTargetOption(index, e.target.value)}
                              className="w-full p-2 border rounded-md bg-background text-sm"
                            >
                              {availableOptions.map((opt) => (
                                <option key={opt.name} value={opt.name}>
                                  {opt.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleCalculate}
                    size="lg"
                    className="w-full"
                    disabled={calculating}
                  >
                    {calculating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        계산 중... (몬테카를로 시뮬레이션 실행 중)
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        기댓값 계산
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 결과 표시 */}
            {calcResult && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>계산 결과</CardTitle>
                  <CardDescription>
                    {calcResult.trials.toLocaleString()}회 시뮬레이션 (최대{' '}
                    {calcResult.maxTrials.toLocaleString()}회)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-8 bg-primary/10 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">예상 소모 영혼결정</div>
                      <div className="text-5xl font-bold text-primary">
                        {calcResult.expectedCost.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        평균값 (시뮬레이션 기반)
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-3">목표 조합</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {targetSlots.map((target, index) => {
                          const prob = calculateProbability(
                            data,
                            species,
                            level,
                            target.grade,
                            target.option
                          );

                          return (
                            <div key={index} className="border rounded-lg p-3 bg-muted/30">
                              <div className="text-xs text-muted-foreground mb-2">
                                슬롯 {index + 1}
                              </div>
                              <Badge
                                className={`${GRADE_COLORS[target.grade as Grade]} text-white mb-2`}
                              >
                                {target.grade}
                              </Badge>
                              <div className="text-sm font-medium">{target.option}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                확률: {(prob * 100).toFixed(2)}%
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>* 이 값은 몬테카를로 시뮬레이션을 통한 통계적 추정값입니다.</p>
                      <p>* 실제 게임에서는 운에 따라 더 적게 또는 더 많이 소모될 수 있습니다.</p>
                      <p>* 잠금 기능을 활용하여 리롤 비용이 점진적으로 증가합니다.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 계산 방법 */}
            <Card>
              <CardHeader>
                <CardTitle>계산 방법</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>몬테카를로 시뮬레이션:</strong> 최대 100,000회의 가상
                  시뮬레이션을 실행하여 평균적으로 목표 조합을 달성하는데 필요한 영혼결정을
                  계산합니다.
                </p>
                <p>
                  <strong>잠금 전략:</strong> 목표 조합 중 하나를 얻으면 해당 슬롯을 잠그고,
                  나머지 슬롯만 리롤합니다. 잠긴 슬롯은 10 영혼결정, 활성 슬롯은 5
                  영혼결정이 소모됩니다.
                </p>
                <p>
                  <strong>수렴 조건:</strong> 1,000회 성공 시 또는 최대 시도 횟수 도달 시
                  계산을 종료합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
