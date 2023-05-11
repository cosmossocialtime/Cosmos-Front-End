import * as Popover from "@radix-ui/react-popover"
import dayjs from "dayjs";
// import PopoverForMarkMeeting from "./PopoverForMarkMeeting"
interface CardOfDaysWeekProps {
  day: dayjs.Dayjs;
}

export default function CardOfDaysWeek({ day }: CardOfDaysWeekProps) {
  const dayInNumberFormart = day.format("DD");
  // const dayinStringFormat = day.format("YYYY-MM-DD");
  return (
    <div></div>
  )
}