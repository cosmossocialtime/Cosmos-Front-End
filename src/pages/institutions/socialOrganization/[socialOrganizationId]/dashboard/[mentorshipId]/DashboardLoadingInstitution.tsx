import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import { LoadingLight } from '../../../../../../components/LoadingLight'
import SideBar from './sideBar'

export default function DashboardLoadingInstitution() {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="max-w-screen flex h-screen overflow-hidden">
        <SideBar />
        <LoadingLight />
      </div>
    </div>
  )
}
