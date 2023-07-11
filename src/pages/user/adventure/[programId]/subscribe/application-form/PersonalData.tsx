import { useState } from 'react'
import { Input } from '../../../../../components/Input'

export function PersonalData() {
  const timeExperienceOpts = [
    'Menos de 2 anos',
    'Entre 2 e 5 anos',
    'Entre 5 e 10 anos',
    'Mais de 10 anos',
  ]
  const timesAvaiable = [
    'Menos de 2 horas por mês',
    '2 horas por mês',
    '4 horas por mês',
    '8 horas por mês',
    'Mais de 8 horas por mês',
  ]

  const [selectedTimeExp, setselectedTimeExp] = useState('')
  const [selectedTimeAvaiable, setSelectedTimeAvaiable] = useState('')

  return (
    <form className="mx-auto mt-14 flex w-[29rem] flex-col gap-10 text-gray-800">
      <Input.Root ariaLabel="Quanto tempo de experiência profissional você possui?">
        <Input.Select
          placeholder="Opções"
          items={timeExperienceOpts}
          option={selectedTimeExp}
          changeOption={setselectedTimeExp}
        />
      </Input.Root>

      <Input.Root
        ariaLabel="Em que cargo e em que setor você atua?"
        className="gap-4"
      >
        <Input.Content type="text" placeholder="Cargo" className="w-1/2" />
        <Input.Content type="text" placeholder="Setor" className="w-1/2" />
      </Input.Root>

      <Input.Root ariaLabel="Quanto tempo você tem disponível para o programada?">
        <Input.Select
          placeholder="Opções"
          items={timesAvaiable}
          option={selectedTimeAvaiable}
          changeOption={setSelectedTimeAvaiable}
        />
      </Input.Root>

      <Input.Root ariaLabel="Link para o LinkedIn (opcional)">
        <Input.Content
          type="text"
          placeholder="https://linkedin.com/in/usuario"
        />
      </Input.Root>
    </form>
  )
}
