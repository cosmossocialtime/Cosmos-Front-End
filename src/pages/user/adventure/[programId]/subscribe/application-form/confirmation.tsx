import { useEffect, useState } from 'react'
import { Input } from '../../../../../../components/Input'
import { Header } from '../../../../../../components/adventure/Header'
import { toast } from 'react-toastify'
import { Button } from '../../../../../../components/Button'
import { api } from '../../../../../../services/api'
import Router from 'next/router'
import Link from 'next/link'
import { KnowledgeProps } from '../../../../../../types/knowledge'
import { useSubscribe } from '../../../../../../hooks/useSubscribe'
// import axiosInstance from '../../../../../../services/apiMock'

export default function Confirmation() {
  const { program, programId } = useSubscribe()

  const [selectedAreas, setSelectedAreas] = useState<number[]>([])
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeProps[]>([])

  useEffect(() => {
    api
      .get('/enum/sectors')
      .then((response) => {
        setKnowledgeAreas(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

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
    api
      .patch(`/user/volunteering/`, {
        sectorIds: selectedAreas,
      })
      .then((response) => {
        if (response.status === 200) {
          completeRegistration()
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível enviar os dados. Tente novamente mais tarde!',
        )
      })
  }

  function completeRegistration() {
    api
      .patch(`volunteer/completed/${program?.volunteerApplicationId}`)
      .then((response) => {
        Router.push(
          `/user/adventure/${programId}/subscribe/application-form/thanks`,
        )
      })
      .catch((error) => {
        console.error(error)
        toast.error(
          'Não foi possível validar sua inscrição. Tente novamente mais tarde!',
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
      <div className="mb-20 mt-10 grid justify-center">
        <h2 className="text-center">
          Ufa! Chegamos à última etapa! Agora, escolha{' '}
          <strong>até 3 áreas</strong> do conhecimento <br /> com as quais você
          pode contribuir para a organização mentorada:
        </h2>

        <div className="mt-14 grid grid-cols-2 items-center justify-between gap-x-28 gap-y-10">
          {knowledgeAreas.map((knowledge) => (
            <Input.CheckBox
              checked={selectedAreas.includes(knowledge.id)}
              onChangeChecked={() => selectArea(knowledge.id)}
              key={knowledge.id}
              content={knowledge.sectorName}
            />
          ))}
        </div>

        <Button.Primary
          onClick={sendData}
          className="mx-auto mt-20 max-w-max px-32 py-3"
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
