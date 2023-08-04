import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventProps } from '../../types/event'
import { UserProps } from '../../types/user'
import { useDashboard } from '../../hooks/useDashboard'
import { api } from '../../services/api'
import { MentorshipProps } from '../../types/mentorship'

type popoverName = 'Create Event' | 'Events' | 'Event' | null

type CalendarContextProps = {
  currentMentorship: MentorshipProps
  ownerUser: UserProps
  visiblePopover: popoverName
  users: UserProps[]
  events: EventProps[]
  selectedEvent: EventProps | null
  changeVisiblePopover: (name: popoverName) => void
  changeSelectedEvent: (event: EventProps | null) => void
  getEvents: () => void
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps,
)

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const { dashboard } = useDashboard()
  const currentMentorship = dashboard?.currentMentorship
  const ownerUser = dashboard?.user

  const [users, setUsers] = useState<UserProps[]>([])
  const [events, setEvents] = useState<EventProps[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)
  const [visiblePopover, setVisiblePopover] = useState<popoverName>(null)

  function changeVisiblePopover(name: popoverName) {
    setVisiblePopover(name)
  }
  function changeSelectedEvent(event: EventProps | null) {
    setSelectedEvent(event)
    setVisiblePopover('Event')
  }

  function getEvents() {
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
  }

  useEffect(() => {
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

    getEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMentorship])

  if (!currentMentorship || !ownerUser) {
    return (
      <div className="flex h-full w-full items-center justify-center text-gray-800">
        <h1 className="text-lg">Carregando...</h1>
      </div>
    )
  }

  return (
    <CalendarContext.Provider
      value={{
        ownerUser,
        currentMentorship,
        visiblePopover,
        users,
        events,
        selectedEvent,
        changeVisiblePopover,
        changeSelectedEvent,
        getEvents,
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
