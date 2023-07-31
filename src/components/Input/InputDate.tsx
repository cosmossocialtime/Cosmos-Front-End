import { Calendar } from 'phosphor-react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { twMerge } from 'tailwind-merge'
import 'react-datepicker/dist/react-datepicker.css'

interface InputDateProps extends ReactDatePickerProps {
  className?: string
}

export function InputDate({ className, ...rest }: InputDateProps) {
  return (
    <div
      className={twMerge(
        `${
          rest.disabled ? 'border-0 border-b' : 'border'
        } flex flex-1 items-center gap-2 rounded border-solid border-gray-400 px-4 py-3 outline-none`,
        className,
      )}
    >
      <Calendar size={24} />
      <DatePicker {...rest} dateFormat={'dd/MM/yyyy'} />
    </div>
  )
}
