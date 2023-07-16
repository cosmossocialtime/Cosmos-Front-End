import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default forwardRef<HTMLInputElement, InputProps>(function InputContent(
  { className, ...rest }: InputProps,
  ref,
) {
  return (
    <input
      ref={ref}
      {...rest}
      className={twMerge(
        'flex-1 rounded border border-solid border-gray-400 py-3 px-4 outline-none placeholder:text-gray-800 placeholder:opacity-25 disabled:border-0 disabled:border-b',
        className,
      )}
    />
  )
})
