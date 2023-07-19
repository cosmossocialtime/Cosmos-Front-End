import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputRootProps {
  children: ReactNode
  ariaLabel: string
  className?: string
}

export function InputRoot({ children, ariaLabel, className }: InputRootProps) {
  return (
    <label htmlFor="" className="text-gray-800">
      <span>{ariaLabel}</span>
      <div className={twMerge('mt-1 flex items-center', className)}>
        {children}
      </div>
    </label>
  )
}
