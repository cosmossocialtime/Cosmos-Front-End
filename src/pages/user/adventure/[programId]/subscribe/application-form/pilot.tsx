import { useRouter } from 'next/router'
import AstronautPilot from '../../../../../../../public/images/mission-role/pilot.png'
import { AstronaltRule } from '../../../../../../components/adventure/application-form/AstronaltRule'

export default function Pilot() {
  const router = useRouter()
  const { programId } = router.query

  const text = `Garante que as etapas do projeto e o Mapa da Navegação serão seguidos corretamente. Seu papel é guiar a equipe ao longo da missão.
  Vestindo esta camisa, você desenvolverá habilidades como organização, foco e adaptação a mudanças.`

  return (
    <AstronaltRule
      astronaltImg={AstronautPilot}
      color="#FD6062"
      title="Piloto"
      text={text}
      linkBack={`/user/adventure/${programId}/subscribe/application-form/specialist`}
      linkNext={`/user/adventure/${programId}/subscribe/application-form/choose-your-role`}
    />
  )
}
