import { Button } from '../../../../../../components/Button'
import { Header } from '../../../../../../components/adventure/Header'
import Tripulantes from '../../../../../../../public/images/tripulantes.png'
import Image from 'next/image'

export default function MissionRole() {
  return (
    <div>
      <Header title="Seu papel na missão" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end font-semibold text-violet-600">
          Introdução para quarta etapa
        </span>
      </Header>

      <div className="flex items-center gap-10 pl-8 pr-36">
        <Image
          className="w-2/3"
          alt="Tripulantes"
          src={Tripulantes}
          quality={100}
        />
        <div>
          <p className="text-gray-800">
            Ao longo do programa de mentoria, cada membro da equipe de
            voluntariado exercerá um papel similar àqueles que existem em
            missões espaciais de verdade!
          </p>
          <p className="text-gray-800">
            A seguir, você terá uma breve{' '}
            <strong className="font-semibold">introdução</strong> sobre cada um
            deles. Leia com atenção e ao final escolha, por ordem de prioridade,
            quais papéis você mais gostaria de exercer.
          </p>
          <Button.Primary className="mt-14 py-3 px-36">
            Vamos lá!
          </Button.Primary>
        </div>
        <Button.ArrowLeft />
      </div>
    </div>
  )
}
