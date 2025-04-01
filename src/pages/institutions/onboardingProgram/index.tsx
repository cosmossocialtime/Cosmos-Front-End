import { useState } from 'react'
import ProgressBar from '../../../components/menu/ProgressBar'
import { TermsPage } from './_components/terms'
import DynamicHeader from '../../../components/main-painel/DynamicHeader'
import { FocalPoint } from './_components/focalPoint'
import { AboutInstitution } from './_components/aboutInstitution'
import { DescriptiveData } from './_components/descriptiveData'
import { Finalization } from './_components/finalization'

const steps = [
  { id: 1, label: 'Termos' },
  { id: 2, label: 'Ponto focal' },
  { id: 3, label: 'Sobre a instituição' },
  { id: 4, label: 'Dados Descritivos' },
  { id: 5, label: 'Finalização' },
]

export default function OnboardinProgramPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const nextPage = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const backPage = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <DynamicHeader />

      <section className="mt-10">
        <section>
          <ProgressBar
            onBack={backPage}
            currentStep={currentStep}
            steps={steps}
          />
        </section>

        <section className="flex w-full flex-col items-center justify-center">
          {currentStep === 1 && <TermsPage nextPage={nextPage} />}
          {currentStep === 2 && <FocalPoint nextPage={nextPage} />}
          {currentStep === 3 && <AboutInstitution nextPage={nextPage} />}
          {currentStep === 4 && <DescriptiveData nextPage={nextPage} />}
          {currentStep === 5 && <Finalization />}
        </section>
      </section>
    </section>
  )
}
