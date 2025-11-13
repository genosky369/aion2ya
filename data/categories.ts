export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  href: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'class-guides',
    name: '클래스 가이드',
    icon: 'Users',
    description: '각 클래스별 플레이 가이드',
    count: 45,
    href: '/guides/class',
    color: 'blue',
  },
  {
    id: 'leveling',
    name: '레벨링 가이드',
    icon: 'TrendingUp',
    description: '효율적인 레벨업 방법',
    count: 32,
    href: '/guides/leveling',
    color: 'green',
  },
  {
    id: 'dungeons',
    name: '던전 공략',
    icon: 'MapPin',
    description: '던전별 상세 공략',
    count: 28,
    href: '/database/dungeons',
    color: 'purple',
  },
  {
    id: 'items',
    name: '아이템 정보',
    icon: 'Tag',
    description: '장비 및 소비 아이템',
    count: 156,
    href: '/database/items',
    color: 'orange',
  },
  {
    id: 'quests',
    name: '퀘스트 정보',
    icon: 'BookOpen',
    description: '메인 및 서브 퀘스트',
    count: 89,
    href: '/database/quests',
    color: 'teal',
  },
  {
    id: 'patch-notes',
    name: '패치 노트',
    icon: 'Bell',
    description: '업데이트 내역',
    count: 24,
    href: '/news/patches',
    color: 'red',
  },
]
