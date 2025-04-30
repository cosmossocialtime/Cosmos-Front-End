import { useEffect, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputMask from 'react-input-mask'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'

interface MaskedDateFieldProps {
  label: string
  name: string
  placeholder?: string
  register: UseFormRegister<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: string
  setValue: UseFormSetValue<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultDate?: Date | null
}

export default function MaskedDateField({
  label,
  name,
  placeholder = 'Escreva ou selecione uma data',
  error,
  setValue,
  defaultDate = null,
}: MaskedDateFieldProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [inputValue, setInputValue] = useState(
    defaultDate !== null ? defaultDate.toLocaleDateString('pt-BR') : ''
  )

  useEffect(() => {
    if (defaultDate !== null) {
      const formatted = defaultDate.toLocaleDateString('pt-BR')
      setSelectedDate(defaultDate)
      setInputValue(formatted)
      setValue(name, formatted, { shouldValidate: true })
    }
  }, [defaultDate, name, setValue])

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const today = new Date()
      // Verifica se a data selecionada é maior que a data atual (no futuro)
      if (date > today) {
        setInputValue('') // Limpa o campo se for uma data no futuro
        setValue(name, '', { shouldValidate: true }) // Exibe uma mensagem de erro
      } else {
        // Caso a data seja válida (não no futuro)
        const formattedDate = date.toLocaleDateString('pt-BR')
        setSelectedDate(date)
        setValue(name, formattedDate, { shouldValidate: true })
        setInputValue(formattedDate)
      }
    } else {
      setInputValue('')
      setValue(name, '', { shouldValidate: true })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Verifica se o valor tem o formato correto (dd/MM/yyyy)
    const dateParts = value.split('/')
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts.map((part) => parseInt(part, 10))
      const date = new Date(year, month - 1, day)

      // Se a data for válida, atualiza o valor
      if (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
      ) {
        // Verifica novamente se a data não é no futuro
        const today = new Date()
        if (date > today) {
          setInputValue('') // Limpa o campo se for uma data no futuro
          setValue(name, '', { shouldValidate: true })
          alert('A data de fundação não pode estar no futuro.')
        } else {
          setSelectedDate(date)
          setValue(name, value, { shouldValidate: true })
        }
      }
    }
  }

  return (
    <div className="relative w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <InputMask
          mask="99/99/9999"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={(e) =>
            setValue(name, e.target.value, { shouldValidate: true })
          }
          placeholder={placeholder}
          className={`mt-1 w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200
                      hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500
                      focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
        />
        <div className="absolute right-3 top-2 cursor-pointer text-gray-500">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            customInput={
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-2"
              >
                <Image
                  src="/images/Calendar.png"
                  alt="Calendário"
                  width={20}
                  height={20}
                />
              </button>
            }
          />
        </div>
      </div>
      {/* {error && <p className="mt-1 text-sm text-red-500">{error}</p>} */}
    </div>
  )
}
