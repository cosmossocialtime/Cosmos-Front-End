import React, {
  ElementType,
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
import { PopoverEvent } from '../../components/dashboard/events-calendar/PopoverEvent'
import { PopoverEventForm } from '../../components/dashboard/events-calendar/PopoverEventForm'
import { PopoverEvents } from '../../components/dashboard/events-calendar/PopoverEvents'
import { useRouter } from 'next/router'

type CalendarContextProps = {
  selectedDay: Date | null
  currentMentorship: MentorshipProps
  ownerUser: UserProps
  popover: ElementType
  users: UserProps[]
  events: EventProps[]
  selectedEvent: EventProps | null
  selectDay: (day: Date | null) => void
  changePopover: (popover: ElementType) => void
  changeSelectedEvent: (event: EventProps | null) => void
  getEvents: () => void
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps,
)

export const popovers = {
  Event: PopoverEvent,
  EventForm: PopoverEventForm,
  Events: PopoverEvents,
}

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
  const [popover, setPopover] = useState<ElementType>(PopoverEvent)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

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

  function selectDay(day: Date | null) {
    setSelectedDay(day)
  }

  function changePopover(popover: ElementType) {
    setPopover(popover)
  }
  function changeSelectedEvent(event: EventProps | null) {
    setSelectedEvent(event)
    setPopover(popovers.Event)
  }

  if (!currentMentorship || !ownerUser) {
    return <LoadingLight />
  }

  return (
    <CalendarContext.Provider
      value={{
        selectedDay,
        ownerUser,
        currentMentorship,
        popover,
        users,
        events,
        selectedEvent,
        changePopover,
        changeSelectedEvent,
        getEvents,
        selectDay,
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
