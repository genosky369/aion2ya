import ShameBoard from './ShameBoard';

// 정적 프리렌더링 비활성화 - 항상 동적으로 렌더링
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ShameBoardPage() {
  return <ShameBoard />;
}
