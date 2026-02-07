import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTAProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

export function CTA({ href, onClick, variant = 'primary', className, children }: CTAProps) {
  const baseClasses = variant === 'primary' ? 'cta-button' : 'cta-button-secondary'
  
  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, className)}>
      {children}
    </button>
  )
}
