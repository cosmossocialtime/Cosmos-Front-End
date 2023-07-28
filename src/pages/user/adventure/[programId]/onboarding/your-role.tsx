import { Button } from '../../../../../components/Button'
import LogoCosmos from '../../../../../../public/images/logoCosmosBranco.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { api } from '../../../../../services/api'

export default function YourRole() {
  const router = useRouter()
  const { programId } = router.query
  // const [role, setRole] = useState()

  useEffect(() => {
    if (programId) {
      api
        .get('/dashboard')
        .then((response) => {
          if (response.status === 200) {
            // setRole(response.data.currentMentorship.role)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [programId])

  // const roleText = {
  //   commander: `Seu papel na equipe será o de Comandante. Nesta função, você será responsável por organizar o time, delegando as tarefas a serem realizadas.`,
  //   specialist: `Seu papel na equipe será o de Especialista. Nesta função, você será responsável por executar as tarefas que condizerem com suas habilidades.`,
  //   pilot: `Seu papel na equipe será o de Piloto(a). Nesta função, você será responsável por garantir que todas as etapas estejam sendo seguidas corretamente. `,
  // }

  return (
    <div className="h-screen w-screen bg-bgAstronautaDeFrente bg-cover bg-bottom">
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
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
      <Link href={`/user/adventure/${programId}/onboarding/take-off`}>
        <Button.ArrowRight
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg"
        />
      </Link>
    </div>
  )
}
