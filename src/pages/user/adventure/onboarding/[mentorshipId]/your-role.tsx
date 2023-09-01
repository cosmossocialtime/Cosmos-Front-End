import { Button } from '../../../../../components/Button'
import LogoCosmos from '../../../../../../public/images/logoCosmosBranco.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useOnboarding } from '../../../../../hooks/useOnboarding'

export default function YourRole() {
  const { rootRoute, currentMentorship } = useOnboarding()

  const role = currentMentorship?.role

  const roleMessages = [
    {
      message: `Seu papel na equipe será o de Comandante. Nesta função, você irá organizar e motivar o time, delegando as tarefas a serem realizadas.`,
      role: 'Comandante',
    },
    {
      message: `Seu papel na equipe será o de Especialista. Nesta função, você irá compartilhar seus talentos e conhecimentos com o restante da equipe.`,
      role: 'Especialista',
    },
    {
      message: `Seu papel na equipe será o de Piloto(a). Nesta função, você irá guiar o time ao longo das etapas do projeto, garantindo que não se percam no caminho.`,
      role: 'Piloto(a)',
    },
  ]

  return (
    <div className="h-screen w-screen bg-bgAstronautaDeFrente bg-cover bg-bottom">
      <Image
        className="absolute left-16 top-16"
        alt="Logo Cosmos"
        src={LogoCosmos}
      />

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-lg bg-blue-800/10 px-14 py-10 text-center backdrop-blur-lg">
        <p className="text-xl font-semibold text-gray-100">
          {roleMessages.find((message) => message.role === role)?.message}
        </p>

        <Link href={`${rootRoute}/take-off`}>
          <Button.Primary className="mt-8 px-28 py-3">
            Aquecer os motores
          </Button.Primary>
        </Link>
      </div>

      <Link href={`${rootRoute}/generate-banner`}>
        <Button.ArrowLeft
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
      <Link href={`${rootRoute}/take-off`}>
        <Button.ArrowRight
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
    </div>
  )
}
