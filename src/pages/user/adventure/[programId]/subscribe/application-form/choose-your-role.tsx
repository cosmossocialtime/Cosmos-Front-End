import { Button } from '../../../../../../components/Button'
import { Header } from '../../../../../../components/adventure/Header'
import Commander from '../../../../../../../public/images/mission-role/commander.png'
import Specialist from '../../../../../../../public/images/mission-role/specialist.png'
import Pilot from '../../../../../../../public/images/mission-role/pilot.png'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { api } from '../../../../../../services/api'
import { ToastContainer, toast } from 'react-toastify'

type crew = {
  id: number
  role: string
  photo: StaticImageData
}

export default function ChooseYourRole() {
  const router = useRouter()
  const { programId } = router.query

  const [rolesSelected, setRolesSelect] = useState<number[]>([])
  const [selectedCrew, setSelectedCrew] = useState(0)

  const shipCrew: Array<crew> = [
    {
      id: 1,
      role: 'Comandante',
      photo: Commander,
    },
    {
      id: 2,
      role: 'Especialista',
      photo: Specialist,
    },
    {
      id: 3,
      role: 'Piloto',
      photo: Pilot,
    },
  ]

  function sendData() {
    if (rolesSelected.length < 2) {
      selectRole()
      return
    }

    const numbersIds = [1, 2, 3]
    numbersIds.find(
      (number) =>
        !rolesSelected.includes(number) &&
        setRolesSelect([...rolesSelected, number]),
    )

    api
      .patch('user/volunteering', {
        rolesSelected,
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            `/user/adventure/${programId}/subscribe/application-form/confirmation`,
          )
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível enviar os dados. Tente novamente mais tarde!',
        )
      })
  }

  function selectRole() {
    if (rolesSelected.includes(selectedCrew)) {
      return
    }
    if (!selectedCrew) {
      return
    }

    setRolesSelect([...rolesSelected, selectedCrew])
    setSelectedCrew(0)
  }

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
            <button
              aria-disabled={rolesSelected.includes(crew.id)}
              onClick={() => setSelectedCrew(crew.id)}
              data-selected={crew.id === selectedCrew}
              key={crew.role}
              className="group cursor-pointer rounded-[14px] p-1 outline-none transition-colors hover:bg-gray-500 aria-disabled:pointer-events-none aria-disabled:bg-transparent data-[selected=true]:bg-gradient-to-l data-[selected=true]:from-violet-400 data-[selected=true]:to-blue-300 data-[selected=true]:shadow-2xl"
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
            </button>
          ))}
        </div>
        <Button.Primary onClick={sendData} className="mt-16 py-3 px-28">
          Confirmar {rolesSelected.length + 1}ª opção
        </Button.Primary>
        <span>{rolesSelected}</span>
      </div>
      <Link
        href={`/user/adventure/${programId}/subscribe/application-form/pilot`}
      >
        <Button.ArrowLeft />
      </Link>

      <ToastContainer limit={3} />
    </div>
  )
}
