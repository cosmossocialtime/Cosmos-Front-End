import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputTextProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  register: UseFormRegister<any>
  error?: string
  minLength?: number
  maxLength?: number
  dynamicLabel?: string
}

export function InputText({
  id,
  label,
  register,
  error,
  dynamicLabel = '',
  minLength = 100,
  maxLength = 300,
  ...rest
}: InputTextProps) {
  const [charCount, setCharCount] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
    setHasInteracted(true)
  }

  const isMaxReached = charCount >= maxLength
  const isMinNotReached = hasInteracted && charCount < minLength

  return (
    <div
      className={`w-full rounded-lg border p-4 transition-all duration-200 
      ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label.replace('[Nome do programa]', dynamicLabel)}
      </label>
      <div className="relative">
        <textarea
          {...register(id)}
          id={id}
          rows={4}
          maxLength={maxLength}
          onChange={handleChange}
          className={`w-full rounded-md border border-solid p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 
          ${error ? 'border-red-500' : 'border-gray-400'}`}
          {...rest}
        />
        <span
          className={`absolute bottom-4 right-3 text-xs ${
            isMaxReached ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {charCount} caracteres (De {minLength} a {maxLength})
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
