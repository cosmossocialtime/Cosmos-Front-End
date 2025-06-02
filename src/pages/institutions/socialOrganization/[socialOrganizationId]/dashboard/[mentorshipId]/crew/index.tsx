import Head from 'next/head'
import SideBar from '../sideBar'
import Slider from '../../../../../../../components/dashboard/crew/Slider'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'

const TripulacaoPage = () => {
  return (
    <div className="min-h-screen bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)]">
        <SideBar />
        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          <Head>
            <title>Tripulação</title>
          </Head>
          <div className="flex h-screen flex-col bg-gray-100">
            <header className="border border-b-gray-50 p-4">
              <div className="mt-8 pl-8">
                <h1 className="text-3xl font-semibold text-gray-600">
                  Tripulação
                </h1>
                <span className="text-base text-gray-400">
                  A equipe que estará com você nesta aventura
                </span>
              </div>
            </header>
            <Slider />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripulacaoPage
