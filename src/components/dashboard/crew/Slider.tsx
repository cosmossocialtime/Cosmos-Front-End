import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Astronauta from '../../../../public/images/astronauta.png'
import Arrow from './ArrowSlider'
import { useKeenSlider } from 'keen-slider/react'
import ModalContent from './CreateModal'
import Modal from './Modal'
import useFetch from '../../../hooks/useFetch'
import { api } from '../../../services/api'

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
}

interface currentMentorship {
  currentMentorship: {
    mentorshipId: number
  }
}
export default function Slider() {
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mentorshipVolunteers, setMentorshipVolunteers] = useState<
    MentorshipProps[]
  >([])
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
  const { data } = useFetch<currentMentorship>(
    'https://api.cosmossocial.com.br/api/dashboard',
  )
  const mentorshipId = data?.currentMentorship.mentorshipId

  useEffect(() => {
    if (mentorshipId) {
      api.get(`/mentorship/${mentorshipId}/volunteers`).then((response) => {
        setMentorshipVolunteers(response.data)
      })
    }
  }, [mentorshipId])

  console.log(mentorshipVolunteers)
  return (
    <div>
      {!openModal && (
        <div className="absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-white lg:w-96" />
      )}

      <div ref={sliderRef} className="keen-slider w-full py-14">
        {mentorshipVolunteers &&
          mentorshipVolunteers.map((volunteer) => {
            return (
              <div
                key={volunteer.id}
                className="keen-slider__slide rounded border border-gray-50 bg-gray-100 px-8 py-1 drop-shadow lg:py-20"
              >
                <Dialog.Root
                  onOpenChange={(Modal) => {
                    setOpenModal(Modal)
                  }}
                >
                  <Dialog.Trigger>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h2 className="pb-2 text-left text-2xl font-semibold text-cian-500">
                          {volunteer.roleName}
                        </h2>
                        <span className="text-left text-[18px] font-medium text-indigo-500">
                          {volunteer.byname}
                        </span>
                        <span className="text-left text-indigo-500">
                          Cargo: {volunteer.roleName}
                        </span>
                        {/* <span className="text-left text-indigo-500">
                        Setor: [{card.sector}]
                      </span> */}
                      </div>
                      <div className="h-28 w-28 overflow-hidden rounded-md">
                        {volunteer.profilePicture ? (
                          <Image
                            width={300}
                            height={300}
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
                    <div className="mt-2 flex max-w-md flex-col gap-3">
                      <p className="break-words text-left text-indigo-500">
                        {volunteer.professionalPreviousExperiences}
                      </p>
                      <p className="break-words text-left text-indigo-500">
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
                    />
                  </ModalContent>
                </Dialog.Root>
              </div>
            )
          })}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef?.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details?.slides?.length - 1
            }
          />
        </>
      )}
    </div>
  )
}
