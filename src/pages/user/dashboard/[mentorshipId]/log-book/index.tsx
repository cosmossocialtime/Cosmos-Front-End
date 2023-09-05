import { ListOfEventsDay } from '../../../../../components/dashboard/log-book/ListOfEventsDay'
import SideBar from '../sideBar'

export default function LogBook() {
  return (
    <div className="max-w-screen flex h-screen overflow-hidden">
      <SideBar />

      <ListOfEventsDay />
    </div>
  )
}
