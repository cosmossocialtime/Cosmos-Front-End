import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { useCalendar } from '../../../context/CalendarProvider'
import getDaysOfMonth from '../../../utils/getDaysOfMonth'
import { DefaultCardDay } from './DefaultCardDay'
import { PopoverEvents } from './PopoverEvents'
import { PopoverEvent } from './PopoverEvent'
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
  const { events, changeVisiblePopover, selectedEvent, visiblePopover } =
    useCalendar()

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

      <div className="grid flex-1 grid-cols-7 gap-2 2xl:gap-6">
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
            <Popover.Root
              key={day.toString()}
              onOpenChange={(open) =>
                open === false && changeVisiblePopover(null)
              }
            >
              <Popover.Trigger>
                <DefaultCardDay
                  day={formattedDay}
                  onClick={() => changeVisiblePopover('Create Event')}
                />
              </Popover.Trigger>
              <PopoverEventForm currentDay={day.toDate()} />
            </Popover.Root>
          ) : (
            <Popover.Root
              key={day.toString()}
              onOpenChange={(open) =>
                open
                  ? changeVisiblePopover('Events')
                  : changeVisiblePopover(null)
              }
            >
              <Popover.Trigger>
                <DefaultCardDay
                  day={formattedDay}
                  className="border-none bg-violet-400 text-white hover:bg-violet-500"
                >
                  <span className="absolute left-2 top-2">{formattedDay}</span>
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-clip truncate px-2">
                    {dayjs(ordenedEvents[0].startAt).format('HH:mm')}{' '}
                    {ordenedEvents[0].title}
                  </span>
                  {ordenedEvents.length > 1 && (
                    <span className="absolute bottom-2 left-2">
                      Mais {ordenedEvents.length - 1}
                    </span>
                  )}
                </DefaultCardDay>
              </Popover.Trigger>
              {visiblePopover === 'Create Event' ? (
                <PopoverEventForm
                  currentDay={day.toDate()}
                  event={selectedEvent}
                />
              ) : visiblePopover === 'Events' ? (
                <PopoverEvents events={ordenedEvents} day={day} />
              ) : visiblePopover === 'Event' ? (
                <PopoverEvent />
              ) : null}
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
