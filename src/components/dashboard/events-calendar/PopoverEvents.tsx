import * as Popover from '@radix-ui/react-popover'
import { EventProps } from '../../../types/event'
import { useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'

interface PopoverEventsProps {
  events: EventProps[]
  day: dayjs.Dayjs
}

export function PopoverEvents({ events, day }: PopoverEventsProps) {
  const { changeSelectedEvent, changeVisiblePopover } = useCalendar()

  return (
    <Popover.Portal>
      <Popover.Content
        side={'right'}
        className="relative m-4  w-[28rem] rounded-lg bg-violet-500 p-5 text-white"
      >
        <span className="absolute right-4 top-4 text-xl">
          {day.format('DD MMM')}
        </span>
        <h3 className="text-xl">Eventos</h3>
        <div className="my-4 flex max-h-[24rem] w-full flex-col gap-3 overflow-y-auto">
          {events.map((event) => {
            const hourStart = dayjs(event.startAt).format('HH')
            const hourEnd = dayjs(event.endAt).format('HH')

            return (
              <button
                onClick={() => changeSelectedEvent(event)}
                key={event.id}
                className="cursor-pointer rounded-lg border border-solid border-white/40 p-3  hover:border-white"
              >
                <span>
                  {hourStart}h - {hourEnd}h
                </span>
                <p className="mt-2 break-words">{event.title}</p>
              </button>
            )
          })}
        </div>

        <button
          className=" rounded-lg border border-solid bg-white px-10 py-2 font-semibold text-violet-500 transition-colors hover:border-white hover:bg-violet-600 hover:text-white"
          onClick={() => changeVisiblePopover('Create Event')}
        >
          Marcar novo evento
        </button>
      </Popover.Content>
    </Popover.Portal>
  )
}
