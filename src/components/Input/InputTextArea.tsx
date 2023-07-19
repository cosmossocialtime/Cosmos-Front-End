import { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  text?: string
  minChar?: number
  maxChar?: number
}

export function InputTextArea({
  className,
  text,
  minChar,
  maxChar,
  ...rest
}: InputTextAreaProps) {
  return (
    <div className="relative flex-1">
      <textarea
        {...rest}
        maxLength={maxChar}
        minLength={minChar}
        className={twMerge(
          'relative w-full resize-none rounded border border-solid border-gray-400 p-4 outline-violet-500 placeholder:text-gray-500 before:content-["0_caracteres"]',
          className,
        )}
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-between p-4 text-gray-900/25">
        <span>{text && text.length + ' caracteres'}</span>
        {(minChar || maxChar) && (
          <span>
            {minChar && 'mín. ' + minChar} {maxChar && 'máx. ' + maxChar}{' '}
            caracteres
          </span>
        )}
      </div>
    </div>
  )
}
