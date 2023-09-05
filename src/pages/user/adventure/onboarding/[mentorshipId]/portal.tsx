import Link from 'next/link'
import { Button } from '../../../../../components/Button'
import { api } from '../../../../../services/api'
import { useOnboarding } from '../../../../../hooks/useOnboarding'

export default function Portal() {
  const { currentMentorship, rootRoute, mentorshipId } = useOnboarding()

  const volunteerId = currentMentorship?.volunteerId

  function completeOnboarding() {
    api
      .patch(`/volunteer/onboarding/${volunteerId}/completed`)
      .then((response) => {
        if (response.status === 200) {
          console.log('dado enviado com sucesso')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="h-screen w-screen bg-bgPortal bg-cover bg-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-blue-800/10 px-14 py-10 text-center backdrop-blur-lg">
        <p className="text-xl font-semibold text-gray-100">
          O painel com as etapas da missão já está <br /> disponível para você
          começar, vamos lá?
        </p>
        <Link href={`/user/dashboard/${mentorshipId}/mission-painel`}>
          <Button.Primary
            className="mt-8 px-28 py-3"
            onClick={completeOnboarding}
          >
            Dar a partida!
          </Button.Primary>
        </Link>
      </div>
      <Link href={`${rootRoute}/take-off`}>
        <Button.ArrowLeft
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
    </div>
  )
}
