
import { ArrowRight } from 'phosphor-react'

const DiarioBordoPage = () => {
    return (
        <div className='h-screen grid grid-rows-[15%_1fr]'>
            <header className='row-start-1 row-end-2 px-20 flex items-center justify-between bg-[#FDFDFF] shadow-[0px 0px 24px rgba(43, 18, 74, 0.08)]'>
                <section className='flex flex-col'>
                    <p className='text-lg text-[#727CA3]'>23/02/2023</p>
                    <h1 className='text-4xl text-[#363F63] font-semibold'>Encontro da Tripulação</h1>
                </section>
                <button className="arrowButton">
                    <ArrowRight size={24} className='text-cian-500'/>    
                </button>
            </header>

            <main className='row-start-2 row-end-3 pl-20 w-5/6 flex flex-col pt-8'>
                <section className='flex flex-col gap-[8%] grow'>
                    <h3 className='text-lg text-[#363F63]'>Quais são algumas das informações que vocês já podem tomar como verdadeiras sobre o(a) [Nome da Instituição]?</h3>
                    <input type="message" className='text-base rounded border-solid border-2 border-[#A2ABCC] h-4/6' />
                </section>
                <section className='flex flex-col gap-[8%] grow'>
                    <h3 className='text-lg text-[#363F63]'>Quais informações ainda estão faltando? O que vocês gostariam de perguntar para os líderes da Estrela?</h3>
                    <input type="message" className='text-base rounded border-solid border-2 border-[#A2ABCC] h-4/6' />
                </section>
            </main>
        </div>
    )
}

export default DiarioBordoPage