import { ArrowRight } from 'phosphor-react'

const DiarioBordoPage = () => {
  return (
    <div className="grid h-screen grid-rows-[15%_1fr]">
      <header className="shadow-[0px 0px 24px rgba(43, 18, 74, 0.08)] row-start-1 row-end-2 flex items-center justify-between bg-[#FDFDFF] px-20">
        <section className="flex flex-col">
          <p className="text-lg text-[#727CA3]">23/02/2023</p>
          <h1 className="text-4xl font-semibold text-[#363F63]">
            Encontro da Tripulação
          </h1>
        </section>
        <button className="arrowButton">
          <ArrowRight size={24} className="text-cian-500" />
        </button>
      </header>

      <main className="row-start-2 row-end-3 flex w-5/6 flex-col pl-20 pt-8">
        <section className="flex grow flex-col gap-[8%]">
          <h3 className="text-lg text-[#363F63]">
            Quais são algumas das informações que vocês já podem tomar como
            verdadeiras sobre o(a) [Nome da Instituição]?
          </h3>
          <input
            type="message"
            className="h-4/6 rounded border-2 border-solid border-[#A2ABCC] text-base"
          />
        </section>
        <section className="flex grow flex-col gap-[8%]">
          <h3 className="text-lg text-[#363F63]">
            Quais informações ainda estão faltando? O que vocês gostariam de
            perguntar para os líderes da Estrela?
          </h3>
          <input
            type="message"
            className="h-4/6 rounded border-2 border-solid border-[#A2ABCC] text-base"
          />
        </section>
      </main>
    </div>
  )
}

export default DiarioBordoPage
