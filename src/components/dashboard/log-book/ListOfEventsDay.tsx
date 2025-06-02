import dayjs from 'dayjs'
import { CardEvent } from './CardEvent'
import { EventProps } from '../../../types/event'
import { groupDatesByMonth } from './groupDatesByMonth'
import { useCallback } from 'react'

interface ListOfEventsDayProps {
  events: EventProps[]
  source: string
}

export function ListOfEventsDay({ events, source }: ListOfEventsDayProps) {
  const capitalize = useCallback((str: string): string => {
    if (typeof str !== 'string' || str.length === 0) return str
    return str[0].toUpperCase() + str.slice(1)
  }, [])

  if (!events || events.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-gray-500">
        <p>Nenhum evento encontrado.</p>
      </div>
    )
  }

  const ordenedEvents = [...events].sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt))
  )
  const eventsOfEachMonth = groupDatesByMonth(ordenedEvents)

  return (
    <>
      {source === 'volunteer' ? (
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
                      <CardEvent key={event.id} event={event} source={source} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-1 flex-col">
          <header className="flex min-h-[7rem] items-center px-20">
            <h1 className="text-[2.5rem] font-semibold text-gray-600">
              Diário de bordo
            </h1>
          </header>
          <div className="mx-20 mb-24 flex-1 overflow-y-auto pr-16">
            {eventsOfEachMonth.map((eventsOfMonth) => {
              const day = dayjs(eventsOfMonth[0].startAt)
              return (
                <div className="mt-8" key={day.toString()}>
                  <h2 className="font-base mb-4 text-gray-500">
                    {capitalize(day.format('MMMM YYYY'))}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {eventsOfMonth.map((event) => (
                      <CardEvent key={event.id} event={event} source={source} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
