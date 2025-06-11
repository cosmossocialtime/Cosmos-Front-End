import * as Popover from '@radix-ui/react-popover'
import { popovers, useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'
import { PopoverEvent } from './PopoverEvent'
import { X } from 'phosphor-react'

export function PopoverEvents() {
  const { changeSelectedEvent, changePopover, events, selectedDay } =
    useCalendar()

  if (!selectedDay) {
    return <h1>Dia não encontrado.</h1>
  }

  const eventsOfTheDay = events.filter((event) =>
    dayjs(event.startAt).isSame(dayjs(selectedDay), 'day')
  )
  const ordenedEvents = eventsOfTheDay.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt))
  )

  function createNewEvent() {
    changeSelectedEvent(null)
    changePopover(popovers.EventForm)
  }

  return (
    <>
      <Popover.Close className="absolute right-4 top-4">
        <X size={24} />
      </Popover.Close>
      <span className="text-xl">Eventos</span>
      <div className="my-4 flex max-h-[24rem] w-full flex-col gap-3 overflow-y-auto">
        {ordenedEvents.map((event) => {
          const hourStart = dayjs(event.startAt).format('HH:mm')
          const hourEnd = dayjs(event.endAt).format('HH:mm')

          return (
            <Popover.Root key={event.startAt.toString()}>
              <Popover.Trigger className="group" asChild>
                <button
                  onClick={() => {
                    changeSelectedEvent(event)
                    changePopover(popovers.Event)
                  }}
                  key={event.id}
                  className="w-full cursor-pointer rounded-lg border border-solid border-white/40 p-3 hover:border-white"
                >
                  <div className="flex w-full justify-between">
                    <span className="break-words">{event.title}</span>
                    <span className="ml-4 whitespace-nowrap">
                      {hourStart} - {hourEnd}
                    </span>
                  </div>
                </button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  key={'popoverEvent'}
                  side={'right'}
                  className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
                >
                  <PopoverEvent />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )
        })}
      </div>

      <button
        className=" rounded-lg border border-solid bg-white px-10 py-2 font-semibold text-violet-500 transition-colors hover:border-white hover:bg-violet-600 hover:text-white"
        onClick={() => createNewEvent()}
      >
        Marcar novo evento
      </button>
    </>
  )
}
