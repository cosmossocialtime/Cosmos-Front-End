import dayjs from 'dayjs'
import { useCalendar } from '../../../context/CalendarProvider'
import getDaysOfMonth from '../../../utils/getDaysOfMonth'
import { DefaultCardDay } from './DefaultCardDay'
import { EventCreatorCard } from './EventCreatorCard'
import { EventsCard } from './EventsCard'

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

interface CalendarProps {
  currentDay: dayjs.Dayjs
}

export function Calendar({ currentDay }: CalendarProps) {
  const { events } = useCalendar()

  const daysOfMonth = getDaysOfMonth(currentDay)
  const daysOfLastMonth = getDaysOfMonth(currentDay.subtract(1, 'month'))

  const firstDayWeekOfMonth = Number(daysOfMonth[0].format('d'))
  const daysOfPreviousMonth = daysOfLastMonth.slice(
    daysOfLastMonth.length - firstDayWeekOfMonth,
  )

  const daysOfNextMonth = Array.from({
    length: 42 - daysOfMonth.length - daysOfPreviousMonth.length,
  })

  return (
    <div className="mt-4 flex w-full flex-1 flex-col gap-2 text-gray-500 2xl:gap-4">
      <div className="grid w-full grid-cols-7 gap-2 text-center 2xl:gap-6">
        {daysOfWeek.map((day) => {
          return (
            <h3 key={day} className="text-xl font-medium">
              {day}
            </h3>
          )
        })}
      </div>

      <div className="grid flex-1 grid-cols-7 gap-2 ">
        {daysOfPreviousMonth.map((day, index) => (
          <DefaultCardDay
            key={day.toString()}
            day={dayjs(day).format('DD')}
            disabled
          />
        ))}
        {daysOfMonth.map((day) => {
          const eventsOfTheDay = events.filter((event) =>
            dayjs(event.startAt).isSame(dayjs(day), 'day'),
          )

          const noEvents = eventsOfTheDay.length === 0
          return noEvents ? (
            <EventCreatorCard day={day} key={day.toString()} />
          ) : (
            <EventsCard day={day.toDate()} key={day.toString()} />
          )
        })}

        {daysOfNextMonth.map((_, index) => (
          <DefaultCardDay
            key={index}
            day={`${index + 1 < 10 ? '0' : ''}${index + 1}`}
            disabled
          />
        ))}
      </div>
    </div>
  )
}
