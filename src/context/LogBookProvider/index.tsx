import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventProps } from '../../types/event'
import { api } from '../../services/api'
import { Loading } from '../../components/Loading'
import { useDashboard } from '../../hooks/useDashboard'
import dayjs from 'dayjs'
import { groupDatesByMonth } from './groupDatesByMonth'

type LogBookContextProps = {
  selectedEvent: EventProps | null
  changeSelectedEvent: (event: EventProps | null) => void
  eventsOfEachMonth: {
    event: EventProps
    index: number
  }[][]
}

const LogBookContext = createContext<LogBookContextProps>(
  {} as LogBookContextProps,
)

const LogBookProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [events, setEvents] = useState<EventProps[]>()
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)

  function changeSelectedEvent(event: EventProps | null) {
    setSelectedEvent(event)
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
    return <Loading />
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
