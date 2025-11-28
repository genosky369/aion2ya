export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: '홈',
    href: '/',
    icon: 'Home',
  },
  {
    label: '가이드',
    href: '/guides',
    icon: 'BookOpen',
    children: [
      { label: '초보자 가이드', href: '/guides/beginner' },
      { label: '레벨링 가이드', href: '/guides/leveling' },
      { label: '클래스 가이드', href: '/guides/class' },
    ],
  },
  {
    label: '데이터베이스',
    href: '/database',
    icon: 'Database',
    children: [
      { label: '아이템', href: '/database/items' },
      { label: '스킬', href: '/database/skills' },
      { label: '던전', href: '/database/dungeons' },
    ],
  },
  {
    label: '시뮬레이터',
    href: '/simulator/pet-comprehension',
    icon: 'Calculator',
  },
  {
    label: '커뮤니티',
    href: '/board',
    icon: 'Users',
  },
]

// 푸터 네비게이션
export const footerNavigation = {
  about: [
    { label: '사이트 소개', href: '/about' },
    { label: '문의하기', href: '/contact' },
    { label: '광고 문의', href: '/advertise' },
  ],
  legal: [
    { label: '이용약관', href: '/terms' },
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '면책사항', href: '/disclaimer' },
  ],
  community: [
    { label: '디스코드', href: 'https://discord.gg/aion2' },
    { label: '유튜브', href: 'https://youtube.com/@aion2' },
    { label: '트위터', href: 'https://twitter.com/aion2' },
  ],
}
