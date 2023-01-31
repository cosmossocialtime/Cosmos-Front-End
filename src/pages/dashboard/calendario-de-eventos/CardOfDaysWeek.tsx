import * as Popover from "@radix-ui/react-popover"

import { PopoverMeeting } from "./PopoverMeeting"
interface CardOfDaysWeekProps {
  day: string
}

export default function CardOfDaysWeek({ day }: CardOfDaysWeekProps) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className="p-3 bg-zinc-100 rounded-2xl w-full border-2 border-zinc-100 hover:border-violet-400 border-solid transition-all duration-200 relative">
        <span className="absolute top-3 left-3">{day}</span>
      </Popover.Trigger>
      <PopoverMeeting />
    </Popover.Root>
  )
}