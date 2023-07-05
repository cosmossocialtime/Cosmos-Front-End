import dayjs from 'dayjs'
import { Calendar, Clock, X } from 'phosphor-react'

interface HeaderProps {
  title?: string
  step: string
  startDate: Date
  endDate: Date
  weeklyHours: number
}

export function Header({
  title,
  step,
  startDate,
  endDate,
  weeklyHours,
}: HeaderProps) {
  return (
    <header className="relative flex items-center gap-7 px-20 py-7 shadow-lg after:absolute after:left-0 after:bottom-0 after:h-[6px] after:w-full after:bg-gradient-to-l after:from-violet-400 after:to-blue-300">
      <div>
        <span className="text-xl">Formulário de inscrição</span>
        <h1 className="text-3xl font-semibold text-gray-600">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={44} weight="thin" />
        <div className="flex flex-col">
          <span>de {dayjs(startDate).format('DD/MM/YYYY')}</span>
          <span>de {dayjs(endDate).format('DD/MM/YYYY')}</span>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Clock size={44} weight="thin" />
        <span className="w-48">
          {weeklyHours} horas de dedicação por semana
        </span>
      </div>
      <span className="text-violet-600">{step}</span>
      <X size={24} className="cursor-pointer" />
    </header>
  )
}
