import { useRouter } from 'next/router'
import { Button } from '../../../../../components/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import { Loading } from '../../../../../components/Loading'

export default function TakeOff() {
  const [mentorshipName, setMentorshipName] = useState('')
  const router = useRouter()
  const { programId } = router.query

  useEffect(() => {
    if (programId) {
      api
        .get('/dashboard')
        .then((response) => {
          if (response.status === 200) {
            setMentorshipName(response.data.currentMentorship.name)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [programId])
  if (!mentorshipName) {
    return <Loading />
  }

  return (
    <div className="h-screen w-screen bg-bgAstronaltaDeLado bg-cover bg-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-blue-800/10 px-12 py-16 text-center text-xl font-semibold text-gray-100 backdrop-blur-lg">
        <p>
          A partir de agora, sua equipe irá viajar rumo a uma estrela distante
          chamada {mentorshipName}.
        </p>
        <p className="mt-6">
          O objetivo de vocês é unir forças com os líderes da Estrela para
          fazê-la brilhar ainda mais!
        </p>
        <Link href={`/user/adventure/${programId}/onboarding/portal`}>
          <Button.Primary className="mt-12 py-3 px-20">
            Preparar para a decolagem
          </Button.Primary>
        </Link>
      </div>

      <Link href={`/user/adventure/${programId}/onboarding/your-role`}>
        <Button.ArrowLeft
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
        />
      </Link>
      <Link href={`/user/adventure/${programId}/onboarding/portal`}>
        <Button.ArrowRight
          position="center"
          className="bg-blue-800/10 text-white backdrop-blur-lg hover:bg-blue-700"
        />
      </Link>
    </div>
  )
}
