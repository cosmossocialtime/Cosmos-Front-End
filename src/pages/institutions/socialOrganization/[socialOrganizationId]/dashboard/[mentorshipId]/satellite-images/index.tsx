import { useRouter } from 'next/router'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import SideBar from '../sideBar'
import Image from 'next/image'
import { Button } from '../../../../../../../components/Button/ButtonSubmit'
import { MentorshipProps } from '../../../../../../../types/mentorship'
import { useState } from 'react'
import { StepProps } from '../../../../../../../types/step'
import * as Dialog from '@radix-ui/react-dialog'
import { VideoPopUp } from '../../../../../../../components/dashboard/mission-painel/VideoPopUp'
import { ConfirmInformationsModal } from '../../../../../../../components/dashboard/satellite-images/modalConfirmInformations'
import { AboutInstitutionMentorshipModal } from '../../../../../../../components/instituition/modal/AboutInstitutionMentorship'
import Star from '../../../../../../../assets/star.svg'
import { useQuery } from '@tanstack/react-query'
import { useCombinedPlanetsMentorshipData } from '../../../../../../../hooks/useCombinedPlanetMentorshipData'
import { useDashboard } from '../../../../../../../hooks/useDashboard'
import { PlanetItemMentorship } from '../../../../../../../components/instituition/painel/solarSystem/planetItemMentorship'
import { Loading } from '../../../../../../../components/Loading'
import { toast } from 'react-toastify'
import { queryClient } from '../../../../../../../services/queryClient'
import { api } from '../../../../../../../services/api'

export default function SateliteImages() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const { mentorshipId } = router.query
  const mentorId = Number(mentorshipId || '0')
  const [openDialog, setOpenDialog] = useState(true)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const closeModalConfirm = () => setIsOpenConfirm(false)
  const [selectedStep, setSelectedStep] = useState<StepProps | null>(null)
  const [isOpenAboutInstitution, setIsOpenAboutInstitution] = useState(false)
  const closeModalAboutInstitution = () => setIsOpenAboutInstitution(false)
  const { dashboard } = useDashboard(organizationId)

  async function getSectors() {
    try {
      const response = await api.get('/social-organization/sectors')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar setores!')
      throw error
    }
  }

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  })

  const fetchMentorshipSocialOrganization = async (
    organizationId: number,
    mentorId: number
  ) => {
    try {
      const payload = {
        socialOrganizationId: organizationId,
        mentorshipId: mentorId,
      }

      const response = await api.get('/mentorship/social-organizations', {
        params: payload,
      })

      const parsed = response.data
      return parsed.socialOrganization
    } catch (error) {
      console.error('Erro ao buscar Organização Social!')
    }
  }

  const {
    data: mentorshipSocialOrganization,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['mentorshipSocialOrganization', organizationId, mentorId],
    queryFn: () => fetchMentorshipSocialOrganization(organizationId, mentorId),
    enabled:
      organizationId !== undefined &&
      organizationId !== null &&
      mentorId !== undefined &&
      mentorId !== null,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  const { leftPlanets, rightPlanets } = useCombinedPlanetsMentorshipData(
    sectors,
    mentorshipSocialOrganization
  )

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) => mentorship.mentorshipId === mentorId
  )

  async function sendInformation() {
    try {
      const org = mentorshipSocialOrganization
      org.completedOnboarding = true
      const payload = {
        socialOrganization: org,
      }
      const response = await api.put(
        '/mentorship/social-organizations',
        payload
      )
      if (response.status == 201) {
        queryClient.invalidateQueries([
          'mentorshipSocialOrganization',
          organizationId,
          mentorId,
        ])
        toast.success('Informações enviadas com sucesso')
      } else {
        toast.error('Erro ao enviar as informações')
      }
    } catch (error) {
      toast.error('Erro ao enviar as informações')
    } finally {
      closeModalConfirm()
    }
  }

  function openPopUp() {
    const step = currentMentorship.steps.find(
      (st: StepProps) => st.step === 'satellite_images'
    )
    setSelectedStep(step)
    setOpenDialog(true)
  }

  if (
    isLoading ||
    !mentorshipSocialOrganization ||
    !sectors ||
    !leftPlanets.length ||
    !rightPlanets.length
  ) {
    return <Loading />
  }

  const filledCount =
    (mentorshipSocialOrganization.mentorshipSectors?.filter(
      (s: { id: number }) => s.id && s.id !== 0
    ).length || 0) +
    (mentorshipSocialOrganization.creationDate !== undefined ? 1 : 0)
  const allFilled = 11 === filledCount

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-black bg-gray-200 text-gray-800"
      style={{
        backgroundImage: "url('/images/Planetas/bgLogin.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <DynamicHeader />
      <div className="flex h-[calc(100vh-68px)] w-full overflow-y-auto">
        <SideBar />
        <div className="relative w-full">
          <div className="flex h-full flex-1 flex-col items-center">
            {/* Cabeçalho com instruções */}
            {!mentorshipSocialOrganization.completedOnboarding && (
              <div className="w-full backdrop-blur-sm">
                {allFilled ? (
                  <div className="max-w-5xl">
                    <p className="mt-6 gap-10 px-10 text-xl leading-relaxed text-white">
                      Verifique se as informações de cada área da organização
                      estão corretas e envie-as para que os voluntários da
                      missão conheçam a {mentorshipSocialOrganization.name}
                    </p>
                    <div className="mb-6 w-[453px] px-10">
                      <Button
                        text="Enviar informações"
                        type="submit"
                        onClick={() => setIsOpenConfirm(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="max-w-5xl">
                    <p className="mt-10 gap-10 px-10 text-xl leading-relaxed text-white">
                      Clique sobre cada planeta e preencha as informações
                      solicitadas. Esses dados serão compartilhados com a
                      Tripulação de voluntários.
                    </p>
                    <p className="p-10 text-xl leading-relaxed text-white">
                      Caso tenha dúvidas, reveja as{' '}
                      <span
                        className="cursor-pointer text-blue-300"
                        onClick={() => openPopUp()}
                      >
                        instruções da etapa
                      </span>{' '}
                      ou entre em contato com o Controle da Missão.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Grade dos planetas */}
            <div className="flex flex-1 items-center justify-center gap-6">
              <div
                className="ml-4 grid h-full w-[40%]"
                style={{
                  gridTemplateColumns: `repeat(3, 1fr)`,
                  gridTemplateRows: `repeat(3, 1fr)`,
                }}
              >
                {leftPlanets.map((item, index) =>
                  item ? (
                    <PlanetItemMentorship key={'left_' + index} {...item} />
                  ) : (
                    <div key={'left_' + index} />
                  )
                )}
              </div>

              <div className="flex w-[20%] flex-col items-center justify-center">
                {isOpenAboutInstitution && (
                  <AboutInstitutionMentorshipModal
                    closeModal={closeModalAboutInstitution}
                    socialOrganization={mentorshipSocialOrganization}
                    isFilled={mentorshipSocialOrganization.cnpj !== undefined}
                  />
                )}
                <Image
                  className={
                    mentorshipSocialOrganization.cnpj !== undefined
                      ? ''
                      : 'opacity-70 grayscale'
                  }
                  width={198}
                  height={200}
                  src={Star}
                  alt=""
                />
                <h4 className="text-center text-xl text-white">
                  {mentorshipSocialOrganization.name}
                </h4>
                <button
                  className="text-base text-blue-300"
                  onClick={() => setIsOpenAboutInstitution(true)}
                >
                  {mentorshipSocialOrganization.cnpj !== undefined
                    ? 'Visualizar'
                    : 'Preencher'}
                </button>
              </div>
              <div
                className="mr-4 grid h-full w-[40%]"
                style={{
                  gridTemplateColumns: `repeat(3, 1fr)`,
                  gridTemplateRows: `repeat(3, 1fr)`,
                }}
              >
                {rightPlanets.map((item, index) =>
                  item ? (
                    <PlanetItemMentorship key={'right_' + index} {...item} />
                  ) : (
                    <div key={'right_' + index} />
                  )
                )}
              </div>
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
        {isOpenConfirm && (
          <ConfirmInformationsModal
            onCancel={closeModalConfirm}
            onConfirm={() => sendInformation()}
            socialOrganization={mentorshipSocialOrganization}
          />
        )}
      </div>
    </div>
  )
}
