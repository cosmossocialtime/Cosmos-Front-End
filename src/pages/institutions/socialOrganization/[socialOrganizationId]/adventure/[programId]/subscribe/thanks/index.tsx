import { Button } from '../../../../../../../../components/Button'
import { Loading } from '../../../../../../../../components/Loading'
import dayjs from 'dayjs'
import { useSubscribeInstitution } from '../../../../../../../../hooks/useSubscribeInstitution'
import DynamicHeader from '../../../../../../../../components/header/DynamicHeader'
import { Check } from 'phosphor-react'
import Router, { useRouter } from 'next/router'

export default function Thanks() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const { socialOrganization, program } = useSubscribeInstitution(
    organizationId,
    { disableRedirect: true }
  )

  if (!program) {
    return <Loading />
  }
  return (
    <div className="flex min-h-screen w-full flex-col  overflow-x-hidden">
      <DynamicHeader />
      <div className="flex h-screen w-screen items-center justify-center bg-bgEspaço bg-cover">
        <div className="w-[55rem] rounded-[20px] bg-gradient-to-l from-violet-400 to-blue-300 p-1">
          <div className="rounded-2xl bg-white px-24 py-16 text-center text-gray-800">
            <div className="mb-6 flex justify-center">
              <Check size={60} className="text-[#46CE9D]" />
            </div>
            <h1 className="mb-9 text-4xl font-semibold text-gray-800">
              Obrigada por se inscrever no programa {program.name}
            </h1>

            <p className="mb-7 text-xl text-gray-500">
              O processo de seleção será feito pela empresa{' '}
              {program.companyName}. O resultado será enviado para seu e-mail
              cadastrado até o dia{' '}
              {dayjs(program.updatedAt).format('DD/MM/YYYY')}
            </p>

            <p className="text-xl text-gray-500">
              Caso seja uma das pessoas selecionadas, você encontrará o programa{' '}
              {program.name} na aba “Missões Atuais” e poderá dar início à sua
              jornada.
            </p>
            <Button.Primary
              className="mt-8 px-20 py-3"
              onClick={() => {
                Router.push(
                  `/institutions/socialOrganization/${
                    socialOrganization?.id || 0
                  }/home`
                )
              }}
            >
              Voltar ao Painel Principal
            </Button.Primary>
          </div>
        </div>
      </div>
    </div>
  )
}
