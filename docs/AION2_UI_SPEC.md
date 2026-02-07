# Aion 2 사이트 UI/디자인 기획서 (Design 3 스타일)
## 외형 구축 Phase - 수정 용이 구조

**작성일**: 2025년 11월 13일  
**디자인 컨셉**: 클린 모던 위키  
**개발 방식**: 컴포넌트 기반 + 설정 파일 분리  
**목표**: 기능 없이 외형만 먼저 완성, 쉽게 수정 가능

---

## 📋 목차
1. [프로젝트 구조](#1-프로젝트-구조)
2. [기술 스택](#2-기술-스택)
3. [디자인 시스템](#3-디자인-시스템)
4. [페이지 레이아웃](#4-페이지-레이아웃)
5. [컴포넌트 명세](#5-컴포넌트-명세)
6. [설정 파일 구조](#6-설정-파일-구조)
7. [더미 데이터](#7-더미-데이터)

---

## 1. 프로젝트 구조

### 1.1 디렉토리 구조 (수정 용이성 중심)

```
aion2-site/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── page.tsx             # 메인 페이지
│   │   ├── guides/              # 가이드 페이지들
│   │   ├── database/            # 데이터베이스 페이지들
│   │   └── calculator/          # 계산기 페이지들
│   │
│   ├── components/              # UI 컴포넌트 (가장 자주 수정)
│   │   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainContainer.tsx
│   │   ├── sections/           # 페이지 섹션 컴포넌트
│   │   │   ├── HeroSearch.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   └── StatsCard.tsx
│   │   └── common/             # 공통 컴포넌트
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── IconBox.tsx
│   │
│   ├── config/                  # 설정 파일 (여기만 수정하면 됨!)
│   │   ├── site-config.ts      # 사이트 기본 설정
│   │   ├── theme-config.ts     # 색상, 폰트 등
│   │   ├── navigation.ts       # 메뉴 구조
│   │   └── content-config.ts   # 콘텐츠 설정
│   │
│   ├── data/                    # 더미 데이터 (쉽게 교체 가능)
│   │   ├── categories.ts
│   │   ├── articles.ts
│   │   ├── guides.ts
│   │   └── items.ts
│   │
│   └── lib/
│       ├── utils.ts            # 유틸리티 함수
│       └── cn.ts               # Tailwind 클래스 병합
│
├── public/
│   ├── images/                 # 이미지 파일
│   └── icons/                  # 아이콘 파일
│
├── tailwind.config.ts          # Tailwind 설정 (색상 수정 용이)
├── next.config.js
└── package.json
```

---

## 2. 기술 스택

```json
{
  "framework": "Next.js 15 (App Router)",
  "styling": "Tailwind CSS v4",
  "components": "shadcn/ui",
  "icons": "lucide-react",
  "fonts": "Pretendard (한글 최적화)",
  "darkMode": "next-themes",
  "typeScript": true
}
```

### 2.1 설치 명령어

```bash
# 프로젝트 생성
npx create-next-app@latest aion2-site --typescript --tailwind --app

# shadcn/ui 초기화
npx shadcn@latest init

# 필요한 컴포넌트 설치
npx shadcn@latest add button card badge input tabs

# 추가 패키지
npm install lucide-react next-themes
```

---

## 3. 디자인 시스템

### 3.1 색상 팔레트 (Tailwind Config에서 수정)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Light Mode
        background: 'hsl(0 0% 100%)',        // 흰색
        foreground: 'hsl(222.2 84% 4.9%)',   // 거의 검정
        
        // Primary (Blue)
        primary: {
          DEFAULT: 'hsl(217.2 91.2% 59.8%)', // #3b82f6
          foreground: 'hsl(0 0% 100%)',
        },
        
        // Secondary (Gray)
        secondary: {
          DEFAULT: 'hsl(210 40% 96.1%)',     // #f3f4f6
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        
        // Muted (밝은 회색)
        muted: {
          DEFAULT: 'hsl(210 40% 96.1%)',     // #f3f4f6
          foreground: 'hsl(215.4 16.3% 46.9%)', // #6b7280
        },
        
        // Accent (강조 색상)
        accent: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        
        // Border
        border: 'hsl(214.3 31.8% 91.4%)',    // #e5e7eb
        
        // Input
        input: 'hsl(214.3 31.8% 91.4%)',
        
        // Ring (focus)
        ring: 'hsl(217.2 91.2% 59.8%)',
      },
      
      // Dark Mode는 .dark 클래스로 자동 적용
      // CSS Variables로 관리되므로 쉽게 수정 가능
    }
  }
}
```

### 3.2 타이포그래피

```typescript
// config/theme-config.ts
export const typography = {
  // 헤딩
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  
  // 본문
  body: 'text-base leading-relaxed',
  small: 'text-sm',
  tiny: 'text-xs',
  
  // 강조
  lead: 'text-xl text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  
  // 한글 최적화
  lineHeight: {
    tight: '1.4',
    normal: '1.7',    // 한글에 최적
    relaxed: '1.8',
  }
}
```

### 3.3 간격 시스템

```typescript
// config/theme-config.ts
export const spacing = {
  // Container
  container: {
    padding: {
      DEFAULT: '1rem',    // 16px
      sm: '2rem',         // 32px
      lg: '4rem',         // 64px
      xl: '5rem',         // 80px
    },
    maxWidth: {
      DEFAULT: '1280px',
      wide: '1536px',
    }
  },
  
  // Sections
  section: {
    padding: {
      y: 'py-12',       // 상하 48px
      yLarge: 'py-20',  // 상하 80px
    }
  },
  
  // Cards
  card: {
    padding: 'p-6',     // 24px
    gap: 'gap-4',       // 16px
  }
}
```

### 3.4 반응형 브레이크포인트

```typescript
// Tailwind 기본값 사용
{
  sm: '640px',   // 모바일
  md: '768px',   // 태블릿
  lg: '1024px',  // 데스크탑
  xl: '1280px',  // 대형 데스크탑
  '2xl': '1536px'
}
```

---

## 4. 페이지 레이아웃

### 4.1 메인 페이지 (/) - 3개 섹션

```typescript
// app/page.tsx 구조
export default function HomePage() {
  return (
    <>
      <HeroSearch />      {/* 검색 영역 */}
      <CategoryGrid />    {/* 카테고리 그리드 */}
      <ArticleList />     {/* 최신 문서 목록 */}
    </>
  )
}
```

#### 섹션 1: HeroSearch
```
┌─────────────────────────────────────────┐
│                                         │
│        Aion 2 정보 검색                 │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 🔍 클래스, 아이템, 퀘스트 검색   │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

#### 섹션 2: CategoryGrid (2x3 그리드)
```
┌───────────┬───────────┬───────────┐
│  👥       │  📈       │  🗺️      │
│ 클래스    │ 레벨링    │ 던전      │
│ 45개 문서 │ 32개 문서 │ 28개 문서 │
└───────────┴───────────┴───────────┘
┌───────────┬───────────┬───────────┐
│  🏷️      │  📚       │  🔔       │
│ 아이템    │ 퀘스트    │ 패치노트  │
│ 156개     │ 89개      │ 24개      │
└───────────┴───────────┴───────────┘
```

#### 섹션 3: ArticleList
```
┌─────────────────────────────────────────┐
│ [가이드] 초보자를 위한 아이온 2 시작... │
│ 2시간 전 | 👁️ 1,234 💬 15 👍 45      │
├─────────────────────────────────────────┤
│ [공략] 용의 둥지 던전 완벽 공략         │
│ 5시간 전 | 👁️ 2,567 💬 28 👍 89      │
└─────────────────────────────────────────┘
```

### 4.2 가이드 목록 페이지 (/guides)

```
┌─────────────────────────────────────────┐
│  Filters: [카테고리▼] [난이도▼] [정렬▼]│
├─────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │ 썸네일 │ │ 썸네일 │ │ 썸네일 │ │ 썸네일 │   │
│ │ 제목  │ │ 제목  │ │ 제목  │ │ 제목  │   │
│ │ 정보  │ │ 정보  │ │ 정보  │ │ 정보  │   │
│ └──────┘ └──────┘ └──────┘ └──────┘   │
└─────────────────────────────────────────┘
```

### 4.3 가이드 상세 페이지 (/guides/[slug])

```
┌─────────────────────────────────────────┐
│  제목: 초보자를 위한 시작 가이드        │
│  작성: 홍길동 | 2025.11.10 | 👁️ 1,234  │
├────────────┬────────────────────────────┤
│ [ TOC ]    │  # 본문 내용               │
│ - 목차1    │                            │
│ - 목차2    │  Lorem ipsum...            │
│ - 목차3    │                            │
│            │  ## 섹션 제목              │
│ (Sticky)   │                            │
│            │  본문 계속...              │
└────────────┴────────────────────────────┘
```

### 4.4 데이터베이스 페이지 (/database/items)

```
┌─────────────────────────────────────────┐
│  🔍 검색  [타입▼] [레어도▼] [레벨▼]    │
├─────────────────────────────────────────┤
│ 💎 전설의 검        Lv.80  ⚔️ 무기     │
│ ATK +500 | CRI +20%                     │
├─────────────────────────────────────────┤
│ 🛡️ 강철 갑옷        Lv.75  🛡️ 방어구  │
│ DEF +300 | HP +1000                     │
└─────────────────────────────────────────┘
```

---

## 5. 컴포넌트 명세

### 5.1 레이아웃 컴포넌트

#### Header (components/layout/Header.tsx)
```typescript
interface HeaderProps {
  // 설정 파일에서 가져옴
}

// 구성 요소
- 로고 (왼쪽)
- 네비게이션 메뉴 (중앙)
- 검색 아이콘 + 다크모드 토글 (오른쪽)
- 모바일: 햄버거 메뉴

// 스타일
- 배경: bg-white dark:bg-gray-800
- 보더: border-b border-gray-200 dark:border-gray-700
- 높이: h-16
- Sticky: sticky top-0 z-40
- Blur: backdrop-blur-lg bg-opacity-90
```

#### Footer (components/layout/Footer.tsx)
```typescript
// 구성 요소
- 사이트 정보 (3개 컬럼)
  1. 사이트 소개
  2. 빠른 링크
  3. 커뮤니티
- 하단 저작권 표시
- 소셜 미디어 아이콘

// 스타일
- 배경: bg-gray-100 dark:bg-gray-800
- 보더: border-t border-gray-200 dark:border-gray-700
- 패딩: py-12
```

#### MainContainer (components/layout/MainContainer.tsx)
```typescript
interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'wide' | 'narrow';
}

// 용도: 페이지 콘텐츠를 감싸는 컨테이너
// 스타일
- container mx-auto px-4
- max-w-[1280px] (기본)
- py-8 (상하 여백)
```

### 5.2 섹션 컴포넌트

#### HeroSearch (components/sections/HeroSearch.tsx)
```typescript
interface HeroSearchProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

// 구성
1. 제목 (h1)
2. 부제목 (p)
3. 검색 입력 + 버튼
4. 인기 검색어 (선택)

// 스타일
- 배경: bg-gradient-to-b from-blue-50 to-white
         dark:from-gray-800 dark:to-gray-900
- 패딩: py-12
- 중앙 정렬: text-center
```

#### CategoryGrid (components/sections/CategoryGrid.tsx)
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;  // Lucide icon 이름
  description: string;
  count: number;
  href: string;
  color?: string;
}

interface CategoryGridProps {
  categories: Category[];
  columns?: 2 | 3 | 4;  // 반응형 그리드
}

// 레이아웃
- Desktop: grid-cols-3 (3열)
- Tablet: grid-cols-2 (2열)
- Mobile: grid-cols-1 (1열)
- gap-6

// 카드 스타일
- bg-white dark:bg-gray-800
- border border-gray-200 dark:border-gray-700
- rounded-lg
- p-6
- hover:border-blue-500 hover:shadow-lg
- transition-all
```

#### ArticleList (components/sections/ArticleList.tsx)
```typescript
interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  views: number;
  comments: number;
  likes: number;
}

interface ArticleListProps {
  articles: Article[];
  showFilters?: boolean;
}

// 레이아웃
- 리스트 형태 (세로 나열)
- 각 아이템: 카드 스타일
- 구분선: divide-y divide-gray-200

// 아이템 구성
1. 카테고리 뱃지
2. 제목
3. 요약
4. 메타 정보 (날짜, 조회수, 댓글, 좋아요)
```

### 5.3 공통 UI 컴포넌트

#### Card (components/common/Card.tsx)
```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;  // hover 효과 여부
  clickable?: boolean;
}

// 기본 스타일
- bg-white dark:bg-gray-800
- rounded-lg
- border border-gray-200 dark:border-gray-700

// variant별 스타일
- default: 기본 카드
- outlined: 보더 강조
- elevated: shadow-lg
```

#### Badge (components/common/Badge.tsx)
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

// 기본 스타일
- inline-flex items-center
- rounded-full
- px-3 py-1
- text-xs font-semibold

// variant별 색상
- default: bg-gray-100 text-gray-800
- primary: bg-blue-100 text-blue-800
- success: bg-green-100 text-green-800
- warning: bg-yellow-100 text-yellow-800
- danger: bg-red-100 text-red-800

// Dark mode 자동 적용
```

#### IconBox (components/common/IconBox.tsx)
```typescript
interface IconBoxProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  color?: string;  // Tailwind color
  variant?: 'solid' | 'outline' | 'ghost';
}

// 용도: 아이콘을 감싸는 예쁜 박스
// 사용 예: 카테고리 아이콘, 기능 아이콘 등

// 기본 스타일
- rounded-lg
- flex items-center justify-center
- size 별 크기
  - sm: w-10 h-10
  - md: w-12 h-12
  - lg: w-16 h-16
```

### 5.4 shadcn/ui 컴포넌트 사용

```bash
# 필수 컴포넌트
npx shadcn@latest add button      # 버튼
npx shadcn@latest add card        # 카드
npx shadcn@latest add badge       # 뱃지
npx shadcan@latest add input      # 입력
npx shadcn@latest add tabs        # 탭
npx shadcn@latest add select      # 드롭다운
npx shadcn@latest add separator   # 구분선

# 추가 컴포넌트 (필요시)
npx shadcn@latest add dialog      # 모달
npx shadcn@latest add dropdown-menu  # 드롭다운 메뉴
npx shadcn@latest add avatar      # 아바타
npx shadcn@latest add tooltip     # 툴팁
```

---

## 6. 설정 파일 구조 (여기만 수정하면 됨!)

### 6.1 사이트 기본 설정 (config/site-config.ts)

```typescript
export const siteConfig = {
  // 기본 정보
  name: 'Aion 2 Wiki',
  title: 'Aion 2 - 아이온 2 정보 사이트',
  description: '아이온 2 종합 정보, 가이드, 공략, 계산기',
  url: 'https://aion2ya.com',
  
  // 로고
  logo: {
    text: 'AION 2',
    icon: '📚', // 또는 이미지 경로
  },
  
  // 소셜 미디어
  social: {
    discord: 'https://discord.gg/aion2',
    youtube: 'https://youtube.com/@aion2',
    twitter: 'https://twitter.com/aion2',
  },
  
  // 메타 정보
  keywords: ['아이온2', 'Aion 2', '아이온', 'MMORPG', '가이드', '공략'],
  
  // 기능 토글
  features: {
    search: true,
    darkMode: true,
    comments: false,  // Phase 2
    auth: false,      // Phase 2
  }
}
```

### 6.2 테마 설정 (config/theme-config.ts)

```typescript
export const themeConfig = {
  // 기본 색상 (Tailwind 클래스명)
  colors: {
    primary: 'blue',      // 메인 색상
    secondary: 'gray',    // 보조 색상
    accent: 'purple',     // 강조 색상
    success: 'green',
    warning: 'yellow',
    error: 'red',
  },
  
  // 폰트
  fonts: {
    heading: 'font-bold',
    body: 'font-normal',
    mono: 'font-mono',
  },
  
  // 모서리 둥글기
  radius: {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  },
  
  // 그림자
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  
  // 애니메이션
  transitions: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  }
}
```

### 6.3 네비게이션 설정 (config/navigation.ts)

```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: string;  // Lucide icon 이름
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
    label: '계산기',
    href: '/calculator',
    icon: 'Calculator',
  },
  {
    label: '커뮤니티',
    href: '/community',
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
```

### 6.4 콘텐츠 설정 (config/content-config.ts)

```typescript
export const contentConfig = {
  // 메인 페이지 텍스트
  home: {
    hero: {
      title: 'Aion 2 정보 검색',
      subtitle: '클래스, 아이템, 퀘스트를 검색하세요',
      searchPlaceholder: '검색어를 입력하세요',
    },
    categories: {
      title: '주요 카테고리',
      subtitle: '원하는 정보를 찾아보세요',
    },
    articles: {
      title: '최신 문서',
      subtitle: '최근 업데이트된 가이드와 정보',
    },
  },
  
  // 페이지별 헤더
  pageHeaders: {
    guides: {
      title: '가이드',
      description: '아이온 2 공략 및 팁',
    },
    database: {
      title: '데이터베이스',
      description: '아이템, 스킬, 던전 정보',
    },
    calculator: {
      title: '계산기',
      description: '효율 분석 및 계산 도구',
    },
  },
  
  // 페이지당 아이템 수
  pagination: {
    articlesPerPage: 10,
    itemsPerPage: 20,
  },
}
```

---

## 7. 더미 데이터

### 7.1 카테고리 데이터 (data/categories.ts)

```typescript
import { BookOpen, TrendingUp, MapPin, Tag, List, Bell } from 'lucide-react'

export const categories = [
  {
    id: 'class-guides',
    name: '클래스 가이드',
    icon: 'Users',  // Lucide icon 이름
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
```

### 7.2 문서 데이터 (data/articles.ts)

```typescript
export const articles = [
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
    thumbnail: '/images/guide-beginner.jpg',
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
    thumbnail: '/images/dungeon-dragon.jpg',
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
    thumbnail: '/images/weapon-analysis.jpg',
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
    thumbnail: '/images/gladiator-build.jpg',
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
    thumbnail: '/images/hunting-ground.jpg',
    tags: ['레벨링', '사냥터', '효율'],
  },
]
```

### 7.3 가이드 상세 데이터 (data/guide-detail.ts)

```typescript
export const guideDetail = {
  id: '1',
  title: '초보자를 위한 아이온 2 시작 가이드',
  category: '가이드',
  author: {
    name: '운영자',
    avatar: '/avatars/admin.jpg',
    role: '관리자',
  },
  publishedAt: '2025-11-13T10:00:00Z',
  updatedAt: '2025-11-13T10:00:00Z',
  views: 1234,
  likes: 45,
  thumbnail: '/images/guide-beginner.jpg',
  tags: ['초보', '시작', '가이드'],
  
  // 목차
  tableOfContents: [
    { id: 'intro', title: '시작하기', level: 1 },
    { id: 'character', title: '캐릭터 생성', level: 1 },
    { id: 'class', title: '클래스 선택', level: 2 },
    { id: 'appearance', title: '외형 커스터마이징', level: 2 },
    { id: 'tutorial', title: '튜토리얼', level: 1 },
    { id: 'first-quest', title: '첫 퀘스트', level: 2 },
    { id: 'combat', title: '전투 시스템', level: 2 },
    { id: 'level-10', title: '레벨 10까지', level: 1 },
    { id: 'tips', title: '초보자 팁', level: 1 },
  ],
  
  // 본문 (Markdown)
  content: `
# 시작하기

아이온 2에 오신 것을 환영합니다! 이 가이드는...

## 캐릭터 생성

### 클래스 선택
...

### 외형 커스터마이징
...
  `,
  
  // 관련 가이드
  relatedGuides: [
    {
      id: '4',
      title: '글래디에이터 PvP 빌드 추천',
      thumbnail: '/images/gladiator-build.jpg',
    },
    {
      id: '5',
      title: '레벨 60-70 구간 효율 사냥터 추천',
      thumbnail: '/images/hunting-ground.jpg',
    },
  ],
}
```

### 7.4 아이템 데이터 (data/items.ts)

```typescript
export const items = [
  {
    id: '1',
    name: '전설의 검',
    nameEn: 'Legendary Sword',
    type: 'weapon',
    subType: 'sword',
    rarity: 'legendary',
    level: 80,
    icon: '/icons/sword-legendary.png',
    stats: {
      attack: 500,
      critical: 20,
      speed: 1.2,
    },
    description: '고대 영웅이 사용했던 전설적인 검입니다.',
    howToObtain: [
      '용의 둥지 최종 보스 드롭',
      '전설 상자에서 확률 획득',
    ],
    marketPrice: 5000000,
  },
  {
    id: '2',
    name: '강철 갑옷',
    nameEn: 'Steel Armor',
    type: 'armor',
    subType: 'chest',
    rarity: 'rare',
    level: 75,
    icon: '/icons/armor-steel.png',
    stats: {
      defense: 300,
      hp: 1000,
    },
    description: '단단한 강철로 만든 갑옷입니다.',
    howToObtain: [
      '대장간에서 제작 가능',
      '레벨 75 퀘스트 보상',
    ],
    marketPrice: 500000,
  },
]
```

---

## 8. 개발 진행 순서

### Phase 1: 기본 설정 (1일차)
```bash
1. Next.js 프로젝트 생성
2. Tailwind CSS 설정
3. shadcn/ui 초기화 및 컴포넌트 설치
4. 디렉토리 구조 생성
5. 설정 파일 작성
```

### Phase 2: 레이아웃 컴포넌트 (2일차)
```bash
1. Header 컴포넌트
2. Footer 컴포넌트
3. MainContainer 컴포넌트
4. 다크모드 설정
5. 레이아웃 테스트
```

### Phase 3: 메인 페이지 (3일차)
```bash
1. HeroSearch 섹션
2. CategoryGrid 섹션
3. ArticleList 섹션
4. 더미 데이터 연결
5. 반응형 테스트
```

### Phase 4: 서브 페이지들 (4-5일차)
```bash
1. 가이드 목록 페이지
2. 가이드 상세 페이지
3. 데이터베이스 페이지
4. 계산기 페이지 (껍데기만)
5. 페이지 간 네비게이션 테스트
```

### Phase 5: 마무리 (6일차)
```bash
1. 전체 스타일 통일성 검토
2. 다크모드 모든 페이지 적용
3. 모바일 반응형 최종 점검
4. 성능 최적화 (이미지, 폰트)
5. 배포 준비
```

---

## 9. 수정 가이드

### 9.1 색상 변경하려면
```typescript
// config/theme-config.ts 파일에서
export const themeConfig = {
  colors: {
    primary: 'blue',  // ← 여기를 'purple', 'green' 등으로 변경
  }
}
```

### 9.2 메뉴 구조 변경하려면
```typescript
// config/navigation.ts 파일에서
export const navigation = [
  { label: '새 메뉴', href: '/new-page' },  // ← 추가
  // 기존 메뉴들...
]
```

### 9.3 메인 페이지 텍스트 변경하려면
```typescript
// config/content-config.ts 파일에서
export const contentConfig = {
  home: {
    hero: {
      title: '원하는 제목',  // ← 변경
      subtitle: '원하는 부제목',  // ← 변경
    }
  }
}
```

### 9.4 카테고리 추가/삭제하려면
```typescript
// data/categories.ts 파일에서
export const categories = [
  // 기존 카테고리들...
  {
    id: 'new-category',
    name: '새 카테고리',
    icon: 'Star',  // Lucide 아이콘
    count: 0,
    href: '/new',
    color: 'pink',
  },
]
```

### 9.5 컴포넌트 스타일 변경하려면
```typescript
// components/섹션이름/컴포넌트.tsx 파일에서
// Tailwind 클래스를 직접 수정

// 예: 카드 배경색 변경
<div className="bg-white dark:bg-gray-800">  
// ↓ 변경
<div className="bg-blue-50 dark:bg-blue-900">
```

---

## 10. 체크리스트

### 개발 시작 전 확인사항
- [ ] Node.js 18+ 설치 확인
- [ ] 에디터 (VS Code) 설정
- [ ] Tailwind CSS IntelliSense 확장 설치
- [ ] 디자인 목업 준비 (design3.html 참고)

### 개발 중 확인사항
- [ ] 모든 페이지 Light/Dark 모드 동작
- [ ] 모바일 (375px), 태블릿 (768px), 데스크탑 (1280px) 반응형
- [ ] 컴포넌트 재사용성 확인
- [ ] 설정 파일 분리 완료
- [ ] 더미 데이터 연결 완료

### 완성 후 확인사항
- [ ] 모든 링크 동작 확인
- [ ] 404 페이지 작성
- [ ] Loading 상태 UI
- [ ] 이미지 최적화 (Next Image)
- [ ] SEO 메타 태그
- [ ] Lighthouse 점수 80+ (Performance)

---

## 부록: 참고 자료

### Tailwind CSS 문서
- https://tailwindcss.com/docs

### shadcn/ui 컴포넌트
- https://ui.shadcn.com/docs/components

### Lucide Icons
- https://lucide.dev/icons/

### Next.js 문서
- https://nextjs.org/docs

---

## 📞 문의사항

기획서 관련 질문이나 수정 요청이 있으면 언제든 말씀해주세요!

- 특정 컴포넌트 스타일 변경
- 레이아웃 구조 조정
- 새로운 섹션 추가
- 색상/폰트 변경

모두 설정 파일만 수정하면 되도록 구조화되어 있습니다! 🚀
