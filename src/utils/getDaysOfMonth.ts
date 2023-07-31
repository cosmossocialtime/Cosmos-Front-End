import dayjs from 'dayjs'

export default function getDaysOfMonth(dayOfMonth: dayjs.Dayjs) {
  const days = []

  const firstDayOfMonth = dayOfMonth.startOf('M')
  const lastDayOfMonth = dayOfMonth.endOf('M')

  let compareDate = firstDayOfMonth

  while (compareDate.isBefore(lastDayOfMonth)) {
    days.push(compareDate)
    compareDate = compareDate.add(1, 'day')
  }

  return days
}
