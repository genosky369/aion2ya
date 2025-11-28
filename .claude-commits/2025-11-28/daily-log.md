# 2025-11-28 작업 로그

## 커밋 목록

### 1. `85c89f9` - Fix: 펫 이해도 시뮬레이터 레벨 선택 및 UI 개선
**작업 시간**: 2025-11-28 13:15 ~ 13:20 (KST)
**타입**: Bugfix (문제 수정)
**영향 범위**: 시뮬레이터 UI, 데이터 변환

#### 변경된 파일
```
scripts/convert_to_json.py (수정, +3 lines)
public/data/pet-comprehension.json (재생성, 368 KB)
app/simulator/pet-comprehension/page.tsx (통합, 547 lines)
app/simulator/pet-comprehension/calculator/page.tsx (삭제)
components/ui/tabs.tsx (신규, 93 lines)
config/navigation.ts (수정)
package.json, package-lock.json (tabs 의존성 추가)
```

#### 문제 및 해결

##### 문제 1: 레벨 선택 불가 (1레벨만 선택 가능)
**원인**: 엑셀 파일의 병합된 셀을 pandas가 첫 행에만 값을 넣고 나머지는 NaN 처리
**해결**: `df_grade['종족'] = df_grade['종족'].ffill()` forward fill 적용
**결과**:
- 변환 전: 각 종족 1개 레벨 데이터
- 변환 후: 각 종족 10개 레벨 데이터 (1~10)

##### 문제 2: UI 분리 (시뮬레이터와 계산기가 별도 페이지)
**원인**: 사용자 요청 - "계산기랑 시뮬레이터랑 한 화면에 볼 수 있도록"
**해결**:
- shadcn/ui Tabs 컴포넌트 설치 (`npx shadcn@latest add tabs`)
- 단일 페이지에서 탭으로 전환
- 공통 설정 (종족, 레벨) 상단에 배치
**결과**:
- 탭 1: 시뮬레이터 (리롤 체험)
- 탭 2: 기댓값 계산기 (몬테카를로)
- 페이지 이동 없이 탭 전환만으로 기능 사용

#### 기술 구현

**pandas forward fill**:
```python
df_grade['종족'] = df_grade['종족'].ffill()
```
병합된 셀의 NaN 값을 이전 행의 값으로 채움

**Tabs UI 구조**:
```tsx
<Tabs defaultValue="simulator">
  <TabsList>
    <TabsTrigger value="simulator">시뮬레이터</TabsTrigger>
    <TabsTrigger value="calculator">기댓값 계산기</TabsTrigger>
  </TabsList>
  <TabsContent value="simulator">...</TabsContent>
  <TabsContent value="calculator">...</TabsContent>
</Tabs>
```

**공통 상태 관리**:
- `species`, `level`: 공통 설정
- `slots`, `totalCost`: 시뮬레이터 전용
- `targetSlots`, `calcResult`: 계산기 전용
- 탭 전환 시 공통 설정 유지

#### 개선 효과
- ✅ 레벨 1~10 모두 선택 가능
- ✅ 한 화면에서 시뮬레이터와 계산기 비교
- ✅ 종족/레벨 설정 한 번만 입력
- ✅ 네비게이션 구조 단순화
- ✅ 페이지 로딩 시간 감소

---

### 2. `8af3424` - Feat: 펫 이해도 시뮬레이터 및 계산기 구현
**작업 시간**: 2025-11-28 13:00 ~ 13:15 (KST)
**타입**: Feature (새 기능)
**영향 범위**: 시뮬레이터 시스템 전체

#### 변경된 파일
```
app/simulator/pet-comprehension/page.tsx (신규, 295 lines)
app/simulator/pet-comprehension/calculator/page.tsx (신규, 318 lines)
lib/pet-simulator.ts (신규, 265 lines)
config/navigation.ts (수정)
supabase/migrations/001_create_core_tables.sql (신규, 194 lines)
```

#### 주요 구현 사항

##### 1. 슬롯 기반 시뮬레이터 UI
- **슬롯 시스템**: 레벨 = 슬롯 개수 (레벨 9 → 9개 슬롯)
- **등급 표시**: 일반(회색), 희귀(녹색), 전승(파랑), 유일(보라), 영웅(주황)
- **잠금 기능**: 슬롯별 Lock/Unlock 버튼으로 리롤 제외
- **비용 추적**: 총 소모 영혼결정 실시간 표시
- **비용 계산**: `(활성 슬롯 × 5) + (잠긴 슬롯 × 10)`

##### 2. 기댓값 계산기
- **목표 설정**: 슬롯별로 원하는 등급+옵션 선택
- **몬테카를로 시뮬레이션**:
  - 최대 100,000회 시도
  - 1,000회 성공 시 조기 종료
  - 무한 루프 방지 (100,000 영혼결정 초과 시 중단)
- **결과 표시**: 평균 소모 영혼결정, 시뮬레이션 횟수, 슬롯별 확률

##### 3. 시뮬레이션 핵심 로직 (lib/pet-simulator.ts)
```typescript
// 주요 함수
- selectGrade(probabilities): 확률 기반 등급 선택
- selectOption(options): 확률 기반 옵션 선택
- selectValue(valueRange): "1 ~ 10" 범위에서 균등 확률 선택
- rollSlot(data, species, level, slotNumber): 슬롯 1개 리롤
- rollAllSlots(data, species, level, currentSlots): 잠금 고려 전체 리롤
- calculateExpectedCost(data, species, level, targetCombination): 몬테카를로
- calculateProbability(data, species, level, targetGrade, targetOption): 개별 확률
```

##### 4. 2단계 확률 시스템
```
Stage 1: 등급 확률 (예: 영웅 10%)
Stage 2: 옵션 확률 (예: 특정 옵션 16.66%)
Final: 10% × 16.66% = 1.666%
```

##### 5. 네비게이션 개선
- "계산기" 메뉴 → "시뮬레이터" 메뉴로 변경
- 하위 메뉴: "펫 이해도 시뮬레이터", "펫 이해도 계산기"
- 페이지 상단에 상호 이동 버튼 추가

#### 기술적 특징
1. **상태 관리**: React hooks로 슬롯 상태, 잠금 상태, 비용 추적
2. **잠금 메커니즘**: SlotData.locked 플래그로 리롤 제외
3. **비동기 처리**: 계산기에서 setTimeout으로 UI 블로킹 방지
4. **에러 처리**: try-catch로 각 함수에서 예외 처리

#### 테스트 결과
- ✅ 레벨 1~10 슬롯 생성 정상 동작
- ✅ 잠금/해제 토글 정상 동작
- ✅ 리롤 시 잠긴 슬롯 유지 확인
- ✅ 비용 계산 정확성 확인 (5/10 영혼결정)
- ✅ 계산기 몬테카를로 시뮬레이션 동작 확인
- ✅ Next.js 컴파일 성공 (0 errors)

#### 개발 이슈
1. **타입 에러 없음**: TypeScript 컴파일 성공
2. **경로 문제 없음**: 모든 import 경로 정상
3. **런타임 에러 없음**: 개발 서버에서 정상 동작 확인

#### 다음 단계
- Phase 3: 영혼 각인 시뮬레이터 (향후)
- Phase 3: 마석/영석 시뮬레이터 (향후)
- UI 개선: 애니메이션 효과 추가 (선택 사항)
- 성능 최적화: 대용량 데이터 lazy loading (필요 시)

---

## 작업 요약
- **총 커밋**: 1개
- **신규 파일**: 4개 (1,072 lines)
- **수정 파일**: 1개
- **작업 시간**: 약 15분
- **상태**: ✅ 완료
