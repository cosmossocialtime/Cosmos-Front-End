import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import Close from '../../../../public/images/tripulacao/Close.svg'
import BackgroundModal from '../../../../public/images/tripulacao/backgroundModal.png'
import Astronauta from '../../../../public/images/astronauta.png'
import Image from 'next/image'
import AstroPilot from '../../../../public/images/tripulacao/Astro.png'
import AstroLeader from '../../../../public/images/tripulacao/leader.png'
import AstroSpecialist from '../../../../public/images/tripulacao/specialist.png'
import RetactanglePiloto from '../../../../public/images/tripulacao/Retangulo.svg'
import RetactangleLeader from '../../../../public/images/tripulacao/rectangleLeader.svg'
import RetactangleSpecialist from '../../../../public/images/tripulacao/RectangleSpecialist.svg'

type DatasProfile = {
  id: number
  byname: string
  professionalPreviousExperiences: string
  mainCompetencies: string
  reasonToJoin: string
  role: string
  roleName: string
  profilePicture: string
  banner: string
  roleId: number
  knowledgeAreas: [
    {
      sectorId: number
      sector: string
    },
  ]
  previousMentorship: string
  professionalRole: string
  professionalSector: string
}

const arrayColors = ['bg-blue-500', 'bg-[#18A6AC]', 'bg-violet-500']

export default function Modal(ModalProps: DatasProfile) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex">
        <div className="w-full">
          {ModalProps.banner ? (
            <Image
              width={600}
              height={600}
              src={ModalProps.banner}
              alt="background modal"
              quality={100}
              className="cover w-full "
            />
          ) : (
            <Image
              width={300}
              height={300}
              src={BackgroundModal}
              alt="background modal"
              quality={100}
              className="cover w-full "
            />
          )}
        </div>
        <Dialog.Close className="absolute top-10 right-8">
          <Image src={Close} alt="Button Close" className="rounded-md" />
        </Dialog.Close>
      </div>
      <div className="relative flex items-center justify-around gap-24 px-10">
        <div className="relative flex gap-12">
          <div className="relative -top-8 h-36 w-36 overflow-hidden rounded-full border-4 border-gray-50 shadow-lg shadow-black/20 drop-shadow-sm">
            {ModalProps.profilePicture ? (
              <Image
                width={300}
                height={300}
                src={ModalProps.profilePicture}
                onLoad={() => ModalProps.profilePicture}
                alt="Profile photo"
                quality={100}
                className="w-full"
              />
            ) : (
              <Image
                width={300}
                height={300}
                src={Astronauta}
                onLoad={() => Astronauta}
                alt="Profile photo"
                quality={100}
                className="w-full"
              />
            )}
          </div>
          <div className="absolute bottom-2 left-0 z-10 flex items-center">
            <div>
              {ModalProps.roleId === 1 && (
                <Image src={AstroSpecialist} alt="Retangulo" />
              )}
              {ModalProps.roleId === 2 && (
                <Image src={AstroPilot} alt="Retangulo" />
              )}
              {ModalProps.roleId === 3 && (
                <Image src={AstroLeader} alt="Retangulo" />
              )}
            </div>

            <div className="relative">
              {ModalProps.roleId === 1 && (
                <Image
                  width={120}
                  height={120}
                  src={RetactangleSpecialist}
                  alt="Retangulo"
                />
              )}
              {ModalProps.roleId === 2 && (
                <Image
                  width={120}
                  height={120}
                  src={RetactanglePiloto}
                  alt="Retangulo"
                />
              )}
              {ModalProps.roleId === 3 && (
                <Image
                  width={120}
                  height={120}
                  src={RetactangleLeader}
                  alt="Retangulo"
                />
              )}

              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-50 text-sm font-semibold">
                {ModalProps.roleName}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-lg font-medium text-indigo-500">
              {ModalProps.byname}
            </span>
            <span className="text-sm text-indigo-500">
              Cargo: {ModalProps.professionalRole}
            </span>
            <span className="text-sm text-indigo-500">
              Setor: {ModalProps.professionalSector}
            </span>
          </div>
        </div>
        <div className="flex h-8 items-center gap-2">
          {ModalProps.knowledgeAreas &&
            ModalProps.knowledgeAreas.map((areas, index) => (
              <span
                key={areas.sectorId}
                className={`${arrayColors[index]} rounded-lg px-6 py-2 text-center text-xs font-semibold`}
              >
                {areas.sector}
              </span>
            ))}
        </div>
      </div>
      <Tabs.Root
        defaultValue="tab1"
        className="flex flex-col items-center justify-center gap-2"
      >
        <Tabs.List className="flex justify-between gap-2 rounded-md bg-gray-200 px-2 py-2 font-medium text-indigo-200 lg:gap-28">
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab1"
          >
            Experiências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded  px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab2"
          >
            Competências
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab3"
          >
            Motivação
          </Tabs.Trigger>
          <Tabs.Trigger
            className="rounded px-5 py-2 data-[state=active]:bg-gray-50 data-[state=active]:font-semibold"
            value="tab4"
          >
            Voluntariado
          </Tabs.Trigger>
        </Tabs.List>
        <div className="mb-10 flex w-3/4 items-center justify-center rounded border border-gray-300 px-2 text-black lg:w-full lg:max-w-4xl ">
          <div className="w-full px-3 py-3">
            <Tabs.Content value="tab1">
              {ModalProps.professionalPreviousExperiences}
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <span className="break-words">{ModalProps.mainCompetencies}</span>
            </Tabs.Content>
            <Tabs.Content className="break-words" value="tab3">
              <span>{ModalProps.reasonToJoin}</span>
            </Tabs.Content>
            <Tabs.Content className="break-words" value="tab4">
              <span>{ModalProps.previousMentorship}</span>
            </Tabs.Content>
          </div>
        </div>
      </Tabs.Root>
    </div>
  )
}
