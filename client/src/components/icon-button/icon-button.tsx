import clsx from 'clsx'
import { ReactNode } from 'react'

type IconButtonProps = {
  children: ReactNode
  className?: string
}

export default function IconButton({ children, className }: IconButtonProps) {
  return (
    <button
      className={clsx('border rounded-full p-2 bg-gray-50 shadow', className)}
    >
      {children}
    </button>
  )
}
