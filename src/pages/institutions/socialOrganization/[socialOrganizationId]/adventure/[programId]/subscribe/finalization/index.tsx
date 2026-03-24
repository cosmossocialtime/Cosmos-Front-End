import { useEffect, useState } from 'react'
import { Button } from '../../../../../../../../components/Button/ButtonSubmit'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { getFormData } from '../../../../../../../../utils/localStorage'
import SingleSelectComboBox from '../../../../../../../../components/combobox/SingleSelectComboBox'
import { Option } from '../../../../../../../../types/MultiselectCombobox'
import { useQuery } from '@tanstack/react-query'
import ProgressBar from '../../../../../../../../components/menu/ProgressBar'
import Layout from '../../../../../../../../components/Layout'
import Router from 'next/router'
import { useOnboardingInstitution } from '../../../../../../../../context/OnboardingInstituionProvider'
import { api } from '../../../../../../../../services/api'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

const schema = z.object({
  como_soube: z.string().nonempty('Este campo é obrigatório'),
})

type formProps = z.infer<typeof schema>

export default function Finalization() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(5)
  const {
    program,
    mentorshipApplicant,
    socialOrganization,
    changeMentorshipApplicant,
    saveMentorshipApplicant,
  } = useOnboardingInstitution()
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  async function getHowToHearAboutOrganization() {
    try {
      const response = await api.get('how-hear-about-organization-select')
      return JSON.parse(response.data.body)
    } catch (error) {
      console.error('Erro ao buscar opções!')
    }
  }

  const { data: abouts } = useQuery({
    queryKey: ['abouts'],
    queryFn: getHowToHearAboutOrganization,
  })

  useEffect(() => {
    const savedData = getFormData('finalization')

    if (savedData?.como_soube) {
      setSelectedOption(savedData.como_soube)
    }
  }, [setValue])

  const handleSelectChange = (
    selected: { value: string; label: string } | null
  ) => {
    setSelectedOption(selected)
    setValue('como_soube', selected?.value || '')
  }

  async function handleForm(data: formProps) {
    setIsLoading(true)
    try {
      if (mentorshipApplicant !== null) {
        mentorshipApplicant.howHearAboutProgramId = Number(data.como_soube)
        changeMentorshipApplicant(mentorshipApplicant)
        saveMentorshipApplicant(mentorshipApplicant)
      }
    } catch (error) {
      toast.error('Erro ao se inscrever no programa, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mb-4 w-[1017px]">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onBack={() =>
            Router.push(
              `/institutions/socialOrganization/${
                socialOrganization?.id || 0
              }/adventure/${program?.id}/subscribe/descriptiveData`
            )
          }
        />
      </div>
      <div className="w-[450px] p-6">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
        >
          <SingleSelectComboBox
            options={abouts}
            label="Como você ficou sabendo sobre o programa?"
            onChange={handleSelectChange}
            value={selectedOption}
          />
          {errors.como_soube && (
            <span className="text-sm text-red-500">
              {errors.como_soube.message}
            </span>
          )}

          <Button
            text={isLoading ? 'Carregando...' : 'Finalizar inscrição'}
            disabled={!selectedOption || isLoading}
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Layout>
  )
}
