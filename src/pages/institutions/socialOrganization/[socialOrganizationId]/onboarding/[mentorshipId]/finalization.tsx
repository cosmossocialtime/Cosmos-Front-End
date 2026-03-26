import { ArrowLeft } from 'phosphor-react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { toast } from 'react-toastify'
import { useHeader } from '../../../../../../context/HeaderContext'
import { api } from '../../../../../../services/api'

export default function Finalization() {
  const router = useRouter()
  const { socialOrganizationId, mentorshipId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const mentorId = Number(mentorshipId || '0')

  const { setShowMenu, setShowOrganization } = useHeader()

  async function completeOnboarding() {
    try {
      const payload = {
        mentorshipId: mentorId,
      }

      const response = await api.put('/mentorship/onboarding/complete', payload)

      if (response.status == 201) {
        toast.success('Onboarding concluído')
        setShowMenu(true)
        setShowOrganization(true)
        Router.push(
          `/institutions/socialOrganization/${organizationId}/dashboard/${mentorId}/mission-painel`
        )
      } else {
        toast.error('Erro ao salvar as informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar as informações!')
      throw error
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <DynamicHeader />

      <div className="relative flex flex-1 items-center justify-center bg-bgFrenteNave bg-cover bg-center text-white">
        {/* Botão de voltar */}
        <div className="absolute left-10 top-8 z-10">
          <ArrowLeft
            className="cursor-pointer text-white"
            onClick={() =>
              Router.push(
                `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationImageUpload`
              )
            }
            size={24}
          />
        </div>

        {/* Conteúdo central */}
        <div className="flex w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="rounded-xl bg-white/5 p-10 backdrop-blur-xl">
            <h1 className="mb-4 text-3xl">Tudo pronto para a decolagem!</h1>
            <p className="mb-10 text-xl leading-relaxed text-gray-300">
              Os preparativos foram finalizados! <br />
              <br />O painel com as etapas da missão agora já está disponível
              para você começar. Vamos lá?
            </p>
            <div className="px-32 py-3">
              <Button
                text="Dar a partida"
                onClick={() => completeOnboarding()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
