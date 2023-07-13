import { Button } from '../../../../../../components/Button'

export default function Thanks() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bgEspaço bg-cover">
      <div className="w-[55rem] rounded-[20px] bg-gradient-to-l from-violet-400 to-blue-300 p-1">
        <div className="rounded-2xl bg-white py-16 px-24 text-center text-gray-800">
          <h1 className="mb-9 text-4xl font-semibold">
            Obrigada por se inscrever no programa [Nome do programa]
          </h1>

          <p className="mb-7 text-xl">
            O processo de seleção será feito pela empresa [Nome da Empresa]. O
            resultado será enviado para seu e-mail cadastrado até o dia
            dd/mm/aa.
          </p>

          <p className="text-xl">
            Caso seja uma das pessoas selecionadas, você encontrará o programa
            [Nome do Programa] na aba “Missões Atuais” e poderá dar início à sua
            jornada.
          </p>

          <Button.Primary className="mt-8 py-3 px-20">
            Voltar ao Painel Principal
          </Button.Primary>
        </div>
      </div>
    </div>
  )
}
