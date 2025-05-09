import Image from 'next/image'
import { X } from 'phosphor-react'
import SingleSelectComboBox from '../../../combobox/SingleSelectComboBox'
import { Button } from '../../../Button/ButtonSubmit'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Option } from '../../../../types/MultiselectCombobox'
import { SectorProps } from '../../../../types/sector'
import { invokeLambda } from '../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { EditButton } from '../../../Button/EditButton'
import { useQueryClient } from '@tanstack/react-query'
import TextAreaField from '../../../Input/TextAreaField'
import { textAreaSchema } from '../../../../utils/ValidationSchemas'

const options = [
  { value: '1', label: '1 - Não precisa' },
  { value: '2', label: '2 - Pouco' },
  { value: '3', label: '3 - Médio' },
  { value: '4', label: '4 - Muito' },
  { value: '5', label: '5 - Urgentemente' },
]

const schema = z.object({
  ranking: z.string().min(1, 'Selecione um valor.'),
  currentlyWorking: textAreaSchema,
  effectiveness: textAreaSchema,
})

type FormProps = z.infer<typeof schema>

interface SectorFormProps {
  closeModal: () => void
  isFilled: boolean
  name: string
  image: string
  sector?: Option
  socialOrganizationId?: number
  organizationSector?: SectorProps
}

export const SectorForm = ({
  closeModal,
  isFilled,
  name,
  image,
  sector,
  socialOrganizationId,
  organizationSector,
}: SectorFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(!isFilled)
  const [selectedHowMuch, setSelectedHowMuch] = useState<{
    value: string
    label: string
  } | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (organizationSector !== undefined) {
      setValue('ranking', String(organizationSector.ranking || ''))
      setValue('currentlyWorking', organizationSector.currentlyWorking || '')
      setSelectedHowMuch(
        options.find(
          (item) => item.value === String(organizationSector.ranking || '')
        ) || { value: String(organizationSector.ranking || ''), label: '' }
      )
      setValue('effectiveness', organizationSector.effectiveness || '')
    }
  }, [organizationSector])

  const ranking = watch('ranking')
  const currentlyWorking = watch('currentlyWorking')
  const effectiveness = watch('effectiveness')

  useEffect(() => {
    const checkInput = () => {
      if (
        ranking &&
        currentlyWorking.length >= 100 &&
        effectiveness.length >= 100
      ) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInput()
  }, [ranking, currentlyWorking, effectiveness])

  const handleChange = (selected: { value: string; label: string } | null) => {
    setSelectedHowMuch(selected)

    if (selected) {
      setValue('ranking', selected.value, { shouldValidate: true })
      clearErrors('ranking')
    } else {
      setError('ranking', { type: 'manual', message: 'Selecione um valor.' })
    }
  }

  async function onSubmit(data: FormProps) {
    try {
      const payload = {
        id:
          organizationSector === undefined ? null : organizationSector.id || 0,
        sectorId: Number(sector?.value || 0),
        socialOrganizationId: socialOrganizationId || 0,
        ranking: Number(data.ranking),
        currentlyWorking: data.currentlyWorking,
        effectiveness: data.effectiveness,
      }

      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-sector-upsert-lambda', payload)
      if (response.statusCode == 201) {
        queryClient.invalidateQueries([
          'socialOrganization',
          socialOrganizationId,
        ])
        toast.success('Informações salvas com sucesso!')
      } else {
        toast.error('Erro ao salvar informações!')
      }
    } catch (error) {
      toast.error('Erro ao salvar informações!')
    } finally {
      closeModal()
    }
  }

  return (
    <section className="fixed left-0 top-0 z-[50] flex h-screen w-full items-center justify-center bg-black/50">
      <section className="flex h-[669px] w-[720px] flex-col overflow-y-scroll rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              width={50}
              height={50}
              src={image}
              alt={`Ícone de ${name}`}
            />
            <h1 className="text-3xl font-semibold">{name}</h1>
            {!isEditing && (
              <div className="ml-6">
                <EditButton
                  text="Editar"
                  onClick={() => setIsEditing(true)}
                  type="submit"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={closeModal}>
              <X size={24} />
            </button>
          </div>
        </div>

        {!isEditing ? (
          <div className="mt-10 space-y-6">
            <div className="text-left">
              <h5 className="text-gray-500">
                O quanto a instituição considera que a área de {name} precisa
                ser trabalhada?
              </h5>
              <p>{selectedHowMuch?.label}</p>
            </div>

            <div className="text-left">
              <h5 className="text-gray-500">
                Como é feito {name} na instituição hoje?
              </h5>
              <p className="whitespace-pre-line text-gray-800">
                {organizationSector?.currentlyWorking}
              </p>
            </div>

            <div className="text-left">
              <h5 className="text-gray-500">
                O que pode melhorar na área de {name} da organização?
              </h5>
              <p className="whitespace-pre-line text-gray-800">
                {organizationSector?.effectiveness}
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 overflow-y-scroll"
          >
            <SingleSelectComboBox
              instanceId="ranking"
              label={`O quanto a instituição considera que a área ${name} precisa ser trabalhada?`}
              options={options}
              onChange={handleChange}
              value={selectedHowMuch}
            />

            <TextAreaField
              label={`Como é feito ${name} na instituição hoje?`}
              name="currentlyWorking"
              value={currentlyWorking}
              placeholder="Digite aqui"
              register={register}
              rows={6}
              error={errors.currentlyWorking?.message}
            />

            <TextAreaField
              label={`O que pode melhorar na área ${name} da organização?`}
              name="effectiveness"
              value={effectiveness}
              placeholder="Digite aqui"
              register={register}
              rows={6}
              error={errors.effectiveness?.message}
            />

            <div className="w-[250px]">
              <Button
                text="Salvar Informações"
                disabled={isDisabled}
                type="submit"
              />
            </div>
          </form>
        )}
      </section>
    </section>
  )
}
