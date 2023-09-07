import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { DefaultCardDay } from './DefaultCardDay'
import { popoversName, useCalendar } from '../../../context/CalendarProvider'
import { PopoverEventForm } from './PopoverEventForm'
import { PopoverEvent } from './PopoverEvent'
import { PopoverEvents } from './PopoverEvents'
import React from 'react'

interface EventsCardProps {
  day: Date
}

type PopoverProps = {
  popover: React.ElementType
  name: popoversName
}

export function EventsCard({ day }: EventsCardProps) {
  const { events, popoverName, selectDay, selectedDay } = useCalendar()

  const formattedDay = dayjs(day).format('DD')

  const eventsOfTheDay = events.filter((event) =>
    dayjs(event.startAt).isSame(dayjs(day), 'day'),
  )

  const ordenedEvents = eventsOfTheDay.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt)),
  )

  const Popovers: PopoverProps[] = [
    {
      popover: PopoverEventForm,
      name: 'eventForm',
    },
    {
      popover: PopoverEvent,
      name: 'event',
    },
    {
      popover: PopoverEvents,
      name: 'events',
    },
  ]

  const PopoverContent = Popovers.find(
    ({ name }) => name === popoverName,
  )?.popover

  return (
    <Popover.Root
      open={dayjs(day).isSame(selectedDay, 'day')}
      onOpenChange={(open) => (open ? selectDay(day) : selectDay(null))}
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
          {PopoverContent && <PopoverContent />}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
