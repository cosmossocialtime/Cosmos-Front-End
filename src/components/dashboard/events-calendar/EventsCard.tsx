import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { DefaultCardDay } from './DefaultCardDay'
import { useCalendar } from '../../../context/CalendarProvider'
import { PopoverEventForm } from './PopoverEventForm'
import { PopoverEvent } from './PopoverEvent'
import { PopoverEvents } from './PopoverEvents'
import React from 'react'

interface EventsCardProps {
  day: Date
}

export function EventsCard({ day }: EventsCardProps) {
  const { events, popoverName, changePopover, changeSelectedEvent } =
    useCalendar()

  const formattedDay = dayjs(day).format('DD')

  const eventsOfTheDay = events.filter((event) =>
    dayjs(event.startAt).isSame(dayjs(day), 'day'),
  )

  const ordenedEvents = eventsOfTheDay.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt)),
  )

  function changeOpenPopover(open: boolean) {
    if (open === false) {
      changePopover('events')
      changeSelectedEvent(null)
    }
  }

  return (
    <Popover.Root onOpenChange={(open) => changeOpenPopover(open)}>
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
          {popoverName === 'events' && (
            <PopoverEvents day={day} events={ordenedEvents} />
          )}
          {popoverName === 'event' && <PopoverEvent />}
          {popoverName === 'eventForm' && <PopoverEventForm day={day} />}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}