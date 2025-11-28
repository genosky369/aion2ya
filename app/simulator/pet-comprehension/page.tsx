'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Unlock, RotateCw, Calculator, Loader2, ChevronDown, ChevronUp, Copy, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

interface TargetOption {
  grade: string;
  option: string;
}

type TargetSlots = Array<TargetOption[]>;

export default function PetComprehensionPage() {
  const [data, setData] = useState<PetData | null>(null);
  const [species, setSpecies] = useState<string>('지성');
  const [level, setLevel] = useState<string>('1');

  // 시뮬레이터 상태
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // 계산기 상태 (새로운 방식)
  const [minGrade, setMinGrade] = useState<string>('영웅'); // 최소 등급
  const [selectedStats, setSelectedStats] = useState<Set<string>>(new Set()); // 선택한 스탯들
  const [excludedSlots, setExcludedSlots] = useState<Set<number>>(new Set()); // 제외된 슬롯들
  const [calculating, setCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState<{
    expectedCost: number;
    trials: number;
    maxTrials: number;
  } | null>(null);

  // 검증 팝업 상태
  const [showProblemDialog, setShowProblemDialog] = useState(false);
  const [problematicSlots, setProblematicSlots] = useState<number[]>([]);
  const [slotDetails, setSlotDetails] = useState<{ [slotNumber: number]: string[] }>({});

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
      // 계산기 초기화
      setSelectedStats(new Set());
      setExcludedSlots(new Set());
      setCalcResult(null);
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

  // === 계산기 함수 (새로운 방식) ===

  // 등급 레벨 매핑
  const GRADE_LEVELS: { [key: string]: string[] } = {
    '일반': ['일반', '희귀', '전승', '유일', '영웅'],
    '희귀': ['희귀', '전승', '유일', '영웅'],
    '전승': ['전승', '유일', '영웅'],
    '유일': ['유일', '영웅'],
    '영웅': ['영웅']
  };

  // 선택한 등급 목록 가져오기
  const getSelectedGrades = (): string[] => {
    return GRADE_LEVELS[minGrade] || [];
  };

  // 모든 가능한 스탯 목록 추출
  const getAllAvailableStats = (): string[] => {
    if (!data) return [];
    const statsSet = new Set<string>();
    const levelNum = parseInt(level);

    for (let i = 1; i <= levelNum; i++) {
      const slotKey = `${i}번 슬롯`;
      for (const grade of GRADES) {
        const options = data.data.optionByGrade[species]?.[slotKey]?.[grade] || [];
        options.forEach(opt => statsSet.add(opt.name));
      }
    }

    return Array.from(statsSet).sort();
  };

  // 특정 스탯이 어느 슬롯에서 나올 수 있는지 확인
  const getSlotsForStat = (statName: string, grades: string[]): number[] => {
    if (!data) return [];
    const levelNum = parseInt(level);
    const slots: number[] = [];

    for (let i = 1; i <= levelNum; i++) {
      const slotKey = `${i}번 슬롯`;
      let found = false;

      for (const grade of grades) {
        const options = data.data.optionByGrade[species]?.[slotKey]?.[grade] || [];
        if (options.some(opt => opt.name === statName)) {
          found = true;
          break;
        }
      }

      if (found) {
        slots.push(i);
      }
    }

    return slots;
  };

  // 스탯 토글
  const toggleStat = (statName: string) => {
    setSelectedStats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(statName)) {
        newSet.delete(statName);
      } else {
        newSet.add(statName);
      }
      return newSet;
    });
  };

  // 검증: 각 슬롯에 선택한 스탯이 있는지 확인
  const validateSelection = (): { valid: boolean; problematicSlots: number[]; slotDetails: { [key: number]: string[] } } => {
    if (!data) return { valid: true, problematicSlots: [], slotDetails: {} };

    const levelNum = parseInt(level);
    const problematicSlots: number[] = [];
    const slotDetails: { [key: number]: string[] } = {};
    const selectedGrades = getSelectedGrades();

    for (let i = 1; i <= levelNum; i++) {
      // 이미 제외된 슬롯은 건너뛰기
      if (excludedSlots.has(i)) {
        slotDetails[i] = ['제외됨 (아무거나 상관없음)'];
        continue;
      }

      const slotKey = `${i}번 슬롯`;
      const availableStats: string[] = [];

      for (const grade of selectedGrades) {
        const options = data.data.optionByGrade[species]?.[slotKey]?.[grade] || [];
        for (const opt of options) {
          if (selectedStats.has(opt.name)) {
            availableStats.push(`${grade} ${opt.name}`);
          }
        }
      }

      slotDetails[i] = availableStats;

      if (availableStats.length === 0) {
        problematicSlots.push(i);
      }
    }

    return {
      valid: problematicSlots.length === 0,
      problematicSlots,
      slotDetails
    };
  };

  // 선택 내용을 TargetSlots 형식으로 변환
  const convertToTargetSlots = (): TargetSlots => {
    if (!data) return [];

    const levelNum = parseInt(level);
    const result: TargetSlots = [];
    const selectedGrades = getSelectedGrades();

    for (let i = 1; i <= levelNum; i++) {
      // 제외된 슬롯은 빈 배열
      if (excludedSlots.has(i)) {
        result.push([]);
        continue;
      }

      const slotKey = `${i}번 슬롯`;
      const targets: TargetOption[] = [];

      for (const grade of selectedGrades) {
        const options = data.data.optionByGrade[species]?.[slotKey]?.[grade] || [];
        for (const opt of options) {
          if (selectedStats.has(opt.name)) {
            targets.push({ grade, option: opt.name });
          }
        }
      }

      result.push(targets);
    }

    return result;
  };

  // 문제 있는 슬롯 제외 처리
  const handleExcludeSlots = () => {
    setExcludedSlots(prev => {
      const newSet = new Set(prev);
      problematicSlots.forEach(slot => newSet.add(slot));
      return newSet;
    });
    setShowProblemDialog(false);

    // 제외 후 바로 계산 진행
    setTimeout(() => {
      proceedWithCalculation();
    }, 100);
  };

  // 실제 계산 진행
  const proceedWithCalculation = () => {
    if (!data) return;

    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      try {
        const targetSlots = convertToTargetSlots();
        const result = calculateExpectedCost(data, species, level, targetSlots);
        setCalcResult(result);
      } catch (error) {
        console.error('계산 실패:', error);
        alert('계산 중 오류가 발생했습니다.');
      } finally {
        setCalculating(false);
      }
    }, 100);
  };

  // 계산 버튼 클릭
  const handleCalculate = () => {
    if (selectedStats.size === 0) {
      alert('원하는 스탯을 최소 1개 이상 선택해주세요.');
      return;
    }

    const validation = validateSelection();

    if (!validation.valid) {
      // 문제가 있는 슬롯이 있으면 팝업 표시
      setProblematicSlots(validation.problematicSlots);
      setSlotDetails(validation.slotDetails);
      setShowProblemDialog(true);
    } else {
      // 바로 계산 진행
      proceedWithCalculation();
    }
  };

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  const species_list = Object.keys(data.data.gradeByLevel);
  const level_list = Object.keys(data.data.gradeByLevel[species] || {}).filter(l => l !== '10');
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
                <CardTitle>목표 설정</CardTitle>
                <CardDescription>원하는 등급과 스탯을 선택하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 1단계: 등급 선택 */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">1단계: 최소 등급 선택</div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {[
                        { value: '영웅', label: '영웅만', grades: ['영웅'] },
                        { value: '유일', label: '유일 이상', grades: ['유일', '영웅'] },
                        { value: '전승', label: '전승 이상', grades: ['전승', '유일', '영웅'] },
                        { value: '희귀', label: '희귀 이상', grades: ['희귀', '전승', '유일', '영웅'] },
                        { value: '일반', label: '모든 등급', grades: ['일반', '희귀', '전승', '유일', '영웅'] },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                            minGrade === option.value
                              ? 'border-primary bg-primary/10 font-medium'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="minGrade"
                            value={option.value}
                            checked={minGrade === option.value}
                            onChange={(e) => setMinGrade(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-sm">{option.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {option.grades.join(', ')}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 2단계: 스탯 선택 */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium">
                      2단계: 원하는 스탯 선택 ({selectedStats.size}개 선택됨)
                    </div>
                    <div className="border rounded-lg p-4 max-h-[400px] overflow-y-auto bg-muted/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {getAllAvailableStats().map((statName) => {
                          const availableSlots = getSlotsForStat(statName, getSelectedGrades());
                          const isSelected = selectedStats.has(statName);

                          return (
                            <label
                              key={statName}
                              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                                isSelected ? 'bg-primary/10' : 'hover:bg-muted'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleStat(statName)}
                                className="w-4 h-4 cursor-pointer"
                              />
                              <div className="flex-1">
                                <div className="text-sm">{statName}</div>
                                <div className="text-xs text-muted-foreground">
                                  슬롯 {availableSlots.join(', ')}에서 가능
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 제외된 슬롯 표시 */}
                  {excludedSlots.size > 0 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                            제외된 슬롯: {Array.from(excludedSlots).join(', ')}
                          </div>
                          <div className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                            이 슬롯들은 아무 스탯이나 나와도 상관없이 계산됩니다.
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExcludedSlots(new Set())}
                            className="mt-2 h-7 text-xs"
                          >
                            제외 해제
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 계산 버튼 */}
                  <Button
                    onClick={handleCalculate}
                    size="lg"
                    className="w-full"
                    disabled={calculating || selectedStats.size === 0}
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

                {/* 문제 슬롯 다이얼로그 */}
                <AlertDialog open={showProblemDialog} onOpenChange={setShowProblemDialog}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>일부 슬롯에 선택한 스탯이 나오지 않습니다</AlertDialogTitle>
                      <AlertDialogDescription asChild>
                        <div className="space-y-3">
                          <p>다음 슬롯에서는 선택한 스탯이 나오지 않습니다:</p>
                          <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {problematicSlots.map((slotNum) => (
                              <div key={slotNum} className="border rounded p-2 bg-muted/50">
                                <div className="font-medium text-sm">슬롯 {slotNum}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  선택한 스탯이 이 슬롯에서는 나오지 않습니다
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-sm font-medium mt-3">다음 중 하나를 선택하세요:</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>다른 스탯 추가 선택하기</AlertDialogCancel>
                      <AlertDialogAction onClick={handleExcludeSlots}>
                        이 슬롯들은 아무거나 상관없음
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                      <div className="text-sm font-medium mb-3">목표 설정</div>
                      <div className="space-y-3">
                        <div className="border rounded-lg p-3 bg-muted/30">
                          <div className="text-xs text-muted-foreground mb-2">등급</div>
                          <div className="flex flex-wrap gap-2">
                            {getSelectedGrades().map((grade) => (
                              <Badge key={grade} className={`${GRADE_COLORS[grade as Grade]} text-white`}>
                                {grade}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="border rounded-lg p-3 bg-muted/30">
                          <div className="text-xs text-muted-foreground mb-2">
                            선택한 스탯 ({selectedStats.size}개)
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Array.from(selectedStats).map((stat) => (
                              <div key={stat} className="truncate">• {stat}</div>
                            ))}
                          </div>
                        </div>

                        {excludedSlots.size > 0 && (
                          <div className="border rounded-lg p-3 bg-yellow-50 dark:bg-yellow-950/20">
                            <div className="text-xs text-muted-foreground mb-2">제외된 슬롯</div>
                            <div className="text-sm">
                              슬롯 {Array.from(excludedSlots).join(', ')} (아무거나 상관없음)
                            </div>
                          </div>
                        )}
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
