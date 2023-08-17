import { ReactNode } from 'react'

export type CardProps = {
  className?: string
  children?: ReactNode
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-md shadow-md ${className}`}>
      {children}
    </div>
  )
}
