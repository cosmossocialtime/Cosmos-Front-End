import * as Popover from '@radix-ui/react-popover'
import { EventProps } from '../../../types/event'
import { useCalendar } from '../../../context/CalendarProvider'

interface PopoverEventsProps {
  eventsOfTheDay: EventProps[]
}

export function PopoverEvents({ eventsOfTheDay }: PopoverEventsProps) {
  const { changeSelectedEvent, changeVisiblePopover } = useCalendar()

  return (
    <Popover.Portal>
      <Popover.Content
        side={'right'}
        className="m-4 rounded-lg bg-violet-500 p-4 text-white"
      >
        <h3 className="text-xl">Eventos</h3>
        <div className="my-4 flex flex-col gap-2">
          {eventsOfTheDay.map((event) => (
            <button
              onClick={() => changeSelectedEvent(event)}
              key={event.id}
              className="flex cursor-pointer justify-between gap-3 rounded-lg border border-solid border-white/40 p-2 hover:border-white"
            >
              <span>{event.title}</span>
              <span>19h - 21h</span>
            </button>
          ))}
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
