import { Button } from '../../../../../../components/Button'
import { Header } from '../../../../../../components/adventure/Header'
import Commander from '../../../../../../../public/images/mission-role/commander.png'
import Specialist from '../../../../../../../public/images/mission-role/specialist.png'
import Pilot from '../../../../../../../public/images/mission-role/pilot.png'
import Image from 'next/image'
import { useState } from 'react'

export default function ChooseYourRole() {
  const [selectedCrew, setSelectedCrew] = useState('Comandante')
  const shipCrew = [
    {
      role: 'Comandante',
      photo: Commander,
    },
    {
      role: 'Especialista',
      photo: Specialist,
    },
    {
      role: 'Piloto',
      photo: Pilot,
    },
  ]

  return (
    <div>
      <Header title="Seu papel na missão" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end font-semibold text-violet-600">
          4/5
        </span>
      </Header>

      <div className="flex flex-col items-center px-36 pt-10 pb-20 text-gray-800">
        <span className="text-xl">
          Agora que você já conhece todos os papéis, escolha aquele que mais
          gostaria de exercer ao longo da jornada:
        </span>
        <div className="mt-9 flex items-center justify-center gap-12 text-center text-lg">
          {shipCrew.map((crew) => (
            <div
              onClick={() => setSelectedCrew(crew.role)}
              key={crew.role}
              data-selected={crew.role === selectedCrew}
              className="group cursor-pointer rounded-[14px] p-1 transition-colors hover:bg-gray-500 aria-disabled:pointer-events-none aria-disabled:bg-transparent data-[selected=true]:bg-gradient-to-l data-[selected=true]:from-violet-400 data-[selected=true]:to-blue-300 data-[selected=true]:shadow-2xl"
            >
              <div className="max-w-max rounded-xl bg-white py-3 px-3">
                <Image
                  className="group-aria-disabled:opacity-50 group-aria-disabled:grayscale"
                  alt={crew.role}
                  src={crew.photo}
                  quality={100}
                />
                <span>{crew.role}</span>
              </div>
            </div>
          ))}
        </div>
        <Button.Primary className="mt-16 py-3 px-28">
          Confirmar 1ª opção
        </Button.Primary>
      </div>

      <Button.ArrowLeft />
    </div>
  )
}
