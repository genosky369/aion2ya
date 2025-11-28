import puppeteer from 'puppeteer';

export interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  isLive: boolean;
}

export async function scrapeAion2Notices(): Promise<Notice[]> {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // User-Agent 설정
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 페이지 이동
    await page.goto('https://aion2.plaync.com/ko-kr/board/notice/list', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // JavaScript 실행 대기 및 게시판 로딩 대기
    await new Promise(resolve => setTimeout(resolve, 5000));

    // HTML 구조 디버깅
    const bodyHTML = await page.evaluate(() => {
      // 다양한 가능성 있는 셀렉터 확인
      const selectors = [
        '.board-list__item',
        '.list-item',
        'tr[data-id]',
        '.post-item',
        '.board-item',
        'article',
        '.notice-item',
        'tbody tr',
        '.list tbody tr',
        '[class*="board"] tbody tr',
        '[class*="list"] li',
        '[class*="post"]'
      ];

      const found: any = {};
      selectors.forEach(sel => {
        const elements = document.querySelectorAll(sel);
        if (elements.length > 0) {
          found[sel] = elements.length;
        }
      });

      return {
        found,
        bodySnippet: document.body.innerHTML.substring(0, 2000)
      };
    });

    console.log('HTML structure found:', bodyHTML.found);
    console.log('Body snippet:', bodyHTML.bodySnippet);

    // 페이지에서 공지사항 데이터 추출
    const notices = await page.evaluate(() => {
      const noticeList: any[] = [];

      // 여러 가능한 셀렉터 시도
      const possibleSelectors = [
        'tbody tr',
        '.board-list__item',
        '.list-item',
        'tr[data-id]',
        '.post-item',
        '[class*="board"] tbody tr',
        'article',
        '.notice-item'
      ];

      let items: NodeListOf<Element> | null = null;
      for (const selector of possibleSelectors) {
        const found = document.querySelectorAll(selector);
        if (found.length > 0) {
          items = found;
          console.log(`Using selector: ${selector}, found ${found.length} items`);
          break;
        }
      }

      if (!items || items.length === 0) {
        console.log('No items found with any selector');
        return [];
      }

      items.forEach((item, index) => {
        try {
          // 제목
          const titleEl = item.querySelector('.title, .subject, .post-title, a[href*="view"]');
          const title = titleEl?.textContent?.trim() || '';

          // 날짜
          const dateEl = item.querySelector('.date, .created, .post-date, time');
          const date = dateEl?.textContent?.trim() || '';

          // 카테고리
          const categoryEl = item.querySelector('.category, .tag, .badge, .label');
          const category = categoryEl?.textContent?.trim() || '공지';

          // ID 추출
          const link = item.querySelector('a[href*="view"]')?.getAttribute('href') || '';
          const idMatch = link.match(/\/(\d+)$/);
          const id = idMatch ? parseInt(idMatch[1]) : index + 1;

          // LIVE 여부 확인
          const isLive = title.toLowerCase().includes('live') ||
                        title.includes('라이브') ||
                        title.includes('방송');

          if (title) {
            noticeList.push({
              id,
              title,
              date,
              category,
              isLive
            });
          }
        } catch (err) {
          console.error('Error parsing notice item:', err);
        }
      });

      return noticeList;
    });

    await browser.close();

    // 최대 5개만 반환
    return notices.slice(0, 5);

  } catch (error) {
    console.error('Scraping error:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}
