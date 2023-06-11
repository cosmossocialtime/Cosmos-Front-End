import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import Medal from '../../../assets/medal.svg';
import LightMedal from '../../../assets/light-medal.svg';
import Image from 'next/image';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useState } from 'react';
import { completeAchievements } from '../../../data/completeAchievements';
import { incompleteAchievements } from '../../../data/incompleteAchievements';
import { achievementsProps } from '../../../types/achievements';

type CurrentAchievementProps = {
  achievements: achievementsProps
}

export default function CurrentAchievement({ achievements }: CurrentAchievementProps) {
  const incompleteFirstAchievement = achievements.filter(achievement => achievement.completed).length

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: incompleteFirstAchievement,
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
    <div className="min-h-[12rem] w-full navigation-wrapper relative bg-[#1E2543] rounded-lg flex justify-between">
      <div ref={sliderRef} className='keen-slider w-full'>
        {achievements.map(achievement => {
          const currentAchivement = achievement.completed ? completeAchievements[achievement.id-1] : incompleteAchievements[achievement.id-1]

          return (
            <div key={achievement.id} className=" keen-slider__slide flex flex-col py-6 pl-24 pr-52">
              <span className="text-xl text-gray-500">{currentAchivement.title}</span>
              <strong className="mt-4 mb-2 text-gray-200 font-semibold text-2xl">{currentAchivement.description}</strong>
              <span className="text-gray-200">e consquiste uma medalha</span>
              <div className="absolute top-1/2 -translate-y-1/2 right-16 z-10 transition-all duration-400">
                <Image src={achievement.completed ? LightMedal : Medal} alt="Medalha" className="w-32" />
                <Image
                  className="absolute top-0 border-8 border-solid border-transparent rounded-full"
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
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            className={`${currentSlide === 0 ? "arrow--disabled hidden" : ""} arrow arrow--left absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 cursor-pointer`}
          />
          <CaretRight
            size={24}
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            className={`${currentSlide === instanceRef.current.track.details.slides.length - 1 ? "arrow--disabled hidden" : ""} arrow arrow--right absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 cursor-pointer`}
          />
        </>
      )}

    </div>
  )
}
