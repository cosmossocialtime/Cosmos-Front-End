import { Button } from '../../../../../components/Button'
import LogoCosmos from '../../../../../../public/images/logoCosmosBranco.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function YourRole() {
  const router = useRouter()
  const { programId } = router.query

  return (
    <div className="h-screen w-screen bg-bgAstronautaDeFrente bg-cover bg-center">
      <Image
        className="absolute top-16 left-16"
        alt="Logo Cosmos"
        src={LogoCosmos}
      />

      <div className="absolute left-1/2 bottom-20 -translate-x-1/2 rounded-lg bg-blue-800/10 py-10 px-14 text-center backdrop-blur-lg">
        <p className="text-xl font-semibold text-gray-100">
          Seu papel na equipe será o de Comandante. Nesta função, você será
          responsável por organizar o time, delegando as tarefas a serem
          realizadas.
        </p>

        <Link href={`/user/adventure/${programId}/onboarding/take-off`}>
          <Button.Primary className="mt-8 py-3 px-28">
            Aquecer os motores
          </Button.Primary>
        </Link>
      </div>

      <Link href={`/user/adventure/${programId}/onboarding/generate-banner`}>
        <Button.ArrowLeft
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
        />
      </Link>
      <Link href={`/user/adventure/${programId}/onboarding/take-off`}>
        <Button.ArrowRight
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
        />
      </Link>
    </div>
  )
}
