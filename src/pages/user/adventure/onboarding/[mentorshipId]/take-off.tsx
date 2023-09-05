import { Button } from '../../../../../components/Button'
import Link from 'next/link'
import { useOnboarding } from '../../../../../hooks/useOnboarding'

export default function TakeOff() {
  const { rootRoute, currentMentorship } = useOnboarding()

  return (
    <div className="h-screen w-screen bg-bgAstronaltaDeLado bg-[40%_30%]">
      <div className="absolute left-[15%] top-1/2 w-2/4 -translate-y-1/2 rounded-lg bg-blue-800/10 px-12 py-16 text-center text-xl font-semibold text-gray-100 backdrop-blur-lg">
        <p>
          A partir de agora, sua equipe irá viajar rumo a uma estrela distante
          chamada {currentMentorship?.socialOrganization}.
        </p>
        <p className="mt-6">
          O objetivo de vocês é unir forças com os líderes da Estrela para
          fazê-la brilhar ainda mais!
        </p>
        <Link href={`${rootRoute}/portal`}>
          <Button.Primary className="mt-12 px-20 py-3">
            Preparar para a decolagem
          </Button.Primary>
        </Link>
      </div>

      <Link href={`${rootRoute}/your-role`}>
        <Button.ArrowLeft
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
      <Link href={`${rootRoute}/portal`}>
        <Button.ArrowRight
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
    </div>
  )
}
