import * as Popover from '@radix-ui/react-popover'
import { DefaultCardDay } from './DefaultCardDay'
import dayjs from 'dayjs'
import { PopoverEventForm } from './PopoverEventForm'
import { useCalendar } from '../../../context/CalendarProvider'

interface EventCreatorCardProps {
  day: dayjs.Dayjs
}

export function EventCreatorCard({ day }: EventCreatorCardProps) {
  const { selectDay, selectedDay } = useCalendar()
  const formattedDay = dayjs(day).format('DD')

  return (
    <Popover.Root
      open={day.isSame(selectedDay, 'day')}
      onOpenChange={(open) =>
        open ? selectDay(day.toDate()) : selectDay(null)
      }
    >
      <Popover.Trigger>
        <DefaultCardDay day={formattedDay} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={'right'}
          className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
        >
          <PopoverEventForm />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
