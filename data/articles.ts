export interface Article {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  comments: number;
  likes: number;
  thumbnail?: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    title: '초보자를 위한 아이온 2 시작 가이드',
    category: '가이드',
    categoryColor: 'blue',
    excerpt: '아이온 2를 처음 시작하는 분들을 위한 완벽 가이드입니다. 캐릭터 생성부터 레벨 20까지의 효율적인 성장 방법을 다룹니다.',
    author: '운영자',
    publishedAt: '2시간 전',
    updatedAt: '2025-11-13T10:00:00Z',
    views: 1234,
    comments: 15,
    likes: 45,
    tags: ['초보', '시작', '가이드'],
  },
  {
    id: '2',
    title: '용의 둥지 던전 완벽 공략',
    category: '공략',
    categoryColor: 'green',
    excerpt: '신규 던전 용의 둥지의 전 구간 공략법과 보스 패턴 분석, 추천 파티 구성을 상세히 설명합니다.',
    author: '공략왕',
    publishedAt: '5시간 전',
    updatedAt: '2025-11-13T07:00:00Z',
    views: 2567,
    comments: 28,
    likes: 89,
    tags: ['던전', '공략', '용의둥지'],
  },
  {
    id: '3',
    title: '전설 등급 무기 획득 확률 분석',
    category: '분석',
    categoryColor: 'purple',
    excerpt: '최근 10,000회의 드롭 데이터를 기반으로 한 전설 등급 무기 획득 확률 통계 분석입니다.',
    author: '데이터분석가',
    publishedAt: '1일 전',
    updatedAt: '2025-11-12T12:00:00Z',
    views: 5123,
    comments: 42,
    likes: 156,
    tags: ['통계', '무기', '전설'],
  },
  {
    id: '4',
    title: '글래디에이터 PvP 빌드 추천',
    category: '가이드',
    categoryColor: 'blue',
    excerpt: '최근 메타에 맞는 글래디에이터 PvP 빌드와 스킬 로테이션을 소개합니다.',
    author: 'PvP고수',
    publishedAt: '2일 전',
    updatedAt: '2025-11-11T15:00:00Z',
    views: 3456,
    comments: 34,
    likes: 98,
    tags: ['글래디에이터', 'PvP', '빌드'],
  },
  {
    id: '5',
    title: '레벨 60-70 구간 효율 사냥터 추천',
    category: '가이드',
    categoryColor: 'blue',
    excerpt: '60-70 레벨 구간에서 가장 효율적인 경험치 획득이 가능한 사냥터들을 비교 분석했습니다.',
    author: '레벨링마스터',
    publishedAt: '3일 전',
    updatedAt: '2025-11-10T09:00:00Z',
    views: 4567,
    comments: 56,
    likes: 123,
    tags: ['레벨링', '사냥터', '효율'],
  },
]
