import { LoadingLight } from '../LoadingLight'
import { SideBar } from './SideBar'

export function DashboardLoading() {
  return (
    <div className="max-w-screen flex h-screen overflow-hidden">
      <SideBar />
      <LoadingLight />
    </div>
  )
}
