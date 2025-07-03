import { CalendarProvider } from '../../../../../context/CalendarProvider'
import { Calendar } from '../../../../../components/dashboard/events-calendar/Calendar'
import SideBar from '../sideBar'

export default function EventsCalendar() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex max-h-screen flex-1 flex-col px-20 py-4 2xl:py-16">
        <CalendarProvider>
          <Calendar />
        </CalendarProvider>
      </main>
    </div>
  )
}
