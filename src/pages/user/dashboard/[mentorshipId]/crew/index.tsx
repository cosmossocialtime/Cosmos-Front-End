import Head from 'next/head'
import SideBar from '../sideBar'
import Slider from '../../../../../components/dashboard/crew/Slider'

const TripulacaoPage = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 overflow-x-hidden">
        <Head>
          <title>Tripulação</title>
        </Head>
        <main className="h-screen bg-gray-100">
          <header className="border border-b-gray-50 p-4 drop-shadow-sm">
            <div className="pl-20">
              <h1 className="text-[40px] font-semibold text-indigo-500">
                Tripulação
              </h1>
              <span className="text-[18px] text-indigo-200">
                A equipe que estará com você nesta aventura
              </span>
            </div>
          </header>

          <div className="pt-32 pl-20">
            <Slider />
          </div>
        </main>
      </div>
    </div>
  )
}

export default TripulacaoPage
