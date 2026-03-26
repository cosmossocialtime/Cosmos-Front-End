import { useEffect, useState } from 'react'
import ProgressBar from '../../../../../components/menu/ProgressBar'
import { Button } from '../../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import { nameSchema, phoneSchema } from '../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import Router from 'next/router'
import InputField from '../../../../../components/Input/InputField'
import MaskedInputField from '../../../../../components/Input/MaskedInputField'
import StaticHeader from '../../../../../components/instituition/StaticHeader'
import { Option } from '../../../../../types/MultiselectCombobox'
import SingleSelectComboBox from '../../../../../components/combobox/SingleSelectComboBox'
import { useOnboardingInstitution } from '../../../../../context/OnboardingInstituionProvider'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { api } from '../../../../../services/api'

const steps = [
  { id: 1, label: 'Cadastro inicial' },
  { id: 2, label: 'Sobre a organização' },
  { id: 3, label: 'Sobre você' },
]

const schema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  professionalRole: z
    .string()
    .nonempty('O campo Seu cargo na organização é obrigatório'),
  professionalSector: z
    .string()
    .nonempty('O campo Área de Trabalho é obrigatório'),
})

type formProps = z.infer<typeof schema>

export default function AboutYouForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(3)
  const [isDisabled, setIsDisabled] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string>('')

  const {
    user,
    onboardingMember,
    changeUser,
    saveOnboarding,
    saveOnboardingMember,
    setOnboardingMember,
  } = useOnboardingInstitution()

  const searchParams = useSearchParams()
  const isMember = searchParams.get('member')
  const organizationId = searchParams.get('socialOrganizationId')

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  async function getUser() {
    const response = await api.get('/user')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Erro ao buscar informações')
    }
  }

  async function getSectors() {
    try {
      const response = await api.get('/social-organization/sectors')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar setores!')
      throw error
    }
  }

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  })

  const { data: usuario } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: isMember !== null,
  })

  useEffect(() => {
    if (isMember !== null && usuario) {
      setValue('fullName', usuario.fullName || '')
      setValue('phone', usuario.phone || '')
      setOnboardingMember(true)
    }
  }, [isMember, usuario, setValue, setOnboardingMember])

  useEffect(() => {
    const savedData = getValues()
    setIsDisabled(!isValid)
    if (isValid) {
      setValue('fullName', savedData.fullName)
      setValue('phone', savedData.phone)
      setValue('professionalSector', savedData.professionalSector)
      setValue('professionalRole', savedData.professionalRole)
      changeUser({
        fullName: savedData.fullName,
        phone: savedData.phone,
        professionalRole: savedData.professionalRole,
        professionalSector: savedData.professionalSector,
      })
    }
  }, [
    watch('fullName'),
    watch('professionalRole'),
    selectedOption,
    setValue,
    isValid,
  ])

  useEffect(() => {
    if (!isMember && user !== null) {
      setValue('fullName', user.fullName || '')
      setValue('phone', user.phone || '')
      setSelectedOption(user.professionalSector || '')
      setValue('professionalSector', user.professionalSector || '')
      setValue('professionalRole', user.professionalRole || '')
    }
  }, [user, isMember, setValue])

  const handleChange = (selected: Option | null) => {
    if (selected !== null) {
      setSelectedOption(selected.label)
    }
    setValue('professionalSector', selected?.label || '', {
      shouldValidate: true,
    })
  }

  async function handleForm(data: formProps) {
    setIsLoading(true)
    try {
      if (onboardingMember) {
        saveOnboardingMember(Number(organizationId || '0'), {
          fullName: data.fullName,
          phone: data.phone,
          professionalSector: selectedOption,
          professionalRole: data.professionalRole,
        })
      } else {
        saveOnboarding({
          fullName: data.fullName,
          phone: data.phone,
          professionalSector: selectedOption,
          professionalRole: data.professionalRole,
        })
      }
    } catch (error) {
      toast.error('Erro ao criar organização, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <StaticHeader />
      <main className="mt-[32px] flex w-full flex-col items-center px-4">
        <div className="mb-4 w-[650px]">
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            onBack={
              onboardingMember
                ? undefined
                : () =>
                    Router.push(
                      '/institutions/socialOrganization/register/aboutOrganization'
                    )
            }
          />
        </div>

        <div className="w-[384px] p-6">
          <form
            onSubmit={handleSubmit(handleForm, (formErrors) => {
              console.error('ERROS DE VALIDAÇÃO:', formErrors)
            })}
            className="flex flex-col gap-4"
          >
            <InputField
              className={`${errors.fullName ? 'border-red-500' : ''}`}
              label="Seu nome"
              name="fullName"
              placeholder="Ex: Maria Gomes"
              register={register}
              error={errors.fullName?.message}
            />

            <MaskedInputField
              className={`${errors.phone ? 'border-red-500' : ''}`}
              label="Celular"
              name="phone"
              placeholder="Ex:(00) 00000-0000"
              register={register}
              setValue={setValue}
              error={errors.phone?.message}
            />

            <SingleSelectComboBox
              options={sectors}
              onChange={handleChange}
              value={{ value: selectedOption, label: selectedOption }}
              label="Área de Trabalho"
            />
            {errors.professionalSector && (
              <p className="mt-1 text-sm text-red-500">
                {errors.professionalSector.message}
              </p>
            )}

            <InputField
              className={`${errors.professionalRole ? 'border-red-500' : ''}`}
              label="Seu cargo na organização"
              name="professionalRole"
              placeholder="Ex: Analista financeiro"
              register={register}
              error={errors.professionalRole?.message}
            />

            <Button
              text={isLoading ? 'Carregando...' : 'Finalizar'}
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
