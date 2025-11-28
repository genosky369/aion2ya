# 미해결 이슈: 박제 게시판 고스트 데이터 문제

## 문제 설명
박제 게시판(`/board/shame`)에서 새로고침(F5)할 때 이전에 삭제된 데이터가 아주 잠깐 보였다가 사라지는 현상

### 증상
- 사용자가 새로고침하면 "파밍 먹튀", "던전 악질 플레이" 등 **이미 삭제된 게시글**이 0.5초 정도 보였다가 사라짐
- 실제 Supabase DB에는 해당 데이터가 없음 (삭제됨)
- www.aion2ya.com 프로덕션 환경에서만 발생 (로컬에서는 재현 안됨)

### 원인 추정
Vercel의 정적 프리렌더링 캐시 또는 Edge 캐시에 이전 빌드 시점의 HTML이 남아있음

### 기술적 세부사항
- 응답 헤더에서 확인된 내용:
  - `X-Nextjs-Prerender: 1` - Next.js가 정적 프리렌더링함
  - `X-Vercel-Cache: PRERENDER` - Vercel이 프리렌더링된 결과를 캐시
  - `X-Nextjs-Stale-Time: 300` - 5분간 stale 데이터 허용

---

## 시도한 해결책들 (모두 실패)

### 1. mounted 상태로 하이드레이션 방지 (실패)
```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  fetchShamePosts();
}, []);

if (!mounted) {
  return <LoadingSpinner />;
}
```
**결과**: 실패 - 서버에서 렌더링된 HTML이 이미 캐시되어 있어서 효과 없음

### 2. Vercel Redeploy (실패)
- Vercel 대시보드에서 Redeploy 실행
- "Clear Cache" 옵션은 보이지 않았음
**결과**: 실패 - 여전히 고스트 데이터 보임

### 3. 브라우저 캐시 삭제 (실패)
- 크롬 개발자도구 > Application > Storage > Clear site data
- 하드 새로고침 (Ctrl+Shift+R)
**결과**: 실패 - 브라우저 캐시 문제가 아님

### 4. export const dynamic = 'force-dynamic' (실패)
```tsx
// page.tsx (서버 컴포넌트)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ShameBoard = dynamic(() => import('./ShameBoard'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
```
- 클라이언트 컴포넌트를 별도 파일(ShameBoard.tsx)로 분리
- 서버 컴포넌트에서 `force-dynamic` 설정
- `ssr: false`로 서버사이드 렌더링 비활성화
**결과**: 실패 - 여전히 고스트 데이터 보임

---

## 추가로 시도해볼 수 있는 방법들

### 1. Vercel CLI로 캐시 완전 삭제
```bash
vercel --prod --force
```

### 2. 프로젝트 재배포 (새 빌드)
- Vercel 대시보드에서 프로젝트 삭제 후 재연결
- 또는 새 커밋으로 강제 재빌드

### 3. next.config.js에서 캐시 헤더 설정
```js
async headers() {
  return [
    {
      source: '/board/shame',
      headers: [
        { key: 'Cache-Control', value: 'no-store, must-revalidate' },
      ],
    },
  ];
}
```

### 4. generateStaticParams 빈 배열 반환
```tsx
export async function generateStaticParams() {
  return []; // 정적 생성 완전 비활성화
}
```

### 5. Vercel Edge Config 또는 Middleware로 캐시 무효화

### 6. Supabase에서 데이터 조회하는 API Route 생성
- 클라이언트에서 직접 Supabase 호출 대신 API Route 사용
- API Route에 `export const dynamic = 'force-dynamic'` 설정

---

## 관련 파일
- `app/board/shame/page.tsx` - 서버 컴포넌트 (래퍼)
- `app/board/shame/ShameBoard.tsx` - 클라이언트 컴포넌트 (실제 UI)
- `lib/supabase.ts` - Supabase 클라이언트

## 관련 커밋
- `46c4baa` - mounted 상태 추가 시도
- `e27b0b3` - force-dynamic + ssr:false 시도

---

## 메모
이 문제는 Vercel의 Edge 캐시와 Next.js 정적 프리렌더링의 복합적인 문제로 보임.
근본적인 해결을 위해서는 Vercel의 캐시 시스템을 더 깊이 이해해야 할 수 있음.

**마지막 업데이트**: 2025-11-29
**상태**: 미해결
