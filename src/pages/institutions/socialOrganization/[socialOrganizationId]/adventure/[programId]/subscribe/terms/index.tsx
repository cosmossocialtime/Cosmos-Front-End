import { useEffect, useState } from 'react'
import { Button } from '../../../../../../../../components/Button/ButtonSubmit'
import { CustomCheckbox } from '../../../../../../../../components/Input/CustomCheckbox'
import { TermsText } from '../../../../../../../../components/TitlesAndLinks/TermsText'
import ProgressBar from '../../../../../../../../components/menu/ProgressBar'
import Layout from '../../../../../../../../components/Layout'
import { useOnboardingInstitution } from '../../../../../../../../context/OnboardingInstituionProvider'
import Router from 'next/router'
import DynamicHeader from '../../../../../../../../components/header/DynamicHeader'
import { useHeader } from '../../../../../../../../context/HeaderContext'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

export default function TermsPage() {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const {
    program,
    socialOrganization,
    mentorshipApplicant,
    changeMentorshipApplicant,
  } = useOnboardingInstitution()
  const { setShowMenu, setShowOrganization } = useHeader()

  useEffect(() => {
    setShowMenu(false)
    setShowOrganization(false)
    if (mentorshipApplicant !== null && mentorshipApplicant.agreedConditions) {
      setAcceptTerms(true)
    } else {
      setAcceptTerms(false)
    }
  }, [])

  const handleAcceptTerms = (value: boolean) => {
    setAcceptTerms(value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (mentorshipApplicant !== null) {
      mentorshipApplicant.agreedConditions = acceptTerms
      mentorshipApplicant.socialOrganizationId = socialOrganization?.id || 0
      changeMentorshipApplicant(mentorshipApplicant)
    } else {
      changeMentorshipApplicant({
        programId: Number(program?.id || 0),
        socialOrganizationId: socialOrganization?.id || 0,
        agreedConditions: acceptTerms,
      })
    }
    if (acceptTerms) {
      Router.push(
        `/institutions/socialOrganization/${
          socialOrganization?.id || 0
        }/adventure/${program?.id || 0}/subscribe/focalPoint`
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex min-h-screen w-full flex-col">
        <DynamicHeader />
        <main className="mt-[32px] flex w-full flex-col items-center px-4">
          <div className="mb-4 w-[70vw]">
            <ProgressBar
              steps={steps}
              currentStep={1}
              backFirstPage={true}
              onBack={() =>
                Router.push(
                  `/institutions/socialOrganization/${
                    socialOrganization?.id || 0
                  }/adventure/${program?.id || 0}/subscribe`
                )
              }
            />

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col items-start gap-6"
            >
              <TermsText
                title="Coloque seu capacete, ajuste seu traje e prepare-se para uma aventura!"
                paragraphs={[
                  'Precisamos de mais algumas informações para te inscrever nessa aventura.',
                  'É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com a organização do programa e empresa parceira.',
                ]}
                linkText="Termo de Consentimento ao Tratamento de Dados"
                linkHref="#"
              />
              <div className="flex items-center pt-12">
                <div className="mr-4">
                  <CustomCheckbox
                    id="acceptTerms"
                    checked={acceptTerms}
                    setChecked={handleAcceptTerms}
                    labelText="Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas"
                  />
                </div>
              </div>

              <div className="w-[248px] pt-[12px]">
                <Button
                  text="Embarcar nesta jornada"
                  disabled={!acceptTerms}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
