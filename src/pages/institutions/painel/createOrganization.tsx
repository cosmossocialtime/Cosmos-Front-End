import Image from 'next/image'
import Logo from '../../../../public/images/logotipoCosmos.svg'
import { ArrowLeft } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createMultiSelectSchema } from '../../../utils/ValidationSchemas'
import InputField from '../../../components/Input/InputField'
import MultiSelectComboBox from '../../../components/combobox/MultiSelectComboBox'
import SingleSelectComboBox from '../../../components/combobox/SingleSelectComboBox'
import { Button } from '../../../components/Button/ButtonSubmit'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const options = [
  { value: 'acessibilidade', label: 'Acessibilidade e Inclusão de PcDs' },
  { value: 'cultura', label: 'Acesso à Cultura' },
  { value: 'educacao', label: 'Acesso à Educação' },
  { value: 'esporte', label: 'Acesso ao Esporte' },
  { value: 'moradia', label: 'Acesso à Moradia' },
  { value: 'saude', label: 'Acesso à Saúde' },
  { value: 'pobreza', label: 'Combate à Pobreza' },
  { value: 'violencia_domestica', label: 'Combate à Violência Doméstica' },
  { value: 'trafico', label: 'Combate ao Tráfico de Pessoas' },
  { value: 'criancas', label: 'Direitos das Crianças e Adolescentes' },
  { value: 'animais', label: 'Direitos dos Animais' },
  { value: 'idosos', label: 'Direitos dos Idosos' },
  { value: 'indigenas', label: 'Direitos dos Povos Indígenas' },
  { value: 'humanos', label: 'Direitos Humanos' },
  { value: 'lgbtqia', label: 'Direitos LGBTQIA+' },
  { value: 'genero', label: 'Equidade de Gênero' },
  { value: 'justica', label: 'Justiça Econômica e Tributária' },
  { value: 'racial', label: 'Justiça Racial' },
  { value: 'sustentabilidade', label: 'Meio Ambiente e Sustentabilidade' },
  { value: 'seguranca_alimentar', label: 'Segurança Alimentar' },
  { value: 'outra', label: 'Outra' },
]

const schema = z.object({
  name_organization: z.string().nonempty(),
  causes: createMultiSelectSchema(1, 3),
  work_area: z.string(),
  position: z.string(),
})

type formProps = z.infer<typeof schema>

export default function CreateOrganization() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<formProps>({ resolver: zodResolver(schema), mode: 'onChange' })
  const [isDisabled, setIsDisabled] = useState(true)

  const router = useRouter()

  const [causes, setCauses] = useState<string[] | null>(null)
  const [workArea, setWorkArea] = useState<string | null>(null)
  const nameorganizationW = watch('name_organization')
  const positionW = watch('position')

  useEffect(() => {
    const checkInputs = () => {
      if (causes && workArea && nameorganizationW && positionW) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    console.log(causes, workArea, nameorganizationW, positionW)

    checkInputs()
  }, [causes, workArea, nameorganizationW, positionW])

  const handleForm = (data: formProps) => {
    console.log(handleForm)
  }

  return (
    <section className="p-3">
      <header>
        <Image width={120} height={120} src={Logo} alt="" />
      </header>

      <div className="mt-10">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.back()}
          size={30}
        />
      </div>

      <section className="flex w-full items-center justify-center">
        <section>
          <h1 className="mb-5 text-center text-2xl">
            Crie uma nova organização
          </h1>

          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex max-w-[500px] flex-col gap-5"
          >
            <InputField
              className={`${errors.name_organization ? 'border-red-500' : ''}`}
              label="Nome da organização"
              name="name_organization"
              placeholder="Ex: Amigos da Cosmos"
              register={register}
              error={errors.name_organization?.message}
            />

            <MultiSelectComboBox
              onChange={(e) => setCauses(e.map((e) => e.value))}
              options={options}
              maxSelections={3}
              label="Causa(s) em que atua (até 3)"
              error={errors.causes?.message}
              // {errors.cause && <p className="text-red-500 text-sm mt-1">{errors.cause.message}</p>}
            />

            <SingleSelectComboBox
              options={options}
              onChange={(e) => setWorkArea(e?.value || `Sem valor`)}
              label="Área de trabalho"
            />

            <InputField
              className={`${errors.name_organization ? 'border-red-500' : ''}`}
              label="Seu cargo na organização"
              name="position"
              placeholder="Ex.: Analista financeiro"
              register={register}
              error={errors.position?.message}
            />

            <div className="max-w-[240px]">
              <Button
                text="Criar Organização"
                disabled={isDisabled}
                type="submit"
              />
            </div>
          </form>
        </section>
      </section>
    </section>
  )
}
