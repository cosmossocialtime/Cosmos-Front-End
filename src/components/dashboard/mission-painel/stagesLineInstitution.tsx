import dayjs from 'dayjs'
import { MentorshipProps } from '../../../types/mentorship'
import { Check } from 'phosphor-react'
import { StepProps } from '../../../types/step'
import { stepsNamesInstitution } from './stepsNamesInstitution'
import { Button } from '../../Button/ButtonSubmit'

interface StagesLineInstitutionProps {
  currentMentorship: MentorshipProps
  openPopUp: (step: StepProps) => void
}

export function StagesLineInstitution({
  currentMentorship,
  openPopUp,
}: StagesLineInstitutionProps) {
  const steps = currentMentorship.steps
  const stepsLength = steps.length
  const completedSteps = currentMentorship.steps.filter((step) =>
    dayjs(step.endDate).isBefore(dayjs())
  )
  const completedStepsLength = completedSteps.length
  const currentStep = currentMentorship.steps.find(
    (step) =>
      dayjs(step.startDate).isBefore(dayjs()) &&
      dayjs(step.endDate).isAfter(dayjs())
  )
  const stepWidth = 100 / stepsLength
  const barGrayWidth = 100 - stepWidth
  const barCompletedWidth = completedStepsLength * stepWidth
  const marginBar = stepWidth / 2

  function setMessage(step: StepProps) {
    const now = dayjs()
    const startDate = dayjs(step.startDate)

    if (dayjs(step.endDate).isBefore(dayjs())) {
      return 'Ver instruções'
    }
    if (
      step === currentStep &&
      startDate.isBefore(now) &&
      dayjs(step.endDate).isAfter(dayjs())
    ) {
      return 'Etapa atual'
    }
    if (startDate == null) {
      return 'Data de disponibilidade não definida'
    }
    if (startDate.isBefore(now) && dayjs(step.endDate).isAfter(dayjs())) {
      return 'Já disponível'
    }
    if (startDate.isAfter(now)) {
      return `Disponível em ${startDate.format('DD/MM/YYYY')}`
    }

    throw new Error('Não foi possível definir uma mensagem para esta etapa.')
  }

  return (
    <>
      <div className="mx-auto mt-12">
        <div
          className="mt-2 grid"
          style={{
            gridTemplateColumns: `repeat(${stepsLength}, minmax(0, 1fr))`,
          }}
        >
          {steps.map((step, index) => {
            const stepName = stepsNamesInstitution.find(
              (s) => s.stepId === step.stepId
            )
            const isCompleted = dayjs(step.endDate).isBefore(dayjs())
            const isCurrent =
              currentStep === step &&
              dayjs(step.startDate).isBefore(dayjs()) &&
              dayjs(step.endDate).isAfter(dayjs())

            return (
              <div
                key={step.stepId}
                className="relative flex w-full flex-col items-center"
              >
                {/* Step Circle */}
                <div className="relative flex items-center justify-center">
                  {isCompleted ? (
                    <div className="rounded-full bg-gradient-to-l from-blue-500 to-purple-600 p-[2px]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-white">
                        <span className="relative inline-block">
                          <span
                            className="absolute inset-0 rounded bg-gradient-to-r from-blue-500 to-purple-600"
                            style={{
                              maskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><path fill='black' d='M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z'/></svg>")`,
                              WebkitMaskImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><path fill='black' d='M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z'/></svg>")`,
                              maskSize: 'contain',
                              WebkitMaskSize: 'contain',
                            }}
                          />
                          <Check
                            size={20}
                            weight="bold"
                            className="pointer-events-none opacity-0"
                          />
                        </span>
                      </div>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-l from-[#65BAFA] via-[#7C7DF6] to-[#9D37F2] text-white">
                      {index + 1}
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-gray-400">
                      {index + 1}
                    </div>
                  )}

                  {/* Linha entre os steps (exceto o último) */}
                  {index !== steps.length - 1 && (
                    <>
                      {isCompleted ? (
                        <span
                          className={`absolute left-full top-1/2 ml-16 w-full w-[${stepWidth}] h-[2px] -translate-x-1 bg-gradient-to-l from-[#65BAFA] via-[#7C7DF6] to-[#9D37F2]`}
                        ></span>
                      ) : (
                        <span
                          className={`absolute left-full top-1/2 ml-16 w-full w-[${stepWidth}] h-[2px] -translate-x-1 bg-gray-300`}
                        ></span>
                      )}
                    </>
                  )}
                </div>

                {/* Step Name */}
                <div className="mt-2 grid text-center text-sm font-medium">
                  <span className="text-gray-600">{stepName?.step}</span>
                </div>

                {/* Step Message */}
                <div className="mt-2 grid text-center text-xs">
                  <span
                    data-active={true}
                    onClick={() => openPopUp(step)}
                    className="cursor-pointer text-gray-400 transition-colors duration-200 hover:text-blue-400 hover:underline"
                  >
                    {setMessage(step)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto my-12 grid w-[400px] min-w-[240px] px-10 py-4">
          <Button
            onClick={() => currentStep && openPopUp(currentStep)}
            type="button"
            text="Instruções da etapa atual"
          />
        </div>
      </div>
    </>
  )
}
