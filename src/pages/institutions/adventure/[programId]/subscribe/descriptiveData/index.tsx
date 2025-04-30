import { useForm } from 'react-hook-form'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useEffect, useState } from 'react'
import { textAreaSchema } from '../../../../../../utils/ValidationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TextAreaField from '../../../../../../components/Input/TextAreaField'
import Layout from '../../../../../../components/Layout'
import ProgressBar from '../../../../../../components/menu/ProgressBar'
import Router from 'next/router'
import { useOnboardingInstitution } from '../../../../../../context/OnboardingInstituionProvider'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

const schema = z.object({
  history: textAreaSchema,
  impact: textAreaSchema,
  challenges: textAreaSchema,
  support: textAreaSchema,
})

type formProps = z.infer<typeof schema>
const programName = 'Cosmos Social'

export default function DescriptiveData() {
  const [currentStep, setCurrentStep] = useState(4)
  const {
    program,
    mentorshipApplicant,
    socialOrganization,
    changeSocialOrganization,
    changeMentorshipApplicant,
  } = useOnboardingInstitution()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const history = watch('history', '')
  const impact = watch('impact', '')
  const challenges = watch('challenges', '')
  const support = watch('support', '')

  useEffect(() => {
    const checkInput = () => {
      if (
        history.length >= 100 &&
        impact.length >= 100 &&
        challenges.length >= 100 &&
        support.length >= 100
      ) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }

    checkInput()
  }, [history, impact, challenges, support])

  useEffect(() => {
    if (socialOrganization !== null) {
      setValue('history', socialOrganization.history || '')
      setValue('impact', socialOrganization.socialImpact || '')
      setValue('challenges', socialOrganization.mainChallenges || '')
      setValue('support', mentorshipApplicant?.programHelpInOrganization || '')
    }
  }, [socialOrganization, mentorshipApplicant])

  function handleForm(data: any) {
    if (socialOrganization !== null) {
      const updatedSocialOrganization = { ...socialOrganization }
      updatedSocialOrganization.history = data.history
      updatedSocialOrganization.socialImpact = data.impact
      updatedSocialOrganization.mainChallenges = data.challenges
      changeSocialOrganization(updatedSocialOrganization)
    }
    if (mentorshipApplicant !== null) {
      const updatedMentorshipApplicant = { ...mentorshipApplicant }
      updatedMentorshipApplicant.programHelpInOrganization = data.support
      changeMentorshipApplicant(updatedMentorshipApplicant)
    }
    setIsLoading(true)
    Router.push(`/institutions/adventure/${program?.id}/subscribe/finalization`)
    setIsLoading(false)
  }

  return (
    <Layout>
      <div className="mb-4 w-[1016px]">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onBack={() =>
            Router.push(
              `/institutions/adventure/${program?.id}/subscribe/aboutInstitution`
            )
          }
        />
      </div>
      <div className="w-[890px] p-6">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="flex flex-col gap-4"
        >
          <TextAreaField
            label="Escreva brevemente a história da instituição?"
            name="history"
            placeholder="Digite aqui"
            value={history}
            register={register}
            error={errors.history?.message}
          />
          <TextAreaField
            label="Qual a atuação e o impacto da organização?"
            name="impact"
            placeholder="Digite aqui"
            value={impact}
            register={register}
            error={errors.impact?.message}
          />
          <TextAreaField
            label="Quais são as principais necessidades e desafios que a sua organização enfrenta no momento?"
            name="challenges"
            value={challenges}
            placeholder="Digite aqui"
            register={register}
            error={errors.challenges?.message}
          />
          <TextAreaField
            label="Como você acredita que o programa [Nome do programa] poderá apoiar a sua organização?"
            name="support"
            value={support}
            placeholder="Digite aqui"
            register={register}
            dynamicLabel={program?.name}
            error={errors.support?.message}
          />
          <div className="w-[248px] px-4">
            <Button
              text="Continuar"
              disabled={isDisabled}
              type="submit"
              isLoading={true}
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}
