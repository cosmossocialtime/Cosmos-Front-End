import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Medal from '../../../assets/medal.svg'
import LightMedal from '../../../assets/light-medal.svg'
import Image from 'next/image'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react'
import { completeAchievements } from '../../../data/completeAchievements'
import { incompleteAchievements } from '../../../data/incompleteAchievements'
import { achievementsProps } from '../../../types/achievements'

type CurrentAchievementProps = {
  achievements: achievementsProps
}

export default function CurrentAchievement({
  achievements,
}: CurrentAchievementProps) {
  const firstAchievementShow = achievements.filter(
    (achievement) => achievement.completed,
  ).length

  const [currentSlide, setCurrentSlide] = useState(firstAchievementShow)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: firstAchievementShow,
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
    <div className="navigation-wrapper relative flex min-h-[12rem] w-full justify-between rounded-lg bg-[#1E2543]">
      <div ref={sliderRef} className="keen-slider w-full">
        {achievements.map((achievement) => {
          const currentAchivement = achievement.completed
            ? completeAchievements[achievement.id - 1]
            : incompleteAchievements[achievement.id - 1]

          return (
            <div
              key={achievement.id}
              className=" keen-slider__slide flex flex-col py-6 pl-20 pr-52"
            >
              <span className="text-xl text-gray-500">
                {currentAchivement.title}
              </span>
              <strong className="mt-4 mb-2 text-2xl font-semibold text-gray-200">
                {currentAchivement.description}
              </strong>
              <span className="text-gray-200">
                {achievement.completed
                  ? 'e conquistou uma medalha'
                  : 'e conquiste uma medalha'}
              </span>
              <div className="duration-400 absolute top-1/2 right-16 z-10 -translate-y-1/2 transition-all">
                {achievement.completed && (
                  <div className="absolute h-32 w-32 rounded-full bg-white/50 blur-xl" />
                )}
                <Image
                  src={achievement.completed ? LightMedal : Medal}
                  alt="Medalha"
                  className="w-32"
                />
                <Image
                  className="absolute top-0 rounded-full border-8 border-solid border-transparent"
                  src={currentAchivement.image}
                  alt=""
                />
              </div>
            </div>
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
              currentSlide === 0 ? 'arrow--disabled hidden' : ''
            } arrow arrow--left absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-blue-300`}
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
            } arrow arrow--right absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-blue-300`}
          />
        </>
      )}
    </div>
  )
}
