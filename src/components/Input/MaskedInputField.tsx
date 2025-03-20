import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useState } from 'react'

interface MaskedInputFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  register: UseFormRegister<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: string
  setValue: UseFormSetValue<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  disabled?: boolean
  className?: string
}

export default function MaskedInputField({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  setValue,
  disabled,
  className,
}: MaskedInputFieldProps) {
  const [inputValue, setInputValue] = useState('')

  const maskMap: Record<string, string> = {
    cnpj: '99.999.999/9999-99',
    celular: '+99 (99) 99999-9999',
  }

  const mask = maskMap[name] || ''

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    if (numericValue === '') return ''

    const formattedValue = (parseFloat(numericValue) / 100).toLocaleString(
      'pt-BR',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )

    return `R$ ${formattedValue}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value

    if (name === 'receitaAnual') {
      const formattedValue = formatCurrency(rawValue)
      setInputValue(formattedValue)

      const numericValue = formattedValue
        .replace('R$ ', '')
        .replace(/\./g, '')
        .replace(',', '.')
      setValue(name, numericValue, { shouldValidate: true })
    } else {
      rawValue = rawValue.replace(/\D/g, '')
      setValue(name, rawValue, { shouldValidate: true })
    }
  }

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          {...register(name)}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${className} mt-1 w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
          onChange={(e) =>
            setValue(name, e.target.value, { shouldValidate: true })
          }
          disabled={disabled}
        />
      ) : (
        <input
          {...register(name)}
          id={name}
          type={type}
          placeholder={placeholder}
          value={name === 'receitaAnual' ? inputValue : undefined}
          className={`mt-1 w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
