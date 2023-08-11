import SideBar from '../sideBar'
import { LogBookProvider } from '../../../../context/LogBookProvider'
import { LogBookPageSwitcher } from '../../../../components/dashboard/log-book/LogBookPageSwitcher'

export default function LogBook() {
  return (
    <div className="max-w-screen flex h-screen overflow-hidden">
      <SideBar />

      <LogBookProvider>
        <LogBookPageSwitcher />
      </LogBookProvider>
    </div>
  )
}
