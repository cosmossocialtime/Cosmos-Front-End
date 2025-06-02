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
import { MentorshipProps } from '../../types/mentorship'
import { LoadingLight } from '../../components/LoadingLight'
import { useRouter } from 'next/router'
import { invokeLambda } from '../../lib/aws/invokeLambda'

type CalendarContextProps = {
  selectedDay: Date | null
  currentMentorship: MentorshipProps
  ownerUser: UserProps
  popover: PopoverType
  users: UserProps[]
  events: EventProps[]
  selectedEvent: EventProps | null
  selectDay: (day: Date | null) => void
  changePopover: (popover: PopoverType) => void
  changeSelectedEvent: (event: EventProps | null) => void
  getEvents: () => void
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
)

type PopoverType = 'Event' | 'EventForm' | 'Events' | null

export const popovers = {
  Event: 'Event',
  EventForm: 'EventForm',
  Events: 'Events',
} as const

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter()
  const { mentorshipId, socialOrganizationId } = route.query

  const { dashboard } = useDashboard(
    socialOrganizationId ? Number(socialOrganizationId) : null
  )

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) =>
      String(mentorship.mentorshipId) === mentorshipId
  )
  const ownerUser = dashboard?.user

  const [users, setUsers] = useState<UserProps[]>([])
  const [events, setEvents] = useState<EventProps[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)
  const [popover, setPopover] = useState<PopoverType>('Event')
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const getEvents = useCallback(() => {
    const payload = { mentorshipId: Number(mentorshipId || '0') }
    invokeLambda<typeof payload, { statusCode: number; body: string }>(
      'mentorship-calendar-select-lambda',
      payload
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setEvents(JSON.parse(response.body))
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
    const payload = { mentorshipId: Number(mentorshipId || '0') }
    invokeLambda<typeof payload, { statusCode: number; body: string }>(
      'mentorship-participants-select-lambda',
      payload
    )
      .then((response) => {
        if (response.statusCode === 200) {
          setUsers(JSON.parse(response.body))
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

  function changePopover(type: PopoverType) {
    setPopover(type)
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
