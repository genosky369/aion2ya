/**
 * 펫 이해도 시뮬레이터 핵심 로직
 */

export interface GradeData {
  일반: number;
  희귀: number;
  전승: number;
  유일: number;
  영웅: number;
}

export interface OptionData {
  name: string;
  valueRange: string; // "1 ~ 10" 형식
  probability: number;
}

export interface SlotData {
  grade: string;
  option: string;
  value: number;
  locked: boolean;
}

export interface PetData {
  version: string;
  data: {
    gradeByLevel: {
      [species: string]: {
        [level: string]: GradeData;
      };
    };
    optionByGrade: {
      [species: string]: {
        [slot: string]: {
          [grade: string]: OptionData[];
        };
      };
    };
  };
}

export const GRADES = ['일반', '희귀', '전승', '유일', '영웅'] as const;
export type Grade = (typeof GRADES)[number];

/**
 * 확률 기반으로 등급 선택
 */
export function selectGrade(probabilities: GradeData): Grade {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const grade of GRADES) {
    cumulative += probabilities[grade];
    if (random < cumulative) {
      return grade;
    }
  }

  return '일반';
}

/**
 * 확률 기반으로 옵션 선택
 */
export function selectOption(options: OptionData[]): OptionData | null {
  if (!options || options.length === 0) return null;

  const total = options.reduce((sum, opt) => sum + opt.probability, 0);
  const random = Math.random() * total;
  let cumulative = 0;

  for (const option of options) {
    cumulative += option.probability;
    if (random < cumulative) {
      return option;
    }
  }

  return options[0];
}

/**
 * 수치 범위에서 랜덤 선택
 * "1 ~ 10" → 1부터 10까지 균등 확률
 */
export function selectValue(valueRange: string): number {
  const match = valueRange.match(/(\d+)\s*~\s*(\d+)/);
  if (!match) return 0;

  const min = parseInt(match[1]);
  const max = parseInt(match[2]);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 슬롯 1개 리롤
 */
export function rollSlot(
  data: PetData,
  species: string,
  level: string,
  slotNumber: number
): SlotData {
  // 1단계: 등급 결정
  const gradeProbabilities = data.data.gradeByLevel[species]?.[level];
  if (!gradeProbabilities) {
    throw new Error(`Invalid species/level: ${species}/${level}`);
  }
  const grade = selectGrade(gradeProbabilities);

  // 2단계: 옵션 결정
  const slotKey = `${slotNumber}번 슬롯`;
  const options = data.data.optionByGrade[species]?.[slotKey]?.[grade];
  if (!options || options.length === 0) {
    throw new Error(`No options for ${species}/${slotKey}/${grade}`);
  }
  const selectedOption = selectOption(options);
  if (!selectedOption) {
    throw new Error(`Failed to select option`);
  }

  // 3단계: 수치 결정
  const value = selectValue(selectedOption.valueRange);

  return {
    grade,
    option: selectedOption.name,
    value,
    locked: false,
  };
}

/**
 * 전체 슬롯 리롤 (잠긴 슬롯 제외)
 */
export function rollAllSlots(
  data: PetData,
  species: string,
  level: string,
  currentSlots: SlotData[]
): { slots: SlotData[]; cost: number } {
  const levelNum = parseInt(level);
  const totalSlots = levelNum; // 레벨 = 슬롯 개수

  const newSlots: SlotData[] = [];
  let unlockedCount = 0;
  let lockedCount = 0;

  for (let i = 0; i < totalSlots; i++) {
    const current = currentSlots[i];
    if (current?.locked) {
      // 잠긴 슬롯은 그대로 유지
      newSlots.push(current);
      lockedCount++;
    } else {
      // 새로 리롤
      const newSlot = rollSlot(data, species, level, i + 1);
      newSlots.push(newSlot);
      unlockedCount++;
    }
  }

  // 재화 소모 계산
  const cost = unlockedCount * 5 + lockedCount * 10;

  return { slots: newSlots, cost };
}

/**
 * 특정 조합을 얻기 위한 기댓값 계산 (몬테카를로)
 */
export function calculateExpectedCost(
  data: PetData,
  species: string,
  level: string,
  targetCombination: Array<{ grade: string; option: string }>
): { expectedCost: number; trials: number; maxTrials: number } {
  const maxTrials = 100000; // 최대 시도 횟수
  let totalCost = 0;
  let successCount = 0;

  for (let trial = 0; trial < maxTrials; trial++) {
    let slots: SlotData[] = [];
    let trialCost = 0;
    const matched = new Set<number>(); // 매칭된 타겟 인덱스

    // 목표 조합을 모두 얻을 때까지 리롤
    while (matched.size < targetCombination.length) {
      // 리롤 실행
      const result = rollAllSlots(data, species, level, slots);
      slots = result.slots;
      trialCost += result.cost;

      // 매칭 확인
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        for (let j = 0; j < targetCombination.length; j++) {
          if (matched.has(j)) continue; // 이미 매칭됨
          const target = targetCombination[j];
          if (slot.grade === target.grade && slot.option === target.option) {
            matched.add(j);
            slots[i].locked = true; // 잠금
            break;
          }
        }
      }

      // 무한 루프 방지
      if (trialCost > 100000) break;
    }

    if (matched.size === targetCombination.length) {
      totalCost += trialCost;
      successCount++;
    }

    // 충분한 샘플 수집 시 조기 종료
    if (successCount >= 1000) break;
  }

  return {
    expectedCost: successCount > 0 ? totalCost / successCount : 0,
    trials: successCount,
    maxTrials,
  };
}

/**
 * 확률 계산 (특정 조합 얻을 확률)
 */
export function calculateProbability(
  data: PetData,
  species: string,
  level: string,
  targetGrade: string,
  targetOption: string
): number {
  // 1단계: 등급 확률
  const gradeProbabilities = data.data.gradeByLevel[species]?.[level];
  if (!gradeProbabilities) return 0;
  const gradeProb = gradeProbabilities[targetGrade as Grade] / 100;

  // 2단계: 옵션 확률 (평균)
  const levelNum = parseInt(level);
  let totalOptionProb = 0;

  for (let slot = 1; slot <= levelNum; slot++) {
    const slotKey = `${slot}번 슬롯`;
    const options = data.data.optionByGrade[species]?.[slotKey]?.[targetGrade];
    if (!options) continue;

    const totalProb = options.reduce((sum, opt) => sum + opt.probability, 0);
    const targetOpt = options.find((opt) => opt.name === targetOption);
    if (targetOpt) {
      totalOptionProb += targetOpt.probability / totalProb;
    }
  }

  const avgOptionProb = totalOptionProb / levelNum;

  return gradeProb * avgOptionProb;
}
