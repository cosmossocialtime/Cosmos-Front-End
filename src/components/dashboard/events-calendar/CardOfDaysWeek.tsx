import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import PopoverForMarkMeeting from './PopoverCreateEvent'
import { UserProps } from '../../../types/user'
import { EventProps } from '../../../types/event'
import { PopoverMeetingMarked } from './PopoverEvent'
interface CardOfDaysWeekProps {
  day: Date
  users: UserProps[]
  mentorshipId: number
  events: EventProps[]
  getEvents: () => void
}

export default function CardOfDaysWeek({
  day,
  users,
  mentorshipId,
  events,
}: CardOfDaysWeekProps) {
  const dayInNumberFormart = dayjs(day).format('DD')
  const eventDay = events.find((event) =>
    dayjs(event.eventAt).isSame(dayjs(day)),
  )

  if (eventDay) {
    const attendeesId = eventDay.attendees.map((attendee) => attendee.id)
    const usersNames = users
      .filter((user) => attendeesId.includes(user.id))
      .map((user) => user.byname)

    return (
      <Popover.Root>
        <Popover.Trigger className="relative w-full rounded-2xl border-2 border-solid border-transparent bg-violet-400 p-2 text-sm font-bold text-gray-100 transition-all duration-200 hover:bg-violet-500">
          <span className="absolute left-2 top-2">{dayInNumberFormart}</span>
          <div className="absolute bottom-2 left-2 flex flex-col">
            <span>Encontro</span>
            <span>19H - 21H</span>
          </div>
        </Popover.Trigger>
        <PopoverMeetingMarked
          title={eventDay.title}
          eventAt={eventDay.eventAt}
          usersName={usersNames}
          description={eventDay.description}
          link={eventDay.link}
        />
      </Popover.Root>
    )
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="relative flex w-full flex-col rounded-2xl border-2 border-solid border-transparent bg-zinc-100 p-2 text-sm font-bold transition-all duration-200 hover:border-violet-400">
        <span className="absolute left-2 top-2">{dayInNumberFormart}</span>
      </Popover.Trigger>
      <PopoverForMarkMeeting
        users={users}
        mentorshipId={mentorshipId}
        currentDay={day}
        startTime="19:00"
        endTime="21:00"
      />
    </Popover.Root>
  )
}
