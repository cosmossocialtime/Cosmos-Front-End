import { Button } from '../../../../../../components/Button'
import { Header } from '../../../../../../components/adventure/Header'
import Commander from '../../../../../../../public/images/mission-role/cards/commander.png'
import Specialist from '../../../../../../../public/images/mission-role/cards/specialist.png'
import Pilot from '../../../../../../../public/images/mission-role/cards/pilot.png'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { api } from '../../../../../../services/api'
import { toast } from 'react-toastify'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'

type crew = {
  id: number
  role: string
  photo: StaticImageData
}

export default function ChooseYourRole() {
  const { program, programId } = useSubscribe()

  const [rolesSelected, setRolesSelected] = useState<number[]>([])
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

  useEffect(() => {
    if (rolesSelected.length === 2) {
      const numbersIds = [1, 2, 3]
      const firstOption = rolesSelected[0]
      const secondOption = rolesSelected[1]
      const thirdOption = numbersIds.find(
        (number) => !rolesSelected.includes(number),
      )

      api
        .patch('/volunteer/prefferedRoles', {
          applicationId: program?.volunteerApplicationId,
          firstRole: firstOption,
          secondRole: secondOption,
          thirdRole: thirdOption,
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
  }, [rolesSelected])

  function selectFirtOpt() {
    if (!selectedCrew) {
      toast.error('Selecione um papel!')
      return
    }

    setRolesSelected((prevRolesSelect) => {
      const updatedRolesSelected = [...prevRolesSelect]
      updatedRolesSelected[0] = selectedCrew

      return updatedRolesSelected
    })
    setSelectedCrew(0)
  }

  function selectSecondOpt() {
    if (!selectedCrew) {
      toast.error('Selecione um papel!')
      return
    }

    setRolesSelected((prevRolesSelect) => {
      const updatedRolesSelected = [...prevRolesSelect]
      updatedRolesSelected[1] = selectedCrew

      return updatedRolesSelected
    })
    setSelectedCrew(0)
  }

  function backSelection() {
    const rolesSelectedUpdate = rolesSelected
    const optionDeleted = rolesSelectedUpdate.pop()

    setRolesSelected(rolesSelectedUpdate)
    setSelectedCrew(optionDeleted!)
  }

  return (
    <div>
      <Header title="Seu papel na missão" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end text-violet-600">
          <strong className="font-bold">4</strong>/5
        </span>
      </Header>

      <div className="flex flex-col items-center px-36 pt-10 pb-20 text-gray-800">
        <span className="text-xl">
          {!rolesSelected[0]
            ? 'Agora que você já conhece todos os papéis, escolha aquele que mais gostaria de exercer ao longo da jornada:'
            : 'Maravilha! E caso não seja possível exercer a sua 1ª opção, qual seria a sua 2ª escolha?'}
        </span>
        <div className="mt-9 flex items-center justify-center gap-12 text-center text-lg">
          {shipCrew.map((crew) => (
            <button
              aria-disabled={rolesSelected.includes(crew.id)}
              onClick={() => setSelectedCrew(crew.id)}
              data-selected={crew.id === selectedCrew}
              key={crew.role}
              className="group cursor-pointer rounded-[14px] p-1 outline-none transition-all hover:scale-105 hover:shadow-2xl aria-disabled:pointer-events-none aria-disabled:bg-transparent data-[selected=true]:scale-105 data-[selected=true]:bg-gradient-to-l data-[selected=true]:from-violet-400 data-[selected=true]:to-blue-300 data-[selected=true]:shadow-2xl"
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
        <Button.Primary
          onClick={!rolesSelected[0] ? selectFirtOpt : selectSecondOpt}
          className="mt-16 py-3 px-28"
        >
          {!rolesSelected[0] ? 'Confirmar 1ª opção' : 'Confirmar 2ª opção'}
        </Button.Primary>
      </div>
      {!rolesSelected[0] ? (
        <Link
          href={`/user/adventure/${programId}/subscribe/application-form/pilot`}
        >
          <Button.ArrowLeft />
        </Link>
      ) : (
        <Button.ArrowLeft onClick={backSelection} />
      )}
    </div>
  )
}
