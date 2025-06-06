import Image from 'next/image'
import { X } from 'phosphor-react'
import SingleSelectComboBox from '../../../combobox/SingleSelectComboBox'
import { Button } from '../../../Button/ButtonSubmit'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { EditButton } from '../../../Button/EditButton'
import TextAreaField from '../../../Input/TextAreaField'
import { textAreaSchema } from '../../../../utils/ValidationSchemas'
import { MentorshipSectorProps } from '../../../../types/mentorshipSector'

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

interface SectorFormMentorshipProps {
  closeModal: () => void
  onSave: (mentorshipSector: MentorshipSectorProps) => void
  isFilled: boolean
  isInformationSend: boolean
  name: string
  image: string
  sectorData: {
    sectorId: number
    sector: string
  }
  mentorshipSector?: MentorshipSectorProps
}

export const SectorFormMentorship = ({
  closeModal,
  onSave,
  isFilled,
  isInformationSend,
  name,
  image,
  sectorData,
  mentorshipSector,
}: SectorFormMentorshipProps) => {
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

  useEffect(() => {
    if (mentorshipSector !== undefined) {
      setValue('ranking', String(mentorshipSector.ranking || ''))
      setValue('currentlyWorking', mentorshipSector.currentlyWorking || '')
      setSelectedHowMuch(
        options.find(
          (item) => item.value === String(mentorshipSector.ranking || '')
        ) || { value: String(mentorshipSector.ranking || ''), label: '' }
      )
      setValue('effectiveness', mentorshipSector.effectiveness || '')
    }
  }, [mentorshipSector])

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
    const payload = {
      id: mentorshipSector?.id,
      sectorId: sectorData.sectorId,
      sector: sectorData.sector,
      mentorshipSocialOrganizationId:
        mentorshipSector?.mentorshipSocialOrganizationId,
      ranking: Number(data.ranking || '0'),
      currentlyWorking: data.currentlyWorking || '',
      effectiveness: data.effectiveness || '',
    }
    closeModal()
    onSave(payload)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <section className="flex h-screen w-full items-center justify-center">
        <section
          className="flex max-h-[80vh] max-w-md flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Image
                width={50}
                height={50}
                src={image}
                alt={`Ícone de ${name}`}
              />
              <h1 className="text-3xl font-semibold">{name}</h1>
              {!isEditing && !isInformationSend && (
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
                  Como a área de {name} funciona na instituição hoje?
                </h5>
                <p className="whitespace-pre-line break-words text-gray-800">
                  {mentorshipSector?.currentlyWorking}
                </p>
              </div>

              <div className="text-left">
                <h5 className="text-gray-500">
                  O que pode melhorar na área de {name} da organização?
                </h5>
                <p className="whitespace-pre-line break-words text-gray-800">
                  {mentorshipSector?.effectiveness}
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <SingleSelectComboBox
                instanceId="ranking"
                label={`O quanto a instituição considera que a área de ${name} precisa ser trabalhada?`}
                options={options}
                onChange={handleChange}
                value={selectedHowMuch}
              />

              <TextAreaField
                label={`Como a área de ${name} funciona na instituição hoje?`}
                name="currentlyWorking"
                value={currentlyWorking}
                placeholder="Digite aqui"
                register={register}
                rows={6}
                error={errors.currentlyWorking?.message}
              />

              <TextAreaField
                label={`O que pode melhorar na área de ${name} da organização?`}
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
    </div>
  )
}
