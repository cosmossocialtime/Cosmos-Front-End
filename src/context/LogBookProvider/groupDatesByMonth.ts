import dayjs from 'dayjs'
import { EventProps } from '../../types/event'

export function groupDatesByMonth(events: EventProps[]) {
  const groupedDates: EventProps[][] = []
  let eventsOfMonth: EventProps[] = [events[0]]

  events.forEach((event, index) => {
    if (index === 0) return

    const currentDay = dayjs(event.startAt)
    const beforeDay = dayjs(eventsOfMonth[eventsOfMonth.length - 1].startAt)

    if (currentDay.isSame(beforeDay, 'month')) {
      eventsOfMonth = [...eventsOfMonth, event]
    } else {
      groupedDates.push(eventsOfMonth)
      eventsOfMonth = [event]
    }
  })
  groupedDates.push(eventsOfMonth)
  return groupedDates
}
