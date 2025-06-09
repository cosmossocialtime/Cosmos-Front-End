import { CaretLeft, CaretRight } from 'phosphor-react'
import AstronautaImg from '../../../assets/astronauta.png'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { MentorshipProps } from '../../../types/mentorship'

interface currentMissionInstitutionProps {
  mentorships: MentorshipProps[]
}

export default function CurrentMissionsInstitutionArea({
  mentorships,
}: currentMissionInstitutionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="relative mb-8 mt-4 flex min-h-[16rem] flex-col rounded-lg bg-gray-200 pr-4">
      <span className="absolute text-xl text-gray-600">Missões atuais</span>

      {mentorships.length === 0 ? (
        <div className="relativeflex h-50 mt-2 items-center justify-center overflow-hidden rounded-lg bg-currentMission bg-cover bg-no-repeat">
          <h1 className="z-10 px-4 text-center text-xl font-semibold text-gray-200">
            Atualmente você não está participando de nenhuma missão. <br />{' '}
            Acesse as opções abaixo e inscreva-se em uma nova aventura!
          </h1>
        </div>
      ) : (
        <div ref={sliderRef} className="keen-slider mt-2 w-full rounded-lg">
          {mentorships.map((mentorship, key) => {
            return (
              <div
                key={mentorship.mentorshipId}
                className={`mt-4 ${
                  'number-slide' + (key + 1)
                } keen-slider__slide relative flex flex-1 justify-between`}
              >
                <div className="absolute bottom-0 h-80 w-full overflow-hidden rounded-lg bg-currentMissionInstitution bg-cover bg-no-repeat" />
                <div className="z-10 ml-10 flex h-80 flex-col">
                  <h2 className="mb-3 mt-20 text-2xl font-semibold text-blue-300">
                    {mentorship.name}
                  </h2>
                  <p className="mb-6 text-sm text-gray-300">
                    Sua nave está pronta para o embarque
                  </p>
                  <Link
                    className="block rounded-lg bg-violet-400 px-24 py-4 text-lg font-semibold text-white transition-colors hover:bg-violet-600"
                    href={
                      mentorship.completedOnboarding
                        ? `/institutions/socialOrganization/${mentorship.socialOrganizationId}/dashboard/${mentorship.mentorshipId}/mission-painel`
                        : `/institutions/socialOrganization/${mentorship.socialOrganizationId}/onboarding/${mentorship.mentorshipId}/welcome`
                    }
                  >
                    Vamos lá!
                  </Link>
                </div>
                <Image
                  src={AstronautaImg}
                  alt="Foto de um astronauta"
                  className="z-10 mr-16 h-[350px] w-[347px]"
                />
              </div>
            )
          })}
        </div>
      )}

      {loaded && instanceRef.current && (
        <>
          <CaretLeft
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            className={`${
              currentSlide === 0 ? 'arrow--disabled hidden' : ''
            } arrow arrow--left absolute right-12 top-6 cursor-pointer text-blue-300`}
          />
          <CaretRight
            size={24}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className={`${
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
                ? 'arrow--disabled hidden'
                : ''
            } arrow arrow--right absolute right-4 top-6 cursor-pointer text-blue-300`}
          />
        </>
      )}
    </div>
  )
}
