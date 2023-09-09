import * as Popover from '@radix-ui/react-popover'
import { DefaultCardDay } from './DefaultCardDay'
import dayjs from 'dayjs'
import { PopoverEventForm } from './PopoverEventForm'

interface EventCreatorCardProps {
  day: dayjs.Dayjs
}

export function EventCreatorCard({ day }: EventCreatorCardProps) {
  const formattedDay = dayjs(day).format('DD')

  return (
    <Popover.Root>
      <Popover.Trigger>
        <DefaultCardDay day={formattedDay} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={'right'}
          className="relative z-[2] m-4 w-[28rem] rounded-2xl bg-violet-500 px-6 pb-10 pt-14 text-white 2xl:w-[32rem]"
        >
          <PopoverEventForm day={day.toDate()} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
