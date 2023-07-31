import { Button } from '../../../../../../components/Button'
import { Loading } from '../../../../../../components/Loading'
import Link from 'next/link'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'
import dayjs from 'dayjs'

export default function Thanks() {
  const { program, company } = useSubscribe({ disableRedirect: true })

  if (!program || !company) {
    return <Loading />
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bgEspaço bg-cover">
      <div className="w-[55rem] rounded-[20px] bg-gradient-to-l from-violet-400 to-blue-300 p-1">
        <div className="rounded-2xl bg-white px-24 py-16 text-center text-gray-800">
          <h1 className="mb-9 text-4xl font-semibold">
            Obrigada por se inscrever no programa {program.name}
          </h1>

          <p className="mb-7 text-xl">
            O processo de seleção será feito pela empresa {company.name}. O
            resultado será enviado para seu e-mail cadastrado até o dia{' '}
            {dayjs(program.updatedAt).format('DD/MM/YYYY')}
          </p>

          <p className="text-xl">
            Caso seja uma das pessoas selecionadas, você encontrará o programa{' '}
            {program.name} na aba “Missões Atuais” e poderá dar início à sua
            jornada.
          </p>
          <Link href="/user/painel">
            <Button.Primary className="mt-8 px-20 py-3">
              Voltar ao Painel Principal
            </Button.Primary>
          </Link>
        </div>
      </div>
    </div>
  )
}
