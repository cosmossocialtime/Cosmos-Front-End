import { useState } from 'react'
import ProgressBar from '../../../menu/ProgressBar'
import { X } from 'phosphor-react'
import { AboutInstitutionModal } from '../../modal/ModalAboutInstitution'

interface FundraisingFormProps {
  closeModal: () => void
}

const steps = [
  { id: 1, label: 'Sobre a organização' },
  { id: 2, label: 'Dados descritivos' },
]

export const FundraisingForm = ({ closeModal }: FundraisingFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const continueBtn = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const backBtn = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const onBack = () => {
    if (currentStep === 1) {
      return null
    } else if (currentStep === 2) {
      backBtn()
    }
  }

  return (
    <section className="fixed left-0 top-0 z-[50] flex h-screen w-full items-center justify-center bg-black/50">
      <section className="flex h-[600px] w-[850px] flex-col items-center overflow-y-scroll  rounded-xl bg-white p-6 shadow-lg">
        <section className="flex items-center">
          <ProgressBar
            onBack={onBack}
            currentStep={currentStep}
            steps={steps}
          />
          <button onClick={closeModal} className="ml-10">
            <X size={22} />
          </button>
        </section>

        <AboutInstitutionModal
          currentStep={currentStep}
          continueBtn={continueBtn}
          backBtn={backBtn}
        />
      </section>
    </section>
  )
}
