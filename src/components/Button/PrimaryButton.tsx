import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function PrimaryButton({
  children,
  className,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        'rounded-lg bg-violet-500 text-center text-lg font-semibold text-gray-100 transition-colors hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-violet-700',
        className,
      )}
    >
      {children}
    </button>
  )
}
