import { Calendar } from 'phosphor-react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { twMerge } from 'tailwind-merge'

interface InputDateProps extends ReactDatePickerProps {
  className?: string
}

export function InputDate({ className, ...rest }: InputDateProps) {
  return (
    <div
      className={twMerge(
        `${
          rest.disabled ? 'border-0 border-b' : 'border'
        } flex flex-1 items-center gap-2 rounded border-solid border-gray-400 py-3 px-4 outline-none`,
        className,
      )}
    >
      <Calendar size={24} />
      <DatePicker {...rest} dateFormat={'dd/MM/yyyy'} />
    </div>
  )
}
