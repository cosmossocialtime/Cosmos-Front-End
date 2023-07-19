import { useEffect, useState } from 'react'
import { Input } from '../../../../../../components/Input'
import { Header } from '../../../../../../components/adventure/Header'
import { toast } from 'react-toastify'
import { Button } from '../../../../../../components/Button'
import { api } from '../../../../../../services/api'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import { programProps } from '../../../../../../types/program'
import axiosInstance from '../../../../../../services/apiMock'

export default function Confirmation() {
  const router = useRouter()
  const { programId } = router.query
  const [program, setProgram] = useState<programProps>()

  const [selectedAreas, setSelectedAreas] = useState<number[]>([])
  const knowledgeAreas = [
    {
      id: 1,
      name: 'Análise de Dados',
    },
    {
      id: 2,
      name: 'Comercial',
    },
    {
      id: 3,
      name: 'Comunicação e Marketing',
    },
    {
      id: 4,
      name: 'Finanças',
    },
    {
      id: 5,
      name: 'Gestão de Pessoas',
    },
    {
      id: 6,
      name: 'Gestão de Projetos',
    },
    {
      id: 7,
      name: 'Desenvolvimento de Lideranças',
    },
    {
      id: 8,
      name: 'Estratégia',
    },
    {
      id: 9,
      name: 'Jurídico',
    },
    {
      id: 10,
      name: 'Sustentabilidade',
    },
  ]

  useEffect(() => {
    if (programId) {
      api
        .get(`/program/${programId}`)
        .then((response) => {
          setProgram(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [programId])

  function selectArea(areaId: number) {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas((prevSelectedAreas) =>
        prevSelectedAreas.filter((selectedArea) => selectedArea !== areaId),
      )
      return
    }

    if (selectedAreas.length >= 3) {
      toast.error('Selecione no máximo 3 áreas!')
      return
    }

    setSelectedAreas((prevSelectedAreas) => [...prevSelectedAreas, areaId])
  }

  function sendData() {
    if (selectedAreas.length === 0) {
      toast.error('Selecione ao menos 1 área!')
      return
    }
    axiosInstance
      .patch(`/volunteer/completed/${program?.volunteerApplicationId}`, {
        sectorIds: selectedAreas,
      })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            `/user/adventure/${programId}/subscribe/application-form/thanks`,
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

  return (
    <div>
      <Header title="Confirmação" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end text-violet-600">
          <strong className="font-bold">5</strong>/5
        </span>
      </Header>
      <div className="mt-10 mb-20 grid justify-center">
        <h2 className="text-center">
          Ufa! Chegamos à última etapa! Agora, escolha{' '}
          <strong>até 3 áreas</strong> do conhecimento <br /> com as quais você
          pode contribuir para a organização mentorada:
        </h2>

        <div className="mt-14 grid grid-cols-2 items-center justify-between gap-y-10 gap-x-28">
          {knowledgeAreas.map((knowledge) => (
            <Input.CheckBox
              checked={selectedAreas.includes(knowledge.id)}
              onChangeChecked={() => selectArea(knowledge.id)}
              key={knowledge.id}
              content={knowledge.name}
            />
          ))}
        </div>

        <Button.Primary
          onClick={sendData}
          className="mx-auto mt-20 max-w-max py-3 px-32"
        >
          Enviar inscrição
        </Button.Primary>
      </div>
      <Link
        href={`/user/adventure/${programId}/subscribe/application-form/choose-your-role`}
      >
        <Button.ArrowLeft />
      </Link>
    </div>
  )
}
