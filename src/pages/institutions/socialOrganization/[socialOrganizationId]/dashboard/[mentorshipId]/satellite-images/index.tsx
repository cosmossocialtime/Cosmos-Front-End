import { useRouter } from 'next/router'
import DynamicHeader from '../../../../../../../components/header/DynamicHeader'
import SideBar from '../sideBar'
import { invokeLambda } from '../../../../../../../lib/aws/invokeLambda'
import Image from 'next/image'
import { Button } from '../../../../../../../components/Button/ButtonSubmit'
import { useDashboard } from '../../../../../../../hooks/useDashboard'
import { MentorshipProps } from '../../../../../../../types/mentorship'
import { useEffect, useState } from 'react'
import { StepProps } from '../../../../../../../types/step'
import * as Dialog from '@radix-ui/react-dialog'
import { VideoPopUp } from '../../../../../../../components/dashboard/mission-painel/VideoPopUp'
import { ConfirmInformationsModal } from '../../../../../../../components/dashboard/satellite-images/modalConfirmInformations'
import { MentorshipSectorProps } from '../../../../../../../types/mentorshipSector'
import { toast } from 'react-toastify'
import { SectorFormMentorship } from '../../../../../../../components/instituition/painel/solarSystem/sectorFormMentorship'
import { MentorshipSocialOrganizationProps } from '../../../../../../../types/mentorshipSocialOrganization'
import { AboutInstitutionMentorshipModal } from '../../../../../../../components/instituition/modal/AboutInstitutionMentorship'
import Star from '../../../../../../../assets/star.svg'
import DashboardLoadingInstitution from '../DashboardLoadingInstitution'

interface PlanetItemProps {
  imageSrc: string
  name: string
  id: number
  isFilled?: boolean
  sectorData: {
    sectorId: number
    sector: string
  }
  mentorshipSector?: MentorshipSectorProps
  mentorshipSocialOrganizationId?: number
}

const baseLeftPlanets: (PlanetItemProps | null)[] = [
  {
    imageSrc: '/images/satelites/recursos.png',
    name: 'Captação de recursos',
    id: 7,
    sectorData: {
      sectorId: 7,
      sector: 'Captação de recursos',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/financas.png',
    name: 'Finanças',
    id: 2,
    sectorData: {
      sectorId: 2,
      sector: 'Finanças',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/marketing.png',
    name: 'Marketing',
    id: 3,
    sectorData: {
      sectorId: 3,
      sector: 'Marketing',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/projetos.png',
    name: 'Gestão de projetos',
    id: 5,
    sectorData: {
      sectorId: 5,
      sector: 'Gestão de projetos',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/sustentabilidade.png',
    name: 'Sustentabilidade',
    id: 6,
    sectorData: {
      sectorId: 6,
      sector: 'Sustentabilidade',
    },
  },
]

const baseRightPlanets: (PlanetItemProps | null)[] = [
  {
    imageSrc: '/images/satelites/pessoas.png',
    name: 'Recursos Humanos',
    id: 1,
    sectorData: {
      sectorId: 1,
      sector: 'Recursos Humanos',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/juridico.png',
    name: 'Jurídico',
    id: 4,
    sectorData: {
      sectorId: 4,
      sector: 'Jurídico',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/impacto.png',
    name: 'Avaliação de Impacto',
    id: 9,
    sectorData: {
      sectorId: 9,
      sector: 'Avaliação de Impacto',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/estrategia.png',
    name: 'Estratégia',
    id: 8,
    sectorData: {
      sectorId: 8,
      sector: 'Estratégia',
    },
  },
  null,
  {
    imageSrc: '/images/satelites/lideranca.png',
    name: 'Liderança',
    id: 10,
    sectorData: {
      sectorId: 10,
      sector: 'Liderança',
    },
  },
]

export default function SateliteImages() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const { mentorshipId } = router.query
  const mentorId = Number(mentorshipId || '0')
  const { dashboard } = useDashboard(organizationId)
  const [openDialog, setOpenDialog] = useState(true)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const closeModalConfirm = () => setIsOpenConfirm(false)
  const [selectedStep, setSelectedStep] = useState<StepProps | null>(null)
  const [informationSend, setInformationSend] = useState(false)
  const [updatedMentorshipSectors, setUpdatedMentorshipSectors] = useState<
    MentorshipSectorProps[]
  >([])
  const [leftPlanets, setLeftPlanets] = useState<(PlanetItemProps | null)[]>([])
  const [rightPlanets, setRightPlanets] = useState<(PlanetItemProps | null)[]>(
    []
  )
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetItemProps | null>(
    null
  )
  const [originalSocialOrganization, setOriginalSocialOrganization] =
    useState<MentorshipSocialOrganizationProps | null>(null)
  const [socialOrganization, setSocialOrganization] =
    useState<MentorshipSocialOrganizationProps | null>(null)
  const [isLoadingSocialOrganization, setIsLoadingSocialOrganization] =
    useState(true)
  const [isOpenAboutInstitution, setIsOpenAboutInstitution] = useState(false)
  const closeModalAboutInstitution = () => setIsOpenAboutInstitution(false)

  useEffect(() => {
    if (organizationId) {
      setIsLoadingSocialOrganization(true)
      const payload = {
        socialOrganizationId: organizationId,
        mentorshipId: mentorId,
      }
      invokeLambda<typeof payload, { statusCode: number; body: string }>(
        'mentorship-social-organization-select-lambda',
        payload
      )
        .then((response) => {
          if (response.statusCode === 200) {
            const parsed = JSON.parse(response.body)
            if (
              parsed.socialOrganization.mentorshipSectors &&
              parsed.socialOrganization.mentorshipSectors.length === 10
            ) {
              setInformationSend(true)
            }
            setSocialOrganization(parsed.socialOrganization)
            setOriginalSocialOrganization(parsed.socialOrganization)
            setIsLoadingSocialOrganization(false)
          } else {
            toast.error('Erro ao buscar Organização Social!')
            setIsLoadingSocialOrganization(false)
          }
        })
        .catch((err) => {
          toast.error('Erro ao buscar Organização Social!')
          setIsLoadingSocialOrganization(false)
        })
    }
  }, [organizationId])

  useEffect(() => {
    if (originalSocialOrganization) {
      const allPlanets = baseLeftPlanets
        .map(enrichPlanetData)
        .concat(baseRightPlanets.map(enrichPlanetData))
        .filter(Boolean)
      setUpdatedMentorshipSectors(
        allPlanets.map((item) => {
          return {
            id: item?.mentorshipSector?.id,
            sectorId: item?.sectorData?.sectorId || 0,
            sector: item?.sectorData?.sector || '',
            mentorshipSocialOrganizationId:
              item?.mentorshipSocialOrganizationId,
            ranking: Number(item?.mentorshipSector?.ranking) ?? 0,
            currentlyWorking: item?.mentorshipSector?.currentlyWorking ?? '',
            effectiveness: item?.mentorshipSector?.effectiveness ?? '',
          }
        })
      )
      setLeftPlanets(baseLeftPlanets.map(enrichPlanetData))
      setRightPlanets(baseRightPlanets.map(enrichPlanetData))
    }
  }, [originalSocialOrganization])

  if (isLoadingSocialOrganization || !socialOrganization) {
    return <DashboardLoadingInstitution />
  }

  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) => mentorship.mentorshipId === mentorId
  )

  const filledCount =
    (rightPlanets.filter((p: PlanetItemProps | null) => p && p.isFilled)
      .length || 0) +
    (leftPlanets.filter((p: PlanetItemProps | null) => p && p.isFilled)
      .length || 0) +
    (socialOrganization.cnpj !== undefined ? 1 : 0)
  const allFilled = 11 === filledCount

  const enrichPlanetData = (planet: PlanetItemProps | null) => {
    if (!planet) return null

    if (
      originalSocialOrganization &&
      originalSocialOrganization?.mentorshipSectors &&
      originalSocialOrganization?.mentorshipSectors.length > 0
    ) {
      const mentorshipData =
        originalSocialOrganization?.mentorshipSectors?.find(
          (s: MentorshipSectorProps) => s.sectorId === planet.id
        )

      return {
        ...planet,
        title: planet.name,
        mentorshipSector: mentorshipData,
        isFilled: mentorshipData !== undefined,
      }
    }
    const organizationData: MentorshipSectorProps | undefined =
      originalSocialOrganization?.mentorshipSectors?.find(
        (s: MentorshipSectorProps) => s.sectorId === planet.id
      )

    const mentorshipData: MentorshipSectorProps = {
      sectorId: organizationData?.sectorId || planet.id,
      sector: organizationData?.sector || planet.name,
      ranking: organizationData?.ranking,
      currentlyWorking: organizationData?.currentlyWorking || '',
      effectiveness: organizationData?.effectiveness || '',
    }

    return {
      ...planet,
      title: planet.name,
      mentorshipSector: mentorshipData,
      isFilled: organizationData !== undefined,
    }
  }

  const updatePlanets = (
    planets: (PlanetItemProps | null)[],
    updatedSector: MentorshipSectorProps
  ): (PlanetItemProps | null)[] => {
    return planets.map((planet) => {
      if (!planet) return null
      if (planet.id === updatedSector.sectorId) {
        return {
          ...planet,
          mentorshipSector: updatedSector,
          isFilled: true,
        }
      }
      return planet
    })
  }

  async function sendInformation() {
    try {
      const payload = {
        socialOrganizationId: organizationId,
        mentorshipId: mentorId,
        sectors: updatedMentorshipSectors,
        socialOrganization: socialOrganization,
      }
      const response = await invokeLambda<typeof payload, any>(
        'mentorship-social-organization-create-lambda',
        payload
      )
      if (response.statusCode == 201) {
        toast.success('Informações enviadas com sucesso')
        setInformationSend(true)
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
            {!informationSend && (
              <div className="w-full backdrop-blur-sm">
                {allFilled ? (
                  <div className="max-w-5xl">
                    <p className="mt-6 gap-10 px-10 text-xl leading-relaxed text-white">
                      Verifique se as informações de cada área da organização
                      estão corretas e envie-as para que os voluntários da
                      missão conheçam a {socialOrganization.name}
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
              {selectedPlanet && (
                <SectorFormMentorship
                  closeModal={() => setSelectedPlanet(null)}
                  isFilled={selectedPlanet.isFilled || false}
                  name={selectedPlanet.name}
                  image={selectedPlanet.imageSrc}
                  sectorData={selectedPlanet.sectorData}
                  mentorshipSector={selectedPlanet.mentorshipSector}
                  isInformationSend={informationSend}
                  onSave={(updatedSector) => {
                    setUpdatedMentorshipSectors((prev) => {
                      const exists = prev.some(
                        (sector) => sector.sectorId === updatedSector.sectorId
                      )
                      return exists
                        ? prev.map((sector) =>
                            sector.sectorId === updatedSector.sectorId
                              ? updatedSector
                              : sector
                          )
                        : [...prev, updatedSector]
                    })
                    setLeftPlanets((prev) => updatePlanets(prev, updatedSector))
                    setRightPlanets((prev) =>
                      updatePlanets(prev, updatedSector)
                    )
                    setSelectedPlanet(null)
                  }}
                />
              )}
              <div
                className="ml-4 grid h-full w-[40%]"
                style={{
                  gridTemplateColumns: `repeat(3, 1fr)`,
                  gridTemplateRows: `repeat(3, 1fr)`,
                }}
              >
                {leftPlanets.map((item, index) =>
                  item ? (
                    <div
                      key={'left_' + index}
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        className={item.isFilled ? '' : 'grayscale filter'}
                        width={47}
                        height={53}
                        src={item.imageSrc}
                        alt={item.name}
                      />
                      <h4 className="text-center text-base  text-white">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => setSelectedPlanet(item)}
                        className="text-sm text-blue-300"
                      >
                        {item.isFilled ? 'Visualizar' : 'Preencher'}
                      </button>
                    </div>
                  ) : (
                    <div key={'left_' + index} />
                  )
                )}
              </div>

              <div className="flex w-[20%] flex-col items-center justify-center">
                {isOpenAboutInstitution && (
                  <AboutInstitutionMentorshipModal
                    closeModal={closeModalAboutInstitution}
                    socialOrganization={socialOrganization}
                    isFilled={socialOrganization.cnpj !== undefined}
                    isInformationSend={informationSend}
                    onSave={(updatedOrganization) => {
                      setSocialOrganization(updatedOrganization)
                    }}
                  />
                )}
                <Image
                  className={
                    socialOrganization.cnpj !== undefined
                      ? ''
                      : 'opacity-70 grayscale'
                  }
                  width={198}
                  height={200}
                  src={Star}
                  alt=""
                />
                <h4 className="text-center text-xl text-white">
                  {socialOrganization.name}
                </h4>
                <button
                  className="text-base text-blue-300"
                  onClick={() => setIsOpenAboutInstitution(true)}
                >
                  {socialOrganization.cnpj !== undefined
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
                    <div
                      key={'right_' + index}
                      className="flex flex-col items-center justify-center"
                    >
                      <Image
                        className={item.isFilled ? '' : 'grayscale filter'}
                        width={47}
                        height={53}
                        src={item.imageSrc}
                        alt={item.name}
                      />
                      <h4 className="text-center text-base  text-white">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => setSelectedPlanet(item)}
                        className="text-sm text-blue-300"
                      >
                        {item.isFilled ? 'Visualizar' : 'Preencher'}
                      </button>
                    </div>
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
            socialOrganization={socialOrganization}
          />
        )}
      </div>
    </div>
  )
}
