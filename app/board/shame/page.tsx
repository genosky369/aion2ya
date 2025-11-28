import dynamic from 'next/dynamic';

// 정적 프리렌더링 비활성화 - 항상 동적으로 렌더링
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// 클라이언트 컴포넌트를 SSR 없이 로드 (캐시된 HTML 방지)
const ShameBoard = dynamic(() => import('./ShameBoard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <main className="container mx-auto px-6 py-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">로딩 중...</p>
        </div>
      </main>
    </div>
  ),
});

export default function ShameBoardPage() {
  return <ShameBoard />;
}
