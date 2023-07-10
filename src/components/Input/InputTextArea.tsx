import { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function InputTextArea({ className, ...rest }: InputTextAreaProps) {
  return (
    <div className="rounded border border-solid border-gray-400 p-4 outline-violet-500">
      <textarea
        {...rest}
        className={twMerge(
          'relative flex-1 resize-none border-none outline-none placeholder:text-gray-500',
          className,
        )}
      />
    </div>
  )
}
