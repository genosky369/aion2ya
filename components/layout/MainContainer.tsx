import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MainContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'default' | 'wide' | 'narrow'
}

export default function MainContainer({ 
  children, 
  className,
  maxWidth = 'default' 
}: MainContainerProps) {
  const maxWidthClasses = {
    default: 'max-w-[1280px]',
    wide: 'max-w-[1536px]',
    narrow: 'max-w-[960px]',
  }

  return (
    <main 
      className={cn(
        'container mx-auto px-4 py-8',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </main>
  )
}
