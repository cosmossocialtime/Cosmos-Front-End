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
    <div className="relative mt-4 flex flex-col rounded-lg ">
      <h2 className="mb-8 px-2 text-lg text-gray-600 md:px-0">
        Missões atuais
      </h2>

      {mentorships.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg bg-currentMission bg-cover bg-no-repeat px-6 text-center">
          <p className="text-xl font-semibold text-gray-200">
            Atualmente você não está participando de nenhuma missão. <br />
            Acesse as opções abaixo e inscreva-se em uma nova aventura!
          </p>
        </div>
      ) : (
        <>
          <div className="absolute right-12 top-0 z-10 hidden translate-y-[20px] md:block">
            <Image
              src={AstronautaImg}
              alt="Astronauta"
              className="h-[340px] w-auto object-contain"
            />
          </div>
          <div
            ref={sliderRef}
            className="keen-slider relative w-full overflow-visible rounded-lg"
          >
            {mentorships.map((mentorship, key) => (
              <div
                key={mentorship.mentorshipId}
                className="keen-slider__slide relative h-[300px] overflow-visible rounded-lg [&_.keen-slider__slide]:overflow-visible"
              >
                <div className="absolute inset-0 rounded-lg bg-currentMissionInstitution bg-cover bg-no-repeat" />

                <div className="relative z-20 flex h-full flex-col justify-between py-8 pl-12 md:w-1/2">
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-300">
                      {mentorship.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-300">
                      Sua nave está pronta para o embarque
                    </p>
                  </div>

                  <Link
                    className="mb-6 mt-6 w-[240px] rounded-lg bg-violet-400 py-3 text-center text-base font-semibold text-white transition hover:bg-violet-600"
                    href={
                      mentorship.completedOnboarding
                        ? `/institutions/socialOrganization/${mentorship.socialOrganizationId}/dashboard/${mentorship.mentorshipId}/mission-painel`
                        : `/institutions/socialOrganization/${mentorship.socialOrganizationId}/onboarding/${mentorship.mentorshipId}/welcome`
                    }
                  >
                    Vamos lá!
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {loaded && instanceRef.current && mentorships.length > 1 && (
        <>
          <div className="absolute right-0 top-0 z-20 flex items-center gap-2 px-3 py-1 text-sm text-gray-700">
            <CaretLeft
              size={24}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              className={`cursor-pointer text-blue-400 ${
                currentSlide === 0 ? 'cursor-default opacity-30' : ''
              }`}
            />

            <span className="text-sm font-semibold text-blue-400">
              {currentSlide + 1}
            </span>
            <span className="text-sm text-gray-300">
              {' '}
              de {instanceRef.current.track.details.slides.length}
            </span>

            <CaretRight
              size={24}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              className={`cursor-pointer text-blue-400 ${
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
                  ? 'cursor-default opacity-30'
                  : ''
              }`}
            />
          </div>
        </>
      )}
    </div>
  )
}
