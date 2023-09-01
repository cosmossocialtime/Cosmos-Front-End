import { popovers, useCalendar } from '../../../context/CalendarProvider'
import dayjs from 'dayjs'

export function PopoverEvents() {
  const { changeSelectedEvent, changePopover, events, selectedDay } =
    useCalendar()

  if (!selectedDay) {
    return <h1>Dia não encontrado.</h1>
  }

  const eventsOfTheDay = events.filter((event) =>
    dayjs(event.startAt).isSame(dayjs(selectedDay), 'day'),
  )
  const ordenedEvents = eventsOfTheDay.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt)),
  )

  return (
    <>
      <span className="absolute right-4 top-4 text-xl">
        {dayjs(selectedDay).format('ddd, DD MMM')}
      </span>
      <h3 className="text-xl">Eventos</h3>
      <div className="my-4 flex max-h-[24rem] w-full flex-col gap-3 overflow-y-auto">
        {ordenedEvents.map((event) => {
          const hourStart = dayjs(event.startAt).format('HH:mm')
          const hourEnd = dayjs(event.endAt).format('HH:mm')

          return (
            <button
              onClick={() => changeSelectedEvent(event)}
              key={event.id}
              className="cursor-pointer rounded-lg border border-solid border-white/40 p-3  hover:border-white"
            >
              <span>
                {hourStart} - {hourEnd}
              </span>
              <p className="mt-2 break-words">{event.title}</p>
            </button>
          )
        })}
      </div>

      <button
        className=" rounded-lg border border-solid bg-white px-10 py-2 font-semibold text-violet-500 transition-colors hover:border-white hover:bg-violet-600 hover:text-white"
        onClick={() => changePopover(popovers.EventForm)}
      >
        Marcar novo evento
      </button>
    </>
  )
}
