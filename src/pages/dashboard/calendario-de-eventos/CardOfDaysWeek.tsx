import * as Popover from "@radix-ui/react-popover"
import dayjs from "dayjs";

import { PopoverMeeting } from "./PopoverMeeting"
interface CardOfDaysWeekProps {
  day: dayjs.Dayjs;
}

export default function CardOfDaysWeek({ day }: CardOfDaysWeekProps) {
  const dayInNumberFormart = day.format("DD");
  const dayinStringFormat = day.format("YYYY-MM-DD");

  return (
    <Popover.Root>
      <Popover.Trigger
        className="p-3 bg-zinc-100 rounded-2xl w-full border-2 border-zinc-100 hover:border-violet-400 border-solid transition-all duration-200 relative">
        <span className="absolute top-3 left-3">{dayInNumberFormart}</span>
      </Popover.Trigger>
      <PopoverMeeting currentDay={dayinStringFormat} />
    </Popover.Root>
  )
}