import Head from "next/head";
import {Slider} from "./Slider"
const TripulacaoPage = () => {
    return(
        <div>
      <Head>
        <title>Tripulação</title>
      </Head>
      <main className="bg-gray-100 h-screen w-full">
        <header className="border border-b-gray-50 drop-shadow-sm p-4">
          <div className="pl-20">
            <h1 className="text-[40px] text-indigo-500 font-semibold">
              Tripulação
            </h1>
            <span className="text-indigo-200 text-[18px]">
              A equipe que estará com você nesta aventura
            </span>
          </div>
        </header>

        <div className="pt-32 pl-20">
          <Slider />
        </div>
      </main>
    </div>
    );
};

export default TripulacaoPage