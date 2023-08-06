import dayjs from 'dayjs'
import { CardEvent } from './CardEvent'
import { useLogBook } from '../../../context/LogBookProvider'

export function ListOfEventsDay() {
  const { eventsOfEachMonth } = useLogBook()

  return (
    <div className="flex h-full flex-1 flex-col">
      <header className="flex min-h-[7rem] items-center px-20 shadow-lg">
        <h1 className="text-[2.5rem] font-semibold leading-[120%] text-gray-600">
          Diário de bordo
        </h1>
      </header>
      <div className="mx-20 mb-24 mt-8 flex-1 overflow-y-auto pr-16">
        {eventsOfEachMonth.map((eventsOfMonth) => {
          const day = dayjs(eventsOfMonth[0].event.startAt)
          return (
            <div className="mt-8" key={day.toString()}>
              <h2 className="mb-4 font-bold text-gray-500">
                {day.format('MMMM YYYY')}
              </h2>
              <div className="flex flex-col gap-4">
                {eventsOfMonth.map((eventEntry) => (
                  <CardEvent key={eventEntry.index} eventEntry={eventEntry} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
