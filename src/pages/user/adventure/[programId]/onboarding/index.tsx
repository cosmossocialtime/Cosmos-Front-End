import Link from 'next/link'
import { Button } from '../../../../../components/Button'
import { Loading } from '../../../../../components/Loading'
import { useOnboarding } from '../../../../../hooks/useOnboarding'

export default function AdventuresOnboarding() {
  const { user, currentMentorship, programId } = useOnboarding()

  if (!user || !currentMentorship || !programId) {
    return <Loading />
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bgTeletransport bg-cover bg-center">
      <div className="w-[45vw] rounded-lg bg-blue-800/30 px-11 py-8 text-center text-lg text-gray-100 backdrop-blur-xl">
        <p className="mb-7">
          <span className="font-bold">Parabéns, {user.byname}!</span> Sua
          jornada no programa <br />
          <span className="font-bold">{currentMentorship.name}</span> começa
          agora!
        </p>
        <p className="mb-7">
          Na próxima tela você poderá escolher uma foto sua <br /> e
          compartilhar essa conquista nas suas redes sociais!
        </p>
        <p className="mb-9">
          Aproveite essa oportunidade e mostre a todos <br /> a aventura que
          você está começando!
        </p>

        <Link href={`/user/adventure/${programId}/onboarding/generate-banner`}>
          <Button.Primary className="px-20 py-4">
            Conhecer jornada
          </Button.Primary>
        </Link>
      </div>
    </div>
  )
}
