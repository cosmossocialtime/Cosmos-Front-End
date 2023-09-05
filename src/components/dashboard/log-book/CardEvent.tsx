import { CaretRight, Clock } from 'phosphor-react'
import dayjs from 'dayjs'
import { EventProps } from '../../../types/event'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface CardEventProps {
  event: EventProps
}

export function CardEvent({ event }: CardEventProps) {
  const route = useRouter()
  const { mentorshipId } = route.query

  const eventDay = dayjs(event.startAt)
  const endEvent = dayjs(event.endAt)

  return (
    <Link
      href={`/user/dashboard/${mentorshipId}/log-book/${event.id}`}
      className="flex max-w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border border-solid border-transparent bg-gray-200 px-8 py-5 text-gray-600 hover:border-violet-500"
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

        <h3 className="max-w-[40ch] truncate font-semibold">{event.title}</h3>
      </div>

      <div className="flex items-center gap-16">
        <div className="flex flex-1 items-center gap-2 justify-self-end">
          <Clock size={24} />
          <span className="font-semibold">
            {eventDay.format('HH[h]mm')} às {endEvent.format('HH[h]mm')}
          </span>
        </div>

        <CaretRight size={24} />
      </div>
    </Link>
  )
}
