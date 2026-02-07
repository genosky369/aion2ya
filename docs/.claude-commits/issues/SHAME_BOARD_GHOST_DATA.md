# ✅ 해결됨: 박제 게시판 고스트 데이터 문제

## 문제 설명
박제 게시판(`/board/shame`)에서 새로고침(F5)할 때 이전에 삭제된 데이터가 아주 잠깐 보였다가 사라지는 현상

### 증상
- 사용자가 새로고침하면 "파밍 먹튀", "던전 악질 플레이" 등 **작성하지 않은 게시글**이 0.5초 정도 보였다가 사라짐
- 실제 Supabase DB에는 해당 데이터가 없음

---

## ✅ 해결됨 (2025-11-29)

### 실제 원인
**Vercel 캐시 문제가 아니었음!**

`app/page.tsx`에 하드코딩된 `MOCK_SHAME_POSTS` 데이터가 `useState`의 초기값으로 사용되고 있었음.

```typescript
// 문제의 코드
const MOCK_SHAME_POSTS = [
  { playerId: '포셔링', reason: '던전 악질 플레이', ... },
  { playerId: '나쁜유저', reason: '거래 사기', ... },
  // ...
];

const [shamePosts, setShamePosts] = useState(MOCK_SHAME_POSTS); // ← 여기가 원인!
```

**문제의 흐름:**
1. 페이지 로드 시 `useState(MOCK_SHAME_POSTS)`로 목 데이터가 초기값으로 설정됨
2. 화면에 목 데이터가 먼저 렌더링됨 (포셔링, 나쁜유저, 트롤러...)
3. `useEffect`가 실행되어 `fetchData()` 호출
4. Supabase에서 실제 데이터를 가져와서 `setShamePosts`로 덮어씀
5. 실제 데이터로 다시 렌더링

→ 1~2번 과정에서 목 데이터가 잠깐 보이는 것!

### 해결 방법
```typescript
// 수정된 코드
const [shamePosts, setShamePosts] = useState<ShamePostDisplay[]>([]); // 빈 배열로 초기화
const [shameLoading, setShameLoading] = useState(true); // 로딩 상태 추가

// UI에서 로딩 처리
{shameLoading ? (
  <LoadingSpinner />
) : shamePosts.length === 0 ? (
  <EmptyMessage />
) : (
  <PostsList />
)}
```

### 관련 커밋
- `63c9b30` - Fix: 박제 게시판 고스트 데이터 버그 수정

---

## 교훈

1. **캐시 문제라고 단정짓지 말 것** - 실제로는 코드 로직 문제일 수 있음
2. **useState 초기값 주의** - 개발용 목 데이터를 초기값으로 사용하면 프로덕션에서 잠깐 노출됨
3. **로딩 상태 필수** - 데이터 fetch 전에는 로딩 UI를 보여줘야 함

---

**해결일**: 2025-11-29
**상태**: ✅ 해결됨
