import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBoxProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'
  color?: string
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
}

export default function IconBox({ 
  icon: Icon, 
  size = 'md',
  color = 'blue',
  variant = 'solid',
  className 
}: IconBoxProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  const variantClasses = {
    solid: `bg-${color}-100 dark:bg-${color}-950/30 text-${color}-600 dark:text-${color}-400`,
    outline: `border-2 border-${color}-500 text-${color}-600 dark:text-${color}-400`,
    ghost: `text-${color}-600 dark:text-${color}-400`,
  }

  return (
    <div 
      className={cn(
        'rounded-lg flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  )
}
