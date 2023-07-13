import * as HoverCard from '@radix-ui/react-hover-card'
import { useRouter } from 'next/router'
import AstronautPilot from '../../../../../../../public/images/mission-role/pilot.png'
import { AstronaltRule } from '../../../../../../components/adventure/application-form/AstronaltRule'

export default function Pilot() {
  const router = useRouter()
  const { programId } = router.query

  return (
    <AstronaltRule
      astronaltImg={AstronautPilot}
      color="#FD6062"
      title="Piloto"
      linkBack={`/user/adventure/${programId}/subscribe/application-form/specialist`}
      linkNext={`/user/adventure/${programId}/subscribe/application-form/choose-your-role`}
    >
      <p>
        Garante que as etapas do projeto e o{' '}
        <HoverCard.Root>
          <HoverCard.Trigger className="font-bold">
            Mapa da Navegação
          </HoverCard.Trigger>
          <HoverCard.Content
            side="top"
            sideOffset={5}
            className="w-80 rounded-lg bg-white p-4 text-base shadow-xl"
          >
            <p>
              O Mapa da Navegação é o plano de objetivos e atividades que serão
              desenvolvidos ao longo do projeto. Ele será criado em conjunto com
              a equipe da instituição mentorada
            </p>
          </HoverCard.Content>
        </HoverCard.Root>{' '}
        serão seguidos corretamente. Seu papel é guiar a equipe ao longo da
        missão.
      </p>

      <p>
        Vestindo esta camisa, você desenvolverá habilidades como organização,
        foco e adaptação a mudanças.
      </p>
    </AstronaltRule>
  )
}
