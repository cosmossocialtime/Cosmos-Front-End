const DiarioBordoPage = () => {
    return(
        <div className='h-screen grid grid-rows-[15%_1fr] pl-20 border-solid border-2 border-black'>
            <header className='row-start-1 row-end-2 flex flex-col justify-center border-solid border-2 border-black'>
                <p className='text-lg font-normal'>23/02/2023</p>
                <h1 className='text-4xl font-semibold'>Encontro da Tripulação</h1>
            </header>

            <main className='row-start-2 row-end-3 grid grid-rows-2 border-solid border-2 border-black'>
                <section className='infosAtuais'>
                    <h3>Quais são algumas das informações que vocês já podem tomar como verdadeiras sobre o(a) [Nome da Instituição]?</h3>
                    <input type="message" />
                </section>
                <section className='infosFaltantes'>
                    <h3>Quais informações ainda estão faltando? O que vocês gostariam de perguntar para os líderes da Estrela?</h3>
                    <input type="message" />
                </section>
            </main>
        </div>
    );
};

export default DiarioBordoPage