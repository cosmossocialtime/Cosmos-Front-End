import { useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'
import { EventProps } from '../../../types/event'

interface PopoverEventsProps {
  day: Date
  events: EventProps[]
}

export function PopoverEvents({ day, events }: PopoverEventsProps) {
  const { changeSelectedEvent, changePopover } = useCalendar()

  return (
    <>
      <span className="absolute right-4 top-4 text-xl">
        {dayjs(day).format('ddd, DD MMM')}
      </span>
      <h3 className="text-xl">Eventos</h3>
      <div className="my-4 flex max-h-[24rem] w-full flex-col gap-3 overflow-y-auto">
        {events.map((event) => {
          const hourStart = dayjs(event.startAt).format('HH:mm')
          const hourEnd = dayjs(event.endAt).format('HH:mm')

          return (
            <button
              onClick={() => changeSelectedEvent(event)}
              key={event.id}
              className="cursor-pointer rounded-lg border border-solid border-white/40 p-3  hover:border-white"
            >
              <span>
                {hourStart} - {hourEnd}
              </span>
              <p className="mt-2 break-words">{event.title}</p>
            </button>
          )
        })}
      </div>

      <button
        className=" rounded-lg border border-solid bg-white px-10 py-2 font-semibold text-violet-500 transition-colors hover:border-white hover:bg-violet-600 hover:text-white"
        onClick={() => changePopover('eventForm')}
      >
        Marcar novo evento
      </button>
    </>
  )
}
