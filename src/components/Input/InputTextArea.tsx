import { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function InputTextArea({ className, ...rest }: InputTextAreaProps) {
  return (
    <textarea
      {...rest}
      className={twMerge(
        'placeholder:gray-500 flex-1 resize-none rounded border border-solid border-gray-400 p-4',
        className,
      )}
    ></textarea>
  )
}
