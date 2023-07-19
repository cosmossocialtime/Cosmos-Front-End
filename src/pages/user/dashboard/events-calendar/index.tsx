import dayjs from 'dayjs'

import { CaretLeft, CaretRight } from 'phosphor-react'

import { useState } from 'react'
import getDaysOfMonth from '../../../../utils/getDaysOfMonth'
import SideBar from '../sideBar'
import CardOfDaysWeek from '../../../../components/dashboard/events-calendar/CardOfDaysWeek'

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export default function CalendarioEventosPage() {
  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [daysOfMonth, setDaysOfMonth] = useState<dayjs.Dayjs[]>(
    getDaysOfMonth(currentMonth),
  )

  const firstDayWeekOfMonth = Number(daysOfMonth[0].format('d'))
  const daysOfPreviousMonth = Array.from({ length: firstDayWeekOfMonth })

  const daysOfNextMonth = Array.from({
    length: 42 - daysOfMonth.length - daysOfPreviousMonth.length,
  })

  function getNextMonth() {
    setCurrentMonth(currentMonth.add(1, 'month'))
    setDaysOfMonth(getDaysOfMonth(currentMonth.add(1, 'month')))
  }

  function getPreviuosMonth() {
    setCurrentMonth(currentMonth.subtract(1, 'month'))
    setDaysOfMonth(getDaysOfMonth(currentMonth.subtract(1, 'month')))
  }

  return (
    <div className="flex">
      <SideBar />
      <main className="flex max-h-screen flex-1 flex-col px-20 py-4 2xl:py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CaretLeft
              role={'button'}
              aria-label="Voltar ao mês anterior"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={getPreviuosMonth}
            />

            <h1
              aria-label="Mês atual"
              className="w-60 text-center text-3xl font-bold text-blue-900"
            >
              {currentMonth.format('MMMM YYYY')}
            </h1>

            <CaretRight
              role={'button'}
              aria-label="Pular para mês seguinte"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={getNextMonth}
            />
          </div>
        </header>

        <div className=" mt-4 flex w-full flex-1 flex-col gap-2 2xl:gap-4">
          <div className="grid w-full grid-cols-7 gap-2 text-center 2xl:gap-6">
            {daysOfWeek.map((day) => {
              return (
                <h3 key={day} className="text-xl font-medium text-gray-500">
                  {day}
                </h3>
              )
            })}
          </div>

          <div className="grid flex-1 grid-cols-7 gap-2 2xl:gap-6">
            {daysOfPreviousMonth.map((_, index) => (
              <div
                key={index}
                className="relative w-full cursor-not-allowed rounded-2xl bg-zinc-100 p-3 opacity-60"
              >
                <span className="absolute top-3 left-3">{`0${index + 1}`}</span>
              </div>
            ))}

            {daysOfMonth.map((day) => (
              <CardOfDaysWeek key={day.toString()} day={day} />
            ))}
            {daysOfNextMonth.map((_, index) => (
              <div
                key={index}
                className="relative w-full cursor-not-allowed rounded-2xl bg-zinc-100 p-3 opacity-60"
              >
                <span className="absolute top-3 left-3">{`${
                  index + 1 < 10 ? '0' : ''
                }${index + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
