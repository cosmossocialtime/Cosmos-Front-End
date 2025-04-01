import { useState, useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface TextAreaFieldProps {
  dynamicLabel?: string
  label: string
  name: string
  placeholder?: string
  register: UseFormRegister<any>
  error?: string
  minLength?: number
  maxLength?: number
  value?: string
}

export default function TextAreaField({
  label,
  name,
  placeholder,
  register,
  error,
  dynamicLabel = '',
  minLength = 100,
  maxLength = 300,
  value,
}: TextAreaFieldProps) {
  const [charCount, setCharCount] = useState(value?.length || 0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Atualiza o contador de caracteres e a interação com o campo
  useEffect(() => {
    if (value) {
      setCharCount(value.length)
    }
  }, [value]) // Executa sempre que o valor mudar

  const isMaxReached = charCount >= maxLength
  const isMinNotReached = charCount > 0 && charCount < minLength

  return (
    <div
      className={`w-full rounded-lg border p-4 transition-all duration-200 focus-within:border-purple-500 hover:border-purple-500
            ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label.replace('[Nome do programa]', dynamicLabel)}
      </label>
      <div className="relative">
        <textarea
          {...register(name)} // Mantém a integração com o react-hook-form
          id={name}
          placeholder={placeholder}
          rows={4}
          value={value} // Controle do valor via props
          maxLength={maxLength}
          className={`w-full rounded-md border border-solid p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 
                        ${error ? 'border-red-500' : 'border-gray-400'}`}
        />
        <span
          className={`absolute bottom-4 right-3 text-xs ${
            isMaxReached ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {charCount} caracteres (De {minLength} a {maxLength})
        </span>
      </div>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}

      {isMinNotReached && (
        <span className="mt-1 text-sm text-red-500">
          O campo é obrigatório, mínimo de {minLength} caracteres
        </span>
      )}
      {isMaxReached && (
        <span className="mt-1 text-sm text-red-500">
          O limite de caracteres já foi atingido
        </span>
      )}
    </div>
  )
}
