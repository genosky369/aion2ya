export const themeConfig = {
  // 기본 색상 (Tailwind 클래스명)
  colors: {
    primary: 'blue',
    secondary: 'gray',
    accent: 'purple',
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
}

export const spacing = {
  // Container
  container: {
    padding: {
      DEFAULT: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
    },
    maxWidth: {
      DEFAULT: '1280px',
      wide: '1536px',
    }
  },
  
  // Sections
  section: {
    padding: {
      y: 'py-12',
      yLarge: 'py-20',
    }
  },
  
  // Cards
  card: {
    padding: 'p-6',
    gap: 'gap-4',
  }
}
