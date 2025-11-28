import { NextResponse } from 'next/server';
import { scrapeAion2Notices } from '@/lib/scraper';

// 캐시 설정
export const revalidate = 300; // 5분마다 재검증

export async function GET() {
  try {
    console.log('Starting AION2 notice scraping...');

    // Puppeteer로 실제 데이터 스크래핑
    const notices = await scrapeAion2Notices();

    console.log(`Successfully scraped ${notices.length} notices`);

    // 스크래핑 실패 시 MOCK 데이터 반환
    if (notices.length === 0) {
      console.log('No notices found, returning mock data');
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

    return NextResponse.json({
      success: true,
      notices: notices.slice(0, 5),
      source: 'scraped'
    });

  } catch (error) {
    console.error('Error in AION2 notices API:', error);

    // 에러 시 MOCK 데이터 반환
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
      }
    ];

    return NextResponse.json({
      success: true,
      notices: mockNotices,
      source: 'mock_error'
    });
  }
}
