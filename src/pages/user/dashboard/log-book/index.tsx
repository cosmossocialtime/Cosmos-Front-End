import SideBar from '../sideBar'
import { LogBookProvider } from '../../../../context/LogBookProvider'
import { LogBookPageSwitcher } from '../../../../components/dashboard/log-book/LogBookPageSwitcher'

export default function LogBook() {
  return (
    <div className="flex h-screen w-screen">
      <SideBar />

      <LogBookProvider>
        <LogBookPageSwitcher />
      </LogBookProvider>
    </div>
  )
}
