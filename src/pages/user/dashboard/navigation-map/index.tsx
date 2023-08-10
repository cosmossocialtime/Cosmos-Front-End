import SideBar from '../sideBar'
import { Goals } from '../../../../components/dashboard/navigation-map/Goals'
import { NavigationMapProvider } from '../../../../context/NavigationMapProvider'

export default function NavigationMap() {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex h-screen w-screen flex-col bg-bgArtBoard bg-cover bg-center bg-no-repeat">
        <header className="bg-blue-900 bg-opacity-50 px-20 py-4 text-slate-100">
          <h1 className="mb-2 text-4xl font-semibold">Mapa da Navegação</h1>
          <span>
            O plano de objetivos e atividades a serem alcançados no decorrer
            desta missão
          </span>
        </header>
        <NavigationMapProvider>
          <Goals />
        </NavigationMapProvider>
      </div>
    </div>
  )
}
