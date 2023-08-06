import { CaretRight, Clock } from 'phosphor-react'
import dayjs from 'dayjs'
import { useLogBook } from '../../../context/LogBookProvider'
import { EventEntryProps } from '../../../types/EventEntry'

interface CardEventProps {
  eventEntry: EventEntryProps
}

export function CardEvent({ eventEntry }: CardEventProps) {
  const { changeSelectedEvent } = useLogBook()
  const { event, index } = eventEntry

  const eventDay = dayjs(event.startAt)
  const endEvent = dayjs(event.endAt)

  return (
    <button
      className="flex max-w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border border-solid border-transparent bg-gray-200 px-8 py-5 text-gray-600 hover:border-violet-500"
      onClick={() => changeSelectedEvent(eventEntry)}
    >
      <div className="flex items-center gap-8">
        <div className="text-violet-400">
          <span className="block text-2xl font-semibold">
            {eventDay.format('DD')}
          </span>
          <span className="text-xm block">
            {eventDay.format('ddd').toUpperCase()}
          </span>
        </div>

        <h3 className="max-w-[40ch] truncate font-semibold">
          Encontro {index}
        </h3>
      </div>

      <div className="flex items-center gap-16">
        <div className="flex flex-1 items-center justify-self-end">
          <Clock size={24} />
          <span className="font-semibold">
            {eventDay.format('HH[h]mm')} às {endEvent.format('HH[h]mm')}
          </span>
        </div>

        <CaretRight size={24} />
      </div>
    </button>
  )
}
