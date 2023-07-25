import Head from 'next/head'
import SideBar from '../sideBar'
import Slider from '../../../../components/dashboard/crew/Slider'

const TripulacaoPage = () => {
  return (
    <>
      <Head>
        <title>Tripulação</title>
      </Head>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 overflow-x-hidden">
          <main className="h-full bg-gray-100">
            <header className=" border border-b-gray-50 bg-gray-100 py-5 drop-shadow">
              <div className="pl-20">
                <h1 className="text-[40px] font-semibold text-indigo-500">
                  Tripulação
                </h1>
                <span className="text-[18px] text-indigo-200">
                  A equipe que estará com você nesta aventura
                </span>
              </div>
            </header>

            <Slider />
          </main>
        </div>
      </div>
    </>
  )
}

export default TripulacaoPage
