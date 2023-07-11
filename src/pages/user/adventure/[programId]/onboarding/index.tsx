import Link from 'next/link'
import { Button } from '../../../../../components/Button'
import { useRouter } from 'next/router'

export default function AdventuresOnboarding() {
  const router = useRouter()
  const { programId } = router.query

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bgTeletransport bg-cover bg-center">
      <div className="rounded-lg bg-blue-800/10 py-12 px-11 text-center text-lg text-gray-100 backdrop-blur-lg">
        <p className="mb-7">
          <span className="font-bold">Parabéns, [Nome]!</span> Sua jornada no
          programa <br />
          <span className="font-bold">[Nome do Programa]</span> começa agora!
        </p>
        <p className="mb-7">
          Na próxima tela você poderá escolher uma foto sua <br /> e
          compartilhar essa conquista nas suas redes sociais!
        </p>
        <p className="mb-9">
          Aproveite essa oportunidade e mostre a todos <br /> a aventura que
          você está começando!
        </p>

        <Button.Primary className="py-4 px-20">
          <Link href={`${programId}/generateBanner`}>Conhecer jornada</Link>
        </Button.Primary>
      </div>
    </div>
  )
}
