import { CalendarProvider } from '../../../../../../../context/CalendarProvider'
import { Calendar } from '../../../../../../../components/dashboard/events-calendar/Calendar'
import SideBar from '../sideBar'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'

export default function EventsCalendar() {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-200 text-gray-800 ">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)]">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          <div className="flex flex-1 flex-col rounded-lg bg-white shadow-md">
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <CalendarProvider>
                <Calendar />
              </CalendarProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
