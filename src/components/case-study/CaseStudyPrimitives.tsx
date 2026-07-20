import type { ReactNode } from 'react'

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="nokia-case__label">{children}</p>
}

export function SectionTitle({
  children,
  size = 'md',
}: {
  children: ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <h2
      className={`nokia-case__title font-bricolage nokia-case__title--${size}`}
    >
      {children}
    </h2>
  )
}

export function BodyText({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={`nokia-case__body ${className}`.trim()}>{children}</p>
}

export function CaptionText({ children }: { children: ReactNode }) {
  return <p className="nokia-case__caption">{children}</p>
}
