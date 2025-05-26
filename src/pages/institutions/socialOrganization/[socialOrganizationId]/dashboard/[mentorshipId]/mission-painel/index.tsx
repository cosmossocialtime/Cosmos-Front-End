import * as Dialog from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import { Calendar } from 'phosphor-react'
import SideBar from '../sideBar'
import FormatText from '../../../../../../../utils/FormatText'
import { useState } from 'react'
import { StagesLineInstitution } from '../../../../../../../components/dashboard/mission-painel/stagesLineInstitution'
import { VideoPopUp } from '../../../../../../../components/dashboard/mission-painel/VideoPopUp'
import { StepProps } from '../../../../../../../types/step'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { DashboardLoading } from '../../../../../../../components/dashboard/DashboardLoading'
import { useDashboard } from '../../../../../../../hooks/useDashboard'
import { MentorshipProps } from '../../../../../../../types/mentorship'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'

export default function MissionPainel() {
  const route = useRouter()
  const { mentorshipId } = route.query
  const { socialOrganizationId } = route.query

  const { dashboard } = useDashboard(Number(socialOrganizationId || '0'))

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) =>
      String(mentorship.mentorshipId) === mentorshipId
  )

  const [openDialog, setOpenDialog] = useState(true)
  const [selectedStep, setSelectedStep] = useState<StepProps | null>(null)

  function openPopUp(step: StepProps) {
    const now = dayjs()

    if (step.step === 'introduction') {
      Router.push(
        `/institutions/socialOrganization/${socialOrganizationId}/onboarding/${mentorshipId}/welcome`
      )
    }

    if (dayjs(step.startDate).isAfter(now)) {
      toast.error(
        'Etapa atual ainda não disponível. Aguarde a data de lançamento para receber novas instruções.',
        {
          autoClose: 5000,
        }
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
    <div className="min-h-screen overflow-y-auto bg-gray-200 text-gray-800">
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] overflow-hidden">
        <SideBar />

        <div className="flex flex-1 flex-col overflow-hidden px-6 py-6">
          <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-y-auto px-8 py-6">
              <header className="mb-4 flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentMentorship.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={24} />
                  <div className="leading-5">
                    <div>
                      De{' '}
                      {dayjs(currentMentorship.startDate).format('DD/MM/YYYY')}{' '}
                      até{' '}
                      {dayjs(currentMentorship.endDate).format('DD/MM/YYYY')}
                    </div>
                  </div>
                </div>
              </header>

              <FormatText text={currentMentorship.description} />
            </div>

            {/* Stages fixo ao final da área branca */}
            <div className="border-t px-8 py-4">
              <StagesLineInstitution
                currentMentorship={currentMentorship}
                openPopUp={openPopUp}
              />
            </div>
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
    </div>
  )
}
