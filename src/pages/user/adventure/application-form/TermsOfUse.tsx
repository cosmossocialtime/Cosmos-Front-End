export default function TermsOfUse() {
    return (
        <div className="py-16 px-44">
            <h2 className="mb-14 text-center text-gray-800 text-2xl font-semibold">Coloque seu capacete, ajuste seu traje e se prepare para uma aventura!</h2>

            <div className="mb-14 text-gray-800">
                <p className="mb-4">
                    Antes de iniciar nossa missão, precisamos de mais algumas informações para conseguir compor a tripulação e ajustar as funçõesde cada pessoa voluntária.
                </p>
                <p>
                    É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com: a organização do programa, profissionais da instituição mentorada e colegas de equipe.
                </p>
            </div>

            <p>
                Para mais informações sobre como as suas informações serão tratadas, acesse o
                <a href="">Termo de Consentimento ao Tratamento de Dados.</a>
            </p>
            <label className="flex gap-2 items-center ">
                <input type="checkbox" className="bg-red-500 w-6 h-6 rounded" />
                {/* <span className=" block w-6 h-6 rounded border bg-gray-200 border-gray-400 border-solid cursor-pointer"/> */}
                Aceito que minhas respostas sejam compartilhadas
            </label>

        </div>
    )
}