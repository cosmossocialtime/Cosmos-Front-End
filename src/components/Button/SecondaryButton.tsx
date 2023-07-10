import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function SecondaryButton({
  children,
  className,
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        'rounded-lg border-2 border-solid border-violet-600 bg-white text-violet-600 transition-colors hover:bg-violet-600 hover:text-gray-100',
        className,
      )}
    >
      {children}
    </button>
  )
}
