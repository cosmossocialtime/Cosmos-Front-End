import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventProps } from '../../types/event'
import { api } from '../../services/api'
import { UserProps } from '../../types/user'
import { useDashboard } from '../../hooks/useDashboard'
import { Loading } from '../../components/Loading'
import { MentorshipProps } from '../../types/mentorship'

type CalendarContextProps = {
  events: EventProps[]
  users: UserProps[]
  currentMentorship: MentorshipProps
  selectedEvent: EventProps | null
  visiblePopover: 'Create Event' | 'Events' | 'Event' | null
  changeVisiblePopover: (
    name: 'Create Event' | 'Events' | 'Event' | null,
  ) => void
  getEvents: () => void
  changeSelectedEvent: (event: EventProps | null) => void
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps,
)

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship

  const [users, setUsers] = useState<UserProps[]>([])
  const [events, setEvents] = useState<EventProps[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)
  const [visiblePopover, setVisiblePopover] = useState<
    'Create Event' | 'Events' | 'Event' | null
  >(null)

  function getVolunteers() {
    if (!currentMentorship) {
      return
    }
    api
      .get(`/mentorship/${currentMentorship.programId}/volunteers`)
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    getVolunteers()
    getEvents()
  }, [currentMentorship])

  function getEvents() {
    if (!currentMentorship) {
      return
    }
    api
      .get(`/mentorship/${currentMentorship.programId}/calendar`)
      .then((response) => {
        if (response.status === 200) {
          setEvents(response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  function changeSelectedEvent(event: EventProps | null) {
    setSelectedEvent(event)
    changeVisiblePopover('Event')
  }
  function changeVisiblePopover(
    popoverName: 'Create Event' | 'Events' | 'Event' | null,
  ) {
    setVisiblePopover(popoverName)
  }

  if (!currentMentorship) {
    return <Loading />
  }

  return (
    <CalendarContext.Provider
      value={{
        users,
        currentMentorship,
        events,
        getEvents,
        selectedEvent,
        changeSelectedEvent,
        visiblePopover,
        changeVisiblePopover,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

const useCalendar = () => {
  const context = useContext(CalendarContext)

  return context
}

export { CalendarProvider, CalendarContext, useCalendar }
