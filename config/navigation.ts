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
    label: '업데이트 내역',
    href: '/updates',
    icon: 'Clock',
  },
  {
    label: '시뮬레이터',
    href: '/simulator',
    icon: 'Calculator',
    children: [
      { label: '펫 이해도', href: '/simulator/pet-comprehension' },
      { label: '마석/영석', href: '/simulator/magic-stone' },
      { label: '영혼 각인', href: '/simulator/soul-engraving' },
    ],
  },
  {
    label: '박제 게시판',
    href: '/board/shame',
    icon: 'Users',
  },
  {
    label: '커뮤니티',
    href: '/board',
    icon: 'MessageSquare',
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
