import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  register?: UseFormRegisterReturn<any>
}

export default function InputContent({
  className,
  register,
  ...rest
}: inputProps) {
  return (
    <input
      ref={register?.ref}
      {...rest}
      className={twMerge(
        'flex-1 rounded border border-solid border-gray-400 py-3 px-4 outline-none placeholder:text-gray-800 placeholder:opacity-25 disabled:border-0 disabled:border-b',
        className,
      )}
    />
  )
}
