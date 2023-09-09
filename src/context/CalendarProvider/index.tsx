import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { EventProps } from '../../types/event'
import { UserProps } from '../../types/user'
import { useDashboard } from '../../hooks/useDashboard'
import { api } from '../../services/api'
import { MentorshipProps } from '../../types/mentorship'
import { LoadingLight } from '../../components/LoadingLight'
import { useRouter } from 'next/router'

type popoversName = 'eventForm' | 'events' | 'event'

type CalendarContextProps = {
  currentMentorship: MentorshipProps
  ownerUser: UserProps
  popoverName: popoversName
  users: UserProps[]
  events: EventProps[]
  selectedEvent: EventProps | null
  changePopover: (popover: popoversName) => void
  changeSelectedEvent: (event: EventProps | null) => void
  getEvents: () => void
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps,
)

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter()
  const { mentorshipId } = route.query

  const { dashboard } = useDashboard()

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship) => String(mentorship.mentorshipId) === mentorshipId,
  )
  const ownerUser = dashboard?.user

  const [users, setUsers] = useState<UserProps[]>([])
  const [events, setEvents] = useState<EventProps[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)
  const [popoverName, setPopoverName] = useState<popoversName>('events')

  const getEvents = useCallback(() => {
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
  }, [currentMentorship, getEvents])

  function changePopover(popoverName: popoversName) {
    if (popoverName === 'events') {
      setSelectedEvent(null)
    }

    setPopoverName(popoverName)
  }
  function changeSelectedEvent(event: EventProps | null) {
    setSelectedEvent(event)

    if (event) {
      setPopoverName('event')
    } else {
      setPopoverName('events')
    }
  }

  if (!currentMentorship || !ownerUser) {
    return <LoadingLight />
  }

  return (
    <CalendarContext.Provider
      value={{
        ownerUser,
        currentMentorship,
        popoverName,
        users,
        events,
        selectedEvent,
        changePopover,
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
