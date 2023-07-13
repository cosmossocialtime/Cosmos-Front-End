import { CaretLeft, CaretRight } from 'phosphor-react'
import AstronautaImg from '../../../assets/astronauta.png'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { programProps } from '../../../types/program'

interface currentMissionProps {
  programs: programProps[]
}

export default function CurrentMissionsArea({ programs }: currentMissionProps) {
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
    <div className="relative flex min-h-[16rem] flex-col rounded-lg bg-[#1E2543] p-6">
      <span className="absolute text-xl text-gray-500">Missões atuais</span>

      {programs.filter((program) => program.applied).length === 0 ? (
        <div className="relative mt-10 flex h-60 items-center justify-center overflow-hidden rounded-lg bg-currentMission bg-cover bg-no-repeat">
          <h1 className="z-10 px-4 text-center text-xl font-semibold text-gray-200">
            Atualmente você não está participando de nenhuma missão. <br />{' '}
            Acesse as opções abaixo e inscreva-se em uma nova aventura!
          </h1>
        </div>
      ) : (
        <div ref={sliderRef} className="keen-slider w-full">
          {programs.map((program, key) => {
            return (
              program.applied && (
                <div
                  key={program.id}
                  className={`${
                    'number-slide' + (key + 1)
                  } keen-slider__slide relative flex flex-1 justify-between`}
                >
                  <div className="absolute bottom-0 h-60 w-full overflow-hidden rounded-lg bg-currentMission bg-cover bg-no-repeat" />
                  <div className="z-10 ml-10 flex h-60 flex-col justify-center self-end">
                    <h2 className="mb-3 text-2xl font-semibold text-gray-200">
                      {program.name}
                    </h2>
                    <p className="mb-6 text-gray-200">{program.description}</p>
                    <Link
                      className="block max-w-max rounded-lg bg-violet-400 py-4 px-24 text-lg font-semibold text-white transition-colors hover:bg-violet-600"
                      href={`/user/adventure/${program.id}/dashboard/mission-painel`}
                    >
                      Vamos lá!
                    </Link>
                  </div>
                  <Image
                    src={AstronautaImg}
                    alt="Foto de um astronauta"
                    className="z-10 mr-16 w-[19rem]"
                  />
                </div>
              )
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
