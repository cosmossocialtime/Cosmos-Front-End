import { RRule } from 'rrule'
import dayjs from 'dayjs'

export function getRRuleByDate(
  eventAt: Date,
  recurrence: string,
  until: Date
): string {
  const weekdays = [
    RRule.SU,
    RRule.MO,
    RRule.TU,
    RRule.WE,
    RRule.TH,
    RRule.FR,
    RRule.SA,
  ]

  const weekday = weekdays[dayjs(eventAt).day()]

  const rrule = new RRule({
    freq: RRule.WEEKLY,
    interval: recurrence === 'biweekly' ? 2 : 1,
    byweekday: [weekday],
    until: new Date(dayjs(until).format('YYYY-MM-DDT23:59:59Z')),
  })

  return rrule.toString().replace('RRULE:', '')
}
