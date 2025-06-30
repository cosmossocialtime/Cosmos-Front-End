export type EventProps = {
  id: number
  title: string
  description: string
  link: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
  recurrenceType: string | null
  recurrenceGroupId: string | null
  repeatUntil: Date | null
  eventId: string | null
  originalEventId: string | null
  attendees: {
    accepted: boolean
    answeredAt: Date
    byname: string
    eventId: number
    id: number
    invitedAt?: Date
    userId: number
    email: string
  }[]
  logbook: {
    meetingAccomplishments: string
    nextMeetingGoals: string
  } | null
}
