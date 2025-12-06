import { NextResponse } from 'next/server';

// 동적 라우트로 설정 (빌드 시점에 실행하지 않음)
export const dynamic = 'force-dynamic';

export async function GET() {
  // Vercel에서 puppeteer가 작동하지 않으므로 임시로 mock 데이터 반환
  // TODO: Vercel에서 작동하는 스크래핑 방법으로 변경 필요
  const mockNotices = [
    {
      id: 1,
      title: '[공지] 12월 업데이트 안내',
      date: '2025.11.28',
      category: '공지',
      isLive: false
    },
    {
      id: 2,
      title: '[점검] 정기 점검 안내',
      date: '2025.11.27',
      category: '점검',
      isLive: false
    },
    {
      id: 3,
      title: '[이벤트] 겨울 시즌 이벤트',
      date: '2025.11.26',
      category: '이벤트',
      isLive: false
    },
    {
      id: 4,
      title: '[업데이트] 신규 던전 추가',
      date: '2025.11.25',
      category: '업데이트',
      isLive: false
    },
    {
      id: 5,
      title: '[공지] 시스템 개선 안내',
      date: '2025.11.24',
      category: '공지',
      isLive: false
    }
  ];

  return NextResponse.json({
    success: true,
    notices: mockNotices,
    source: 'mock'
  });
}
