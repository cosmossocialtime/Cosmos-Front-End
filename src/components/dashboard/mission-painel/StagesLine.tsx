import dayjs from 'dayjs'
import { MentorshipProps } from '../../../types/mentorship'
import { Check } from 'phosphor-react'
import { StepProps } from '../../../types/step'
import { Button } from '../../Button'
import { stepsNames } from './stepsNames'

interface StagesLineProps {
  currentMentorship: MentorshipProps
  openPopUp: (step: StepProps) => void
}

export function StagesLine({ currentMentorship, openPopUp }: StagesLineProps) {
  const stepsLength = currentMentorship.steps.length
  const stepWidth = 100 / stepsLength
  const barGrayWidth = 100 - stepWidth

  const completedSteps = currentMentorship.steps.filter(
    (step) => step.active === true,
  )
  const completedStepsLength = completedSteps.length

  const currentStep = currentMentorship.steps.find(
    (step) => step.active === false,
  )

  const marginBar = stepWidth / 2
  const barCompletedWidth = completedStepsLength * stepWidth

  function setMessage(step: StepProps) {
    const now = dayjs()
    const { active } = step
    const startDate = dayjs(step.startDate)

    if (active) {
      return 'Ver instruções'
    }
    if (step === currentStep && startDate.isBefore(now)) {
      return 'Etapa atual'
    }
    if (startDate == null) {
      return 'Data de disponibilidade não definida'
    }
    if (startDate.isBefore(now)) {
      return 'Já disponível'
    }
    if (startDate.isAfter(now)) {
      return `Disponível em ${startDate.format('DD/MM/YYYY')}`
    }

    throw new Error('Não foi possível definir uma mensagem para esta etapa.')
  }

  return (
    <>
      <div className="mt-12">
        <div
          className="grid items-center justify-center"
          style={{
            gridTemplateColumns: `repeat(${stepsLength}, minmax(0, 1fr))`,
          }}
        >
          {currentMentorship.steps.map((step) => {
            const stepName = stepsNames.find(
              (stepName) => stepName.stepId === step.stepId,
            )

            return (
              <span key={step.stepId} className="px-3 text-center">
                {stepName?.step}
              </span>
            )
          })}
        </div>

        <div
          className="relative mt-2 grid justify-center"
          style={{
            gridTemplateColumns: `repeat(${stepsLength}, minmax(0, 1fr))`,
          }}
        >
          <div
            className="absolute top-1/2 box-border h-[2px] -translate-x-1 bg-[#D1D5DB]"
            style={{
              width: `${barGrayWidth}%`,
              marginLeft: `${marginBar}%`,
            }}
          />
          <div
            className="absolute top-1/2 h-[2px] w-64 -translate-x-1 bg-violet-400"
            style={{
              width: `${barCompletedWidth}%`,
              marginLeft: `${marginBar}%`,
            }}
          />

          {currentMentorship.steps.map((step) =>
            step.active ? (
              <div
                key={step.stepId}
                className={`z-10 flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-white text-white`}
              >
                <Check size={32} className="rounded-full bg-violet-400 p-1" />
              </div>
            ) : (
              <div
                key={step.stepId}
                data-currentStep={
                  currentStep === step &&
                  dayjs(currentStep.startDate).isBefore(dayjs())
                }
                className="z-10 flex h-8 w-8 items-center justify-center justify-self-center rounded-full border-2 border-solid border-[#9CA3AF] bg-white text-white data-[currentStep=true]:border-violet-400"
              >
                <div
                  key={step.stepId}
                  data-currentStep={
                    currentStep === step &&
                    dayjs(currentStep.startDate).isBefore(dayjs())
                  }
                  className="h-[10px] w-[10px] rounded-full bg-[#D1D5DB] data-[currentStep=true]:bg-violet-400"
                />
              </div>
            ),
          )}
        </div>

        <div
          className="mt-2 grid justify-center"
          style={{
            gridTemplateColumns: `repeat(${stepsLength}, minmax(0, 1fr))`,
          }}
        >
          {currentMentorship.steps.map((step) => (
            <span
              key={step.stepId}
              data-active={step.active}
              className="text-center text-sm text-gray-400 data-[active=true]:cursor-pointer hover:data-[active=true]:font-semibold hover:data-[active=true]:text-blue-400"
              onClick={() => step.active && openPopUp(step)}
            >
              {setMessage(step)}
            </span>
          ))}
        </div>
      </div>
      <Button.Primary
        className="mx-auto my-12 px-20 py-4"
        onClick={() => currentStep && openPopUp(currentStep)}
      >
        Instruções da etapa atual
      </Button.Primary>
    </>
  )
}
