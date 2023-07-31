import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'

import { CaretLeft, CaretRight } from 'phosphor-react'

import { useState } from 'react'
import getDaysOfMonth from '../../../../utils/getDaysOfMonth'
import SideBar from '../sideBar'
import { DefaultCardDay } from '../../../../components/dashboard/events-calendar/DefaultCardDay'
import { useCalendar } from '../../../../context/CalendarProvider'
import PopoverCreateEvent from '../../../../components/dashboard/events-calendar/PopoverCreateEvent'
import { PopoverEvents } from '../../../../components/dashboard/events-calendar/PopoverEvents'
import { PopoverEvent } from '../../../../components/dashboard/events-calendar/PopoverEvent'

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export default function CalendarioEventosPage() {
  const {
    events,
    visiblePopover,
    changeVisiblePopover,
    selectedEvent,
    changeSelectedEvent,
  } = useCalendar()

  const [currentDay, setCurrentDay] = useState(dayjs())
  const daysOfMonth = getDaysOfMonth(currentDay)
  const daysOfLastMonth = getDaysOfMonth(currentDay.subtract(1, 'month'))

  const firstDayWeekOfMonth = Number(daysOfMonth[0].format('d'))
  const daysOfPreviousMonth = daysOfLastMonth.slice(
    daysOfLastMonth.length - firstDayWeekOfMonth,
  )

  const daysOfNextMonth = Array.from({
    length: 42 - daysOfMonth.length - daysOfPreviousMonth.length,
  })

  function getNextMonth() {
    setCurrentDay(currentDay.add(1, 'month'))
  }

  function getPreviuosMonth() {
    setCurrentDay(currentDay.subtract(1, 'month'))
  }

  return (
    <div className="flex">
      <SideBar />
      <main className="flex max-h-screen flex-1 flex-col px-20 py-4 2xl:py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CaretLeft
              role={'button'}
              aria-label="Voltar ao mês anterior"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={getPreviuosMonth}
            />

            <h1
              aria-label="Mês atual"
              className="w-60 text-center text-3xl font-bold text-blue-900"
            >
              {currentDay.format('MMMM YYYY')}
            </h1>

            <CaretRight
              role={'button'}
              aria-label="Pular para mês seguinte"
              color="#9D37F2"
              size={24}
              className="cursor-pointer"
              onClick={getNextMonth}
            />
          </div>
        </header>

        <div className="mt-4 flex w-full flex-1 flex-col gap-2 text-gray-500 2xl:gap-4">
          <div className="grid w-full grid-cols-7 gap-2 text-center 2xl:gap-6">
            {daysOfWeek.map((day) => {
              return (
                <h3 key={day} className="text-xl font-medium">
                  {day}
                </h3>
              )
            })}
          </div>

          <div className="grid flex-1 grid-cols-7 gap-2 2xl:gap-6">
            {daysOfPreviousMonth.map((day, index) => (
              <DefaultCardDay
                key={day.toString()}
                day={dayjs(day).format('DD')}
                disabled
              />
            ))}

            {
              daysOfMonth.map((day) => {
                const eventsOfTheDay = events.filter((event) =>
                  dayjs(event.eventAt).isSame(dayjs(day)),
                )
                const noEvents = eventsOfTheDay.length === 0
                const formattedDay = dayjs(day).format('DD')

                return (
                  <Popover.Root
                    key={day.toString()}
                    onOpenChange={(open) =>
                      open === false && changeSelectedEvent(null)
                    }
                  >
                    <Popover.Trigger>
                      {noEvents ? (
                        <DefaultCardDay
                          day={formattedDay}
                          onClick={() => changeVisiblePopover('Create Event')}
                        />
                      ) : (
                        <DefaultCardDay
                          day={formattedDay}
                          className="border-none bg-violet-400 text-white hover:bg-violet-500"
                          onClick={() => changeVisiblePopover('Events')}
                        />
                      )}
                    </Popover.Trigger>
                    {visiblePopover === 'Create Event' ? (
                      <PopoverCreateEvent
                        currentDay={day.toDate()}
                        event={selectedEvent}
                      />
                    ) : visiblePopover === 'Events' ? (
                      <PopoverEvents eventsOfTheDay={eventsOfTheDay} />
                    ) : visiblePopover === 'Event' ? (
                      dayjs(selectedEvent?.eventAt).isSame(day) && (
                        <PopoverEvent selectedEvent={selectedEvent!} />
                      )
                    ) : null}
                  </Popover.Root>
                )
              })

              // return eventsOfTheDay.length > 0 ? (
              //   <ViewEventsCardDay
              //     key={day.toString()}
              //     day={day.toDate()}
              //     users={users}
              //     eventsOfTheDay={eventsOfTheDay}
              //     mentorshipId={currentMentorship?.programId}
              //   />
              // ) : (
              //   <NewEventCardDay
              //     key={day.toString()}
              //     day={day.toDate()}
              //     users={users}
              //     mentorshipId={currentMentorship?.programId}
              //   />
              // )
            }
            {daysOfNextMonth.map((_, index) => (
              <DefaultCardDay
                key={index}
                day={`${index + 1 < 10 ? '0' : ''}${index + 1}`}
                disabled
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
