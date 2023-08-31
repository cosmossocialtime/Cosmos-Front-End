// import dayjs from 'dayjs'

// import { CaretLeft, CaretRight } from 'phosphor-react'

// import { useState } from 'react'
// import { CalendarProvider } from '../../../../context/CalendarProvider'
// import { Calendar } from '../../../../components/dashboard/events-calendar/Calendar'
import SideBar from '../sideBar'

export default function EventsCalendar() {
  // const [currentDay, setCurrentDay] = useState(dayjs())

  return (
    <div className="flex">
      <SideBar />
      <h1>Página em manutenção. Funcionamento em Breve</h1>
      {/* <main className="flex max-h-screen flex-1 flex-col px-20 py-4 2xl:py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CaretLeft
              role={'button'}
              aria-label="Voltar ao mês anterior"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={() => setCurrentDay(currentDay.subtract(1, 'month'))}
            />

            <h1
              aria-label="Mês atual"
              className="w-60 text-center text-3xl font-bold text-blue-900"
            >
              {currentDay.format('MMMM YYYY')}
            </h1>

            <CaretRight
              role={'button'}
              aria-label="Pular para mês seguinte"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={() => setCurrentDay(currentDay.add(1, 'month'))}
            />
          </div>
        </header>

        <CalendarProvider>
          <Calendar currentDay={currentDay} />
        </CalendarProvider>
      </main> */}
    </div>
  )
}
