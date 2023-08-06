import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventProps } from '../../types/event'
import { api } from '../../services/api'
import { useDashboard } from '../../hooks/useDashboard'
import dayjs from 'dayjs'
import { groupDatesByMonth } from './groupDatesByMonth'
import { EventEntryProps } from '../../types/EventEntry'
import { LoadingLight } from '../../components/LoadingLight'

type LogBookContextProps = {
  selectedEvent: EventEntryProps | null
  changeSelectedEvent: (event: EventEntryProps | null) => void
  eventsOfEachMonth: EventEntryProps[][]
}

const LogBookContext = createContext<LogBookContextProps>(
  {} as LogBookContextProps,
)

const LogBookProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [events, setEvents] = useState<EventProps[]>()
  const [selectedEvent, setSelectedEvent] = useState<EventEntryProps | null>(
    null,
  )

  function changeSelectedEvent(eventEntry: EventEntryProps | null) {
    setSelectedEvent(eventEntry)
  }

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
  }, [currentMentorship])

  if (!events) {
    return <LoadingLight />
  }

  const ordenedEvents = events.sort((a, b) =>
    dayjs(a.startAt).diff(dayjs(b.startAt)),
  )

  const eventsOfEachMonth = groupDatesByMonth(ordenedEvents)

  return (
    <LogBookContext.Provider
      value={{ selectedEvent, changeSelectedEvent, eventsOfEachMonth }}
    >
      {children}
    </LogBookContext.Provider>
  )
}

const useLogBook = () => {
  const context = useContext(LogBookContext)

  return context
}

export { LogBookProvider, LogBookContext, useLogBook }
