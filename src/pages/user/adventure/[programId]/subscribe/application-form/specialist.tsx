import { useRouter } from 'next/router'
import AstronautSpecialist from '../../../../../../../public/images/mission-role/specialist.png'
import { AstronaltRule } from '../../../../../../components/adventure/application-form/AstronaltRule'

export default function Commander() {
  const router = useRouter()
  const { programId } = router.query

  const text = `Tem conhecimento ou experiência em alguma área que será importante ao longo da jornada.
  Ao vestir a camisa de Especialista, você terá a oportunidade de compartilhar seus conhecimentos e aplicá-los para solucionar problemas reais.`

  return (
    <AstronaltRule
      astronaltImg={AstronautSpecialist}
      color="#AEDF55"
      title="Especialista"
      text={text}
      linkBack={`/user/adventure/${programId}/subscribe/application-form/commander`}
      linkNext={`/user/adventure/${programId}/subscribe/application-form/pilot`}
    />
  )
}
