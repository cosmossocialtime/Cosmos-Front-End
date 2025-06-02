import SideBar from '../sideBar'
import { Goals } from '../../../../../../../components/dashboard/navigation-map/Goals'
import { NavigationMapProvider } from '../../../../../../../context/NavigationMapProvider'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'

export default function NavigationMap() {
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] w-full overflow-hidden">
        <SideBar />
        <div className="flex h-screen w-screen flex-col bg-bgArtBoard bg-cover bg-center bg-no-repeat">
          <header className="h-[145px] bg-blue-900 bg-opacity-50 px-20 py-4 text-slate-100">
            <h1 className="mb-2 mt-6 text-3xl font-semibold">
              Mapa da Navegação
            </h1>
            <span className="text-lg">
              Aqui você encontra o plano de objetivos e atividades a serem
              alcançados no decorrer desta missão
            </span>
          </header>
          <NavigationMapProvider>
            <Goals />
          </NavigationMapProvider>
        </div>
      </div>
    </div>
  )
}
