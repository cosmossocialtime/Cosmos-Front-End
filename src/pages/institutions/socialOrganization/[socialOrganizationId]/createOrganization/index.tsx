import { ArrowLeft } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  createMultiSelectSchema,
  nameSchema,
} from '../../../../../utils/ValidationSchemas'
import InputField from '../../../../../components/Input/InputField'
import MultiSelectComboBox from '../../../../../components/combobox/MultiSelectComboBox'
import SingleSelectComboBox from '../../../../../components/combobox/SingleSelectComboBox'
import { Button } from '../../../../../components/Button/ButtonSubmit'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MultiValue } from 'react-select'
import { Option } from '../../../../../types/MultiselectCombobox'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { useHeader } from '../../../../../context/HeaderContext'
import DynamicHeader from '../../../../../components/header/DynamicHeader'

const schema = z.object({
  name: z.string().nonempty(),
  causes: createMultiSelectSchema(1, 3),
  professionalRole: nameSchema,
  professionalSector: nameSchema,
})

type formProps = z.infer<typeof schema>

export default function CreateOrganization() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [selectedCause, setSelectedCause] = useState<MultiValue<Option>>(
    [] as MultiValue<Option>
  )
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const queryClient = useQueryClient()

  const {
    setShowMenu,
    setShowOrganization,
    setRoutes,
    setOrganizationName,
    setSocialOrganizationId,
    setUserName,
  } = useHeader()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    trigger,
    getValues,
    formState: { errors, isValid },
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

  async function getSectors() {
    try {
      const response = await invokeLambda<
        Record<string, never>,
        { statusCode: number; body: string }
      >('sector-select-lambda', {})
      return JSON.parse(response.body)
    } catch (error) {
      console.error('Erro ao buscar setores!')
      throw error
    }
  }

  useEffect(() => {
    setShowMenu(false)
    setShowOrganization(false)
  }, [])

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  })

  const handleChangeCause = (selected: MultiValue<Option>) => {
    setSelectedCause(selected)
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

  const handleChangeSector = (selected: Option | null) => {
    if (selected !== null) {
      setSelectedSector(selected.label)
    }
    setValue('professionalSector', selected?.label || '', {
      shouldValidate: true,
    })
  }

  useEffect(() => {
    const savedData = getValues()
    setIsDisabled(!isValid && !(selectedCause.length >= 1))
    if (isValid) {
      setValue('name', savedData.name)
      setValue('professionalSector', savedData.professionalSector)
      setValue('professionalRole', savedData.professionalRole)
    }
  }, [
    watch('name'),
    selectedCause,
    selectedSector,
    watch('professionalRole'),
    setValue,
    isValid,
  ])

  async function handleForm(data: formProps) {
    try {
      const causas: number[] =
        data.causes.selectedOptions.map((c) => {
          return Number(c.value)
        }) || []
      const payload = {
        socialOrganizationName: data.name,
        causes: causas,
        professionalSector: selectedSector,
        professionalRole: data.professionalRole,
      }

      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-create-lambda', payload)

      if (response.statusCode == 201) {
        const parsed = JSON.parse(response.body)
        toast.success('Organização criada com sucesso')
        setShowMenu(true)
        setShowOrganization(true)
        setRoutes([
          {
            label: 'Painel Principal',
            href: `/institutions/socialOrganization/${parsed.socialOrganizationId}/home`,
          },
          {
            label: 'Equipe',
            href: `/institutions/socialOrganization/${parsed.socialOrganizationId}/team`,
          },
          {
            label: 'Sistema Estelar',
            href: `/institutions/socialOrganization/${parsed.socialOrganizationId}/starSystem`,
          },
          {
            label: 'Trocar de organização',
            href: `/institutions/socialOrganization/${parsed.socialOrganizationId}/changeOrganization`,
          },
        ])
        setUserName(parsed.userName)
        setOrganizationName(data.name)
        setSocialOrganizationId(parsed.socialOrganizationId)
        await queryClient.invalidateQueries(['user'])
        await queryClient.refetchQueries(['user'])
        router.push(
          `/institutions/socialOrganization/${parsed.socialOrganizationId}/changeOrganization`
        )
      } else {
        toast.error('Erro ao salvar as informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar as informações!')
      throw error
    }
  }

  return (
    <section>
      <DynamicHeader />

      <div className="mt-10 p-3">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => {
            setShowMenu(true)
            setShowOrganization(true)
            router.push(
              `/institutions/socialOrganization/${organizationId}/changeOrganization`
            )
          }}
          size={30}
        />
      </div>

      <section className="flex w-full items-center justify-center">
        <section>
          <h1 className="mb-5 text-center text-xl">
            Crie uma nova organização
          </h1>

          <form
            onSubmit={handleSubmit(handleForm)}
            className="flex max-w-[500px] flex-col gap-5"
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
              value={selectedCause}
              onChange={handleChangeCause}
              label="Causa(s) em que atua (até 3)"
              error={errors.causes?.message}
            />

            <SingleSelectComboBox
              options={sectors}
              onChange={handleChangeSector}
              value={{ value: selectedSector, label: selectedSector }}
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

            <div className="max-w-[240px]">
              <Button
                text={isLoading ? 'Carregando...' : 'Criar organização'}
                disabled={isDisabled || isLoading}
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
        </section>
      </section>
    </section>
  )
}
