import Link from 'next/link'
import { Button } from '../../../../../components/Button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import { Loading } from '../../../../../components/Loading'
import { dashboardProps } from '../../../../../types/dashboard'

export default function AdventuresOnboarding() {
  const [dashboard, setDashboard] = useState<dashboardProps>()
  const router = useRouter()
  const { programId } = router.query

  useEffect(() => {
    if (programId) {
      api
        .get('/dashboard')
        .then((response) => {
          if (response.status === 200) {
            setDashboard(response.data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [programId])

  if (!dashboard) {
    return <Loading />
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-bgTeletransport bg-cover bg-center">
      <div className="w-2/5 rounded-lg bg-blue-800/10 py-12 px-11 text-center text-lg text-gray-100 backdrop-blur-lg">
        <p className="mb-7">
          <span className="font-bold">Parabéns, {dashboard.user.byname}!</span>{' '}
          Sua jornada no programa <br />
          <span className="font-bold">
            {dashboard.currentMentorship.name}
          </span>{' '}
          começa agora!
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
          <Button.Primary className="py-4 px-20">
            Conhecer jornada
          </Button.Primary>
        </Link>
      </div>
    </div>
  )
}
