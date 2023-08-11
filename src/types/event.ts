export type EventProps = {
  id: number
  title: string
  description: string
  link: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
  attendees: {
    accepted: boolean
    answeredAt: Date
    byname: string
    eventId: number
    id: number
    invitedAt: Date
    userId: number
  }[]
  logbook: {
    meetingAccomplishments: string
    nextMeetingGoals: string
  }
}
