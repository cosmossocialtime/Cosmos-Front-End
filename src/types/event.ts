export type EventProps = {
  id: number
  title: string
  description: string
  link: string
  eventAt: Date
  createdAt: Date
  updatedAt: Date
  attendees: {
    id: number
    accepted: boolean
    invitedAt: Date
    answeredAt: Date
  }[]
}
