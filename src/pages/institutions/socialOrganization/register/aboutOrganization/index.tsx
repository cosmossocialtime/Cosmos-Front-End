import { useEffect, useState } from 'react'
import ProgressBar from '../../../../../components/menu/ProgressBar'
import { Button } from '../../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import {
  createMultiSelectSchema,
  nameSchema,
} from '../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Router from 'next/router'
import MultiSelectComboBox from '../../../../../components/combobox/MultiSelectComboBox'
import { MultiValue } from 'react-select'
import { Option } from '../../../../../types/MultiselectCombobox'
import InputField from '../../../../../components/Input/InputField'
import StaticHeader from '../../../../../components/instituition/StaticHeader'
import { useOnboardingInstitution } from '../../../../../context/OnboardingInstituionProvider'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const steps = [
  { id: 1, label: 'Cadastro inicial' },
  { id: 2, label: 'Sobre a organização' },
  { id: 3, label: 'Sobre você' },
]

const schema = z.object({
  name: nameSchema,
  causes: createMultiSelectSchema(1, 3),
})

type formProps = z.infer<typeof schema>

export default function AboutOrganizationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep] = useState(2)
  const [isDisabled, setIsDisabled] = useState(true)
  const { socialOrganization, changeSocialOrganization } =
    useOnboardingInstitution()
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  async function getCauses() {
    try {
      const response = await invokeLambda<
        Record<string, never>,
        { statusCode: number; body: string }
      >('cause-select-lambda', {})
      return JSON.parse(response.body)
    } catch (error) {
      console.error('Erro ao buscar causas!')
      throw error
    }
  }

  const { data: causes } = useQuery({
    queryKey: ['causes'],
    queryFn: getCauses,
  })

  const handleChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected)
    setValue(
      'causes',
      { selectedOptions: [...selected] },
      { shouldValidate: true }
    )

    if (selected.length === 0) {
      setError('causes', {
        type: 'manual',
        message: 'Você precisa selecionar pelo menos 1 opção.',
      })
    } else {
      clearErrors('causes')
    }

    trigger('causes')
  }

  useEffect(() => {
    if (socialOrganization !== null) {
      setValue('name', socialOrganization.name)
      handleChange(socialOrganization.causes)
    }
  }, [socialOrganization])

  useEffect(() => {
    const nomePreenchido = watch('name')
    setIsDisabled(
      !(
        nomePreenchido &&
        nomePreenchido.length >= 2 &&
        selectedOptions.length >= 1
      )
    )
  }, [watch('name'), selectedOptions])

  async function handleForm(data: formProps) {
    changeSocialOrganization({
      name: data.name,
      causes: data.causes.selectedOptions,
    })
    Router.push({
      pathname: '/institutions/onboarding/aboutYou',
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <StaticHeader />
      <main className="mt-[32px] flex w-full flex-col items-center px-4">
        <div className="mb-4 w-[650px]">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="w-[384px] p-6">
          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex flex-col gap-4"
          >
            <InputField
              className={`${errors.name ? 'border-red-500' : ''}`}
              label="Nome da organização"
              name="name"
              placeholder="Ex: Amigos da Cosmos"
              register={register}
              error={errors.name?.message}
            />

            <MultiSelectComboBox
              options={causes}
              maxSelections={3}
              value={selectedOptions}
              onChange={handleChange}
              label="Causa(s) em que atua (até 3)"
              error={errors.causes?.message}
            />

            <Button
              text={isLoading ? 'Carregando...' : 'Continuar'}
              disabled={isDisabled || isLoading}
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </div>
      </main>
    </div>
  )
}
