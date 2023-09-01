import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { useCalendar } from '../../../context/CalendarProvider'
import getDaysOfMonth from '../../../utils/getDaysOfMonth'
import { DefaultCardDay } from './DefaultCardDay'
import { PopoverEventForm } from './PopoverEventForm'

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
  const {
    events,
    popover: PopoverElement,
    selectDay,
    selectedDay,
  } = useCalendar()

  const daysOfMonth = getDaysOfMonth(currentDay)
  const daysOfLastMonth = getDaysOfMonth(currentDay.subtract(1, 'month'))

  const firstDayWeekOfMonth = Number(daysOfMonth[0].format('d'))
  const daysOfPreviousMonth = daysOfLastMonth.slice(
    daysOfLastMonth.length - firstDayWeekOfMonth,
  )

  const daysOfNextMonth = Array.from({
    length: 42 - daysOfMonth.length - daysOfPreviousMonth.length,
  })
  console.log(<PopoverElement />)

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
          const ordenedEvents = eventsOfTheDay.sort((a, b) =>
            dayjs(a.startAt).diff(dayjs(b.startAt)),
          )
          const noEvents = ordenedEvents.length === 0
          const formattedDay = dayjs(day).format('DD')
          return noEvents ? (
            <Popover.Root key={day.toString()}>
              <Popover.Trigger>
                <DefaultCardDay day={formattedDay} />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  side={'right'}
                  className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
                >
                  <PopoverEventForm />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : (
            <Popover.Root
              key={day.toString()}
              open={dayjs(selectedDay) === day}
              onOpenChange={(open) =>
                open ? selectDay(day.toDate()) : selectDay(null)
              }
            >
              <Popover.Trigger className="group">
                <DefaultCardDay
                  day={formattedDay}
                  className="border-none bg-violet-400 text-left text-white hover:bg-violet-500 group-data-[state='open']:bg-violet-500"
                >
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-clip truncate px-2 font-normal">
                    {dayjs(ordenedEvents[0].startAt).format('HH:mm')}{' '}
                    {ordenedEvents[0].title}
                  </span>
                  {ordenedEvents.length > 1 && (
                    <span className="absolute bottom-2 left-2 font-normal">
                      Mais {ordenedEvents.length - 1}
                    </span>
                  )}
                </DefaultCardDay>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  side={'right'}
                  className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
                >
                  <PopoverElement />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
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
