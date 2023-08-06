import dayjs from 'dayjs'
import { EventProps } from '../../types/event'

export function groupDatesByMonth(events: EventProps[]) {
  const groupedDates: { event: EventProps; index: number }[][] = []
  let eventsOfMonth: { event: EventProps; index: number }[] = [
    { event: events[0], index: 1 },
  ]

  events.forEach((event, index) => {
    if (index === 0) return

    const currentDay = dayjs(event.startAt)
    const beforeDay = dayjs(
      eventsOfMonth[eventsOfMonth.length - 1].event.startAt,
    )

    if (currentDay.isSame(beforeDay, 'month')) {
      eventsOfMonth = [...eventsOfMonth, { event, index: index + 1 }]
    } else {
      groupedDates.push(eventsOfMonth)
      eventsOfMonth = [{ event, index: index + 1 }]
    }
  })
  groupedDates.push(eventsOfMonth)
  return groupedDates
}
