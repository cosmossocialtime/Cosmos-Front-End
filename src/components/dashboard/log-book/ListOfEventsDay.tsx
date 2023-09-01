import dayjs from 'dayjs'
import { CardEvent } from './CardEvent'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import { useDashboard } from '../../../hooks/useDashboard'
import { EventProps } from '../../../types/event'
import { groupDatesByMonth } from './groupDatesByMonth'
import { LoadingLight } from '../../LoadingLight'

export function ListOfEventsDay() {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorships[0]

  const [events, setEvents] = useState<EventProps[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentMentorship) {
      return
    }

    api
      .get(`/mentorship/${currentMentorship?.programId}/calendar`)
      .then((response) => {
        if (response.status === 200) {
          setEvents(response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentMentorship])

  if (isLoading) {
    return <LoadingLight />
  }

  if (!events) {
    return <h1>Page error</h1>
  }

  const ordenedEvents = events.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt)),
  )
  const eventsOfEachMonth = groupDatesByMonth(ordenedEvents)

  return (
    <div className="flex h-full flex-1 flex-col">
      <header className="flex min-h-[7rem] items-center px-20 shadow-lg">
        <h1 className="text-[2.5rem] font-semibold leading-[120%] text-gray-600">
          Diário de bordo
        </h1>
      </header>
      <div className="mx-20 mb-24 mt-8 flex-1 overflow-y-auto pr-16">
        {eventsOfEachMonth.map((eventsOfMonth) => {
          const day = dayjs(eventsOfMonth[0].startAt)
          return (
            <div className="mt-8" key={day.toString()}>
              <h2 className="mb-4 font-bold text-gray-500">
                {day.format('MMMM YYYY')}
              </h2>
              <div className="flex flex-col gap-4">
                {eventsOfMonth.map((event) => (
                  <CardEvent key={event.id} event={event} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
