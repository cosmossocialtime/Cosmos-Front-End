import { useState, useCallback, useMemo } from 'react'
import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { popovers, useCalendar } from '../../../context/CalendarProvider'
import getDaysOfMonth from '../../../utils/getDaysOfMonth'
import { DefaultCardDay } from './DefaultCardDay'
import { PopoverEventForm } from './PopoverEventForm'
import { PopoverEvent } from './PopoverEvent'
import { PopoverEvents } from './PopoverEvents'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from '../../Button/ButtonSubmit'
import { EventProps } from '../../../types/event'

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export function Calendar() {
  const {
    events,
    popover: currentPopover,
    selectDay,
    changeSelectedEvent,
    changePopover,
    selectedDay,
  } = useCalendar()

  const [currentDay, setCurrentDay] = useState(dayjs())

  // Funções auxiliares memoizadas
  const daysOfMonth = useMemo(() => getDaysOfMonth(currentDay), [currentDay])
  const daysOfLastMonth = useMemo(
    () => getDaysOfMonth(currentDay.subtract(1, 'month')),
    [currentDay]
  )

  const firstDayWeekOfMonth = Number(daysOfMonth[0].format('d'))
  const daysOfPreviousMonth = useMemo(
    () => daysOfLastMonth.slice(daysOfLastMonth.length - firstDayWeekOfMonth),
    [daysOfLastMonth, firstDayWeekOfMonth]
  )

  const daysOfNextMonth = useMemo(
    () =>
      Array.from({
        length: 35 - daysOfMonth.length - daysOfPreviousMonth.length,
      }),
    [daysOfMonth.length, daysOfPreviousMonth.length]
  )

  // Fechar popover
  const closePopover = useCallback(() => {
    changePopover(null)
    selectDay(null)
    changeSelectedEvent(null)
  }, [selectDay, changePopover])

  // Manipulador de clique na data
  const handleDateClick = useCallback(
    (date: Date, events: EventProps[]) => {
      if (selectedDay !== null && dayjs(selectedDay).isSame(date, 'day')) {
        closePopover()
      } else {
        selectDay(date)
        if (events.length === 0) {
          changePopover(popovers.EventForm)
        } else if (events.length === 1) {
          changeSelectedEvent(events[0])
          changePopover(popovers.Event)
        } else {
          changePopover(popovers.Events)
        }
      }
    },
    [selectedDay, selectDay, changePopover, changeSelectedEvent, closePopover]
  )

  // Renderização do conteúdo do popover
  const renderPopoverContent = useCallback(() => {
    switch (currentPopover) {
      case popovers.Events:
        return <PopoverEvents />
      case popovers.Event:
        return <PopoverEvent />
      case popovers.EventForm:
        return <PopoverEventForm />
      default:
        return null
    }
  }, [currentPopover])

  // Capitalizar string
  const capitalize = useCallback((str: string): string => {
    if (typeof str !== 'string' || str.length === 0) return str
    return str[0].toUpperCase() + str.slice(1)
  }, [])

  return (
    <div>
      {/* Cabeçalho do calendário */}
      <header className="flex items-center justify-between">
        {/* Controles de navegação do mês */}
        <div className="flex items-center gap-2">
          <CaretLeft
            role="button"
            aria-label="Voltar ao mês anterior"
            color="#0890F7"
            size={24}
            className="cursor-pointer"
            onClick={() => setCurrentDay(currentDay.subtract(1, 'month'))}
          />

          <h1 className="w-60 text-center text-3xl font-bold text-blue-900">
            {capitalize(currentDay.format('MMMM YYYY'))}
          </h1>

          <CaretRight
            role="button"
            aria-label="Pular para mês seguinte"
            color="#0890F7"
            size={24}
            className="cursor-pointer"
            onClick={() => setCurrentDay(currentDay.add(1, 'month'))}
          />
        </div>

        {/* Popover para novo evento */}
        <Popover.Root
          open={currentPopover === popovers.EventForm && !selectedDay}
          onOpenChange={(open) => {
            if (open) {
              selectDay(currentDay.toDate())
              changeSelectedEvent(null)
              changePopover(popovers.EventForm)
            } else {
              closePopover()
            }
          }}
        >
          <Popover.Trigger asChild>
            <div className="w-[260px]">
              <Button text="+ Marcar novo encontro" />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="right"
              className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
              onPointerDownOutside={(e) => e.preventDefault()}
            >
              <PopoverEventForm />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </header>

      {/* Corpo do calendário */}
      <div className="mt-4 flex h-[calc(100vh-242px)] w-full flex-1 flex-col gap-2 px-8 py-4 text-gray-500 2xl:gap-4">
        {/* Dias da semana */}
        <div className="grid w-full grid-cols-7 gap-2 text-center 2xl:gap-6">
          {daysOfWeek.map((day) => (
            <h3 key={day} className="text-grey-500 text-base">
              {day}
            </h3>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid flex-1 grid-cols-7 gap-6">
          {/* Dias do mês anterior */}
          {daysOfPreviousMonth.map((day) => (
            <DefaultCardDay
              key={day.toString()}
              day={dayjs(day).format('DD')}
              disabled
            />
          ))}

          {/* Dias do mês atual */}
          {daysOfMonth.map((day) => {
            const dayEvents = events.filter((event) =>
              dayjs(event.startAt).isSame(dayjs(day), 'day')
            )
            const sortedEvents = [...dayEvents].sort((a, b) =>
              dayjs(a.startAt).diff(dayjs(b.startAt))
            )
            const hasEvents = sortedEvents.length > 0
            const formattedDay = dayjs(day).format('DD')

            return (
              <Popover.Root
                key={day.toString()}
                open={
                  selectedDay !== null && dayjs(selectedDay).isSame(day, 'day')
                }
                onOpenChange={(open) => {
                  if (open) {
                    handleDateClick(day.toDate(), sortedEvents)
                  } else {
                    closePopover()
                  }
                }}
              >
                <Popover.Trigger asChild>
                  <div>
                    <DefaultCardDay
                      day={formattedDay}
                      className={
                        hasEvents
                          ? "border-none bg-violet-400 text-left text-white hover:bg-violet-500 group-data-[state='open']:bg-violet-500"
                          : undefined
                      }
                    >
                      {hasEvents && (
                        <>
                          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-clip truncate px-2 font-normal">
                            {dayjs(sortedEvents[0].startAt).format('HH:mm')}{' '}
                            {sortedEvents[0].title}
                          </span>
                          {sortedEvents.length > 1 && (
                            <span className="absolute bottom-2 left-2 font-normal">
                              Mais {sortedEvents.length - 1}
                            </span>
                          )}
                        </>
                      )}
                    </DefaultCardDay>
                  </div>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content
                    side="right"
                    className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    {renderPopoverContent()}
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )
          })}

          {/* Dias do próximo mês */}
          {daysOfNextMonth.map((_, index) => (
            <DefaultCardDay
              key={`next-${index}`}
              day={`${index + 1 < 10 ? '0' : ''}${index + 1}`}
              disabled
            />
          ))}
        </div>
      </div>
    </div>
  )
}
