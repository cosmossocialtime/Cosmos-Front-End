'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Astronauta from '../../../../public/images/astronauta.png'
import ModalContent from './CreateModal'
import Modal from './Modal'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRouter } from 'next/router'
import { invokeLambda } from '../../../lib/aws/invokeLambda'
import { volunteerRoleLabel } from '../../../utils/roleId'

interface MentorshipProps {
  id: number
  byname: string
  professionalPreviousExperiences: string
  mainCompetencies: string
  reasonToJoin: string
  role: string
  roleName: string
  profilePicture: string
  banner: string
  knowledgeAreas: [
    {
      sectorId: number
      sector: string
    }
  ]
  previousMentorship: string
  roleId: number
  professionalRole: string
  professionalSector: string
}

export default function Slider() {
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mentorshipVolunteers, setMentorshipVolunteers] =
    useState<MentorshipProps[]>()
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 15,
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  const router = useRouter()
  const { mentorshipId } = router.query

  useEffect(() => {
    if (mentorshipId) {
      const payload = { mentorshipId: Number(mentorshipId || '0') }
      invokeLambda<typeof payload, { statusCode: number; body: string }>(
        'mentorship-volunteers-select-lambda',
        payload
      ).then((response) => {
        if (response.statusCode === 200) {
          setMentorshipVolunteers(JSON.parse(response.body))
        } else {
          setMentorshipVolunteers([])
        }
      })
    }
  }, [mentorshipId])

  if (!mentorshipVolunteers) {
    return (
      <div className="h-screen w-full items-end justify-center">
        <span className="text-lg font-semibold">Carregando...</span>
      </div>
    )
  }
  return (
    <main className="relative flex flex-1 flex-col">
      {!openModal && (
        <div className="absolute right-0 top-0 z-10 bg-gradient-to-l from-white lg:w-96" />
      )}

      <div
        ref={sliderRef}
        className="keen-slider flex w-full items-center justify-center px-4 py-1"
      >
        {mentorshipVolunteers &&
          mentorshipVolunteers.map((volunteer) => {
            return (
              <Dialog.Root
                onOpenChange={(Modal) => {
                  setOpenModal(Modal)
                }}
                key={volunteer.id}
              >
                <div className="keen-slider__slide mx-auto max-h-[480px] max-w-[400px] rounded border border-gray-50 bg-gray-100 px-8 py-1 drop-shadow lg:py-24">
                  <Dialog.Trigger className="w-full">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h2 className="pb-2 text-left text-2xl font-semibold text-cian-500">
                          {volunteerRoleLabel.get(volunteer.roleName)}
                        </h2>
                        <span className="text-left text-[18px] font-medium text-indigo-500">
                          {volunteer.byname}
                        </span>
                        <span className="text-left text-indigo-500">
                          Cargo: {volunteer.professionalRole}
                        </span>
                        <span className="text-left text-indigo-500">
                          Setor: {volunteer.professionalSector}
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-full">
                        {volunteer.profilePicture ? (
                          <Image
                            width={125}
                            height={125}
                            onLoad={() => volunteer.profilePicture}
                            src={volunteer.profilePicture}
                            alt="Imagem de perfil"
                            className="w-full"
                          />
                        ) : (
                          <Image
                            width={125}
                            height={125}
                            onLoad={() => Astronauta}
                            src={Astronauta}
                            alt="Imagem de perfil"
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex max-h-48 max-w-[20rem] flex-col gap-3">
                      <p className="break-words text-left text-indigo-500 ">
                        {volunteer.professionalPreviousExperiences.length > 50
                          ? volunteer.professionalPreviousExperiences.substring(
                              0,
                              50
                            ) + '...'
                          : volunteer.professionalPreviousExperiences}
                      </p>
                      <p className="overflow-hidden overflow-ellipsis text-left text-indigo-500">
                        {volunteer.mainCompetencies.length > 50
                          ? volunteer.mainCompetencies.substring(0, 50) + '...'
                          : volunteer.mainCompetencies}
                      </p>
                    </div>
                  </Dialog.Trigger>

                  <ModalContent>
                    <Modal
                      key={volunteer.id}
                      role={volunteer.role}
                      byname={volunteer.byname}
                      professionalPreviousExperiences={
                        volunteer.professionalPreviousExperiences
                      }
                      id={volunteer.id}
                      mainCompetencies={volunteer.mainCompetencies}
                      profilePicture={volunteer.profilePicture}
                      reasonToJoin={volunteer.reasonToJoin}
                      banner={volunteer.banner}
                      roleName={volunteer.roleName}
                      knowledgeAreas={volunteer.knowledgeAreas}
                      previousMentorship={volunteer.previousMentorship}
                      roleId={volunteer.roleId}
                      professionalRole={volunteer.professionalRole}
                      professionalSector={volunteer.professionalSector}
                    />
                  </ModalContent>
                </div>
              </Dialog.Root>
            )
          })}
      </div>
      {loaded && instanceRef.current && (
        <div className="mb-8 ml-6 mt-6 flex gap-8">
          <CaretLeft
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            className={`${
              currentSlide === 0 ? 'arrow--disabled text-gray-300' : ''
            } arrow arrow--left left-4 cursor-pointer text-blue-300`}
          />
          <CaretRight
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className={`${
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
                ? 'arrow--disabled text-gray-300'
                : ''
            } arrow arrow--right cursor-pointer text-blue-300`}
          />
        </div>
      )}
    </main>
  )
}
