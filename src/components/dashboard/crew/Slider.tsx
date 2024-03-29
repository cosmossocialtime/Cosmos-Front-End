'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Astronauta from '../../../../public/images/astronauta.png'
import ModalContent from './CreateModal'
import Modal from './Modal'
import { api } from '../../../services/api'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useRouter } from 'next/router'

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
    },
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
    loop: true,
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
      api.get(`/mentorship/${mentorshipId}/volunteers`).then((response) => {
        setMentorshipVolunteers(response.data)
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
    <main className="relative flex flex-1 flex-col items-center justify-center">
      {!openModal && (
        <div className="absolute right-0 top-0 z-10 bg-gradient-to-l from-white lg:w-96" />
      )}

      <div ref={sliderRef} className="keen-slider flex w-full  py-1 px-4">
        {mentorshipVolunteers &&
          mentorshipVolunteers.map((volunteer) => {
            return (
              <Dialog.Root
                onOpenChange={(Modal) => {
                  setOpenModal(Modal)
                }}
                key={volunteer.id}
              >
                <div className="keen-slider__slide rounded border border-gray-50 bg-gray-100 px-8 py-1 drop-shadow lg:py-24">
                  <Dialog.Trigger className="w-full">
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <h2 className="pb-2 text-left text-2xl font-semibold text-cian-500">
                          {volunteer.roleName}
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
                            width={300}
                            height={300}
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
                        {volunteer.professionalPreviousExperiences}
                      </p>
                      <p className="overflow-hidden overflow-ellipsis text-left text-indigo-500">
                        {volunteer.mainCompetencies}
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
        <>
          <CaretLeft
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            className={`${
              currentSlide === 0 && ''
            } absolute left-10 top-1/2 z-40 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-black/10 p-3 text-blue-800 transition-colors hover:bg-violet-400 hover:text-zinc-50`}
          />
          <CaretRight
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef?.current?.next()
            }
            className={`${
              currentSlide ===
                instanceRef.current.track.details.slides.length - 1 && ''
            } absolute right-10 top-1/2 z-40 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full bg-black/10 p-3 text-blue-800 transition-colors hover:bg-violet-400 hover:text-zinc-50`}
          />
        </>
      )}
    </main>
  )
}
