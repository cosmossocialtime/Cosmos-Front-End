import { useState } from 'react'
import { Input } from '../../../../../components/Input'
import { Header } from '../../../../../components/adventure/Header'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '../../../../../components/Button'

export default function Confirmation() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const knowledgeAreas = [
    'Análise de Dados',
    'Comercial',
    'Comunicação e Marketing',
    'Finanças',
    'Gestão de Pessoas',
    'Gestão de Projetos',
    'Desenvolvimento de Lideranças',
    'Estratégia',
    'Jurídico',
    'Sustentabilidade',
  ]

  function selectArea(area: string) {
    if (selectedAreas.includes(area)) {
      setSelectedAreas((prevSelectedAreas) =>
        prevSelectedAreas.filter((selectedArea) => selectedArea !== area),
      )
      return
    }

    if (selectedAreas.length >= 3) {
      toast.error('Selecione no máximo 3 áreas!')
      return
    }

    setSelectedAreas((prevSelectedAreas) => [...prevSelectedAreas, area])
  }

  return (
    <div>
      <Header title="Confirmação" subtitle="Formulário de Inscrição">
        <span className="mr-24 flex-1 text-end font-semibold text-violet-600">
          5/5
        </span>
      </Header>
      <div className="mt-10 mb-20 grid justify-center">
        <h2 className="text-center">
          Ufa! Chegamos na última etapa! Agora, escolha{' '}
          <strong>até 3 áreas</strong> do conhecimento <br /> com as quais você
          pode contribuir para a organização mentorada:
        </h2>

        <div className="mt-14 grid grid-cols-2 items-center justify-between gap-y-10 gap-x-28">
          {knowledgeAreas.map((knowledge) => (
            <Input.CheckBox
              isLineThrough
              checked={selectedAreas.includes(knowledge)}
              onChangeChecked={() => selectArea(knowledge)}
              key={knowledge}
              content={knowledge}
            />
          ))}
        </div>

        <Button.Primary className="mx-auto mt-20 max-w-max py-3 px-32">
          Enviar inscrição
        </Button.Primary>
      </div>

      <Button.ArrowLeft />

      <ToastContainer autoClose={2000} limit={3} />
    </div>
  )
}
