import { useRouter } from 'next/router'
import AstronautCommander from '../../../../../../../public/images/mission-role/commander.png'
import { AstronaltRule } from '../../../../../../components/adventure/application-form/AstronaltRule'

export default function Commander() {
  const router = useRouter()
  const { programId } = router.query

  const text = `Lidera a tripulação. Seu papel consiste em engajar, organizar e desenvolver o time, de forma que todos deem o seu melhor para concluir a missão.
  Ao vestir a camisa de Comandante, você irá aprimorar habilidades de liderança, tais como: união da equipe, delegação de tarefas e tomada de decisões.`

  return (
    <AstronaltRule
      astronaltImg={AstronautCommander}
      color="#FFD743"
      title="Comandante"
      text={text}
      linkBack={`/user/adventure/${programId}/subscribe/application-form/mission-role`}
      linkNext={`/user/adventure/${programId}/subscribe/application-form/specialist`}
    />
  )
}
