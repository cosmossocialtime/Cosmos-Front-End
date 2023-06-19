import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import PopoverForMarkMeeting from './PopoverForMarkMeeting'
interface CardOfDaysWeekProps {
  day: dayjs.Dayjs
}

export default function CardOfDaysWeek({ day }: CardOfDaysWeekProps) {
  const dayInNumberFormart = day.format('DD')
  // const dayinStringFormat = day.format("YYYY-MM-DD");
  return (
    <Popover.Root>
      <Popover.Trigger className="relative w-full rounded-2xl border-2 border-solid border-zinc-100 bg-zinc-100 p-3 transition-all duration-200 hover:border-violet-400">
        <span className="absolute top-3 left-3">{dayInNumberFormart}</span>
      </Popover.Trigger>
      {/* <PopoverMeetingMarked /> */}
      <PopoverForMarkMeeting />
    </Popover.Root>
  )
}
