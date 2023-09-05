import * as Dialog from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import { Calendar } from 'phosphor-react'
import SideBar from '../sideBar'
import FormatText from '../../../../../utils/FormatText'
import { useState } from 'react'
import { StagesLine } from '../../../../../components/dashboard/mission-painel/StagesLine'
import { VideoPopUp } from '../../../../../components/dashboard/mission-painel/VideoPopUp'
import { StepProps } from '../../../../../types/step'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { DashboardLoading } from '../../../../../components/dashboard/DashboardLoading'
import { useDashboard } from '../../../../../hooks/useDashboard'

export default function MissionPainel() {
  const route = useRouter()
  const { mentorshipId } = route.query

  const { dashboard } = useDashboard()

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship) => String(mentorship.mentorshipId) === mentorshipId,
  )

  const [openDialog, setOpenDialog] = useState(true)
  const [selectedStep, setSelectedStep] = useState<StepProps | null>(null)

  function openPopUp(step: StepProps) {
    const now = dayjs()
    if (step.step === 'Introdução') {
      Router.push('/user/adventure/1/onboarding')
    }
    if (dayjs(step.startDate).isAfter(now)) {
      toast.error(
        'Etapa atual ainda não disponível. Aguarde a data de lançamento para receber novas instruções.',
        {
          autoClose: 5000,
        },
      )
      return
    }

    setSelectedStep(step)
    setOpenDialog(true)
  }

  if (!currentMentorship) {
    return <DashboardLoading />
  }

  return (
    <div className="max-w-screen flex bg-gray-100">
      <SideBar />

      <div className="scroll max-h-screen flex-1 overflow-y-auto text-gray-600">
        <header className="w-full px-20 py-5 shadow-lg shadow-[#2B124A]/5">
          <h1 className="text-4xl font-semibold">{currentMentorship.name}</h1>
        </header>

        <div className="flex flex-col items-center px-20">
          <div className="my-5 flex items-center gap-2 self-start">
            <Calendar size={40} weight="light" />
            <div>
              <span className="block">
                De {dayjs(currentMentorship.startDate).format('DD/MM/YYYY')}
              </span>
              <span className="block">
                Até {dayjs(currentMentorship.endDate).format('DD/MM/YYYY')}
              </span>
            </div>
          </div>

          <div className=" w-full rounded-md p-5 text-lg shadow-[0_0_24px] shadow-black/10">
            <div className="flex h-64 flex-col gap-8 overflow-y-auto pr-[20%]">
              <FormatText text={currentMentorship.description} />
            </div>
          </div>

          <StagesLine
            currentMentorship={currentMentorship}
            openPopUp={openPopUp}
          />
        </div>
      </div>
      {selectedStep?.video && (
        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-10 bg-black/25" />
            <Dialog.Content className="absolute left-1/2 top-1/2 z-20 w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-violet-900 p-4">
              <VideoPopUp source={selectedStep.video} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  )
}
