import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import Image from 'next/image'

import ProfilePhoto from '../../../../public/images/tripulacao/ProfileIcon.jpg'
import Arrow from './ArrowSlider'
import { useKeenSlider } from 'keen-slider/react'
import ModalContent from './CreateModal'
import Modal from './Modal'
import { cardTripulation } from '../../../data/cardTripulation'

export default function Slider() {
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },

    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  return (
    <div>
      {!openModal && (
        <div className="absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-white lg:w-80" />
      )}

      <div ref={sliderRef} className="keen-slider flex py-2">
        {cardTripulation.map((card) => {
          return (
            <Dialog.Root
              key={card.Title}
              onOpenChange={(Modal) => {
                setOpenModal(Modal)
              }}
            >
              <div className="keen-slider__slide rounded border border-gray-50 bg-gray-100 px-8 py-10 drop-shadow lg:py-20">
                <Dialog.Trigger>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h2 className="pb-2 text-left text-2xl font-semibold text-cian-500">
                        {card.Title}
                      </h2>
                      <span className="text-left text-[18px] font-medium text-indigo-500">
                        {card.name}
                      </span>
                      <span className="text-left text-indigo-500">
                        Cargo: [{card.charge}]
                      </span>
                      <span className="text-left text-indigo-500">
                        Setor: [{card.sector}]
                      </span>
                    </div>
                    <div className="h-28 w-28 overflow-hidden rounded-md">
                      <Image
                        src={ProfilePhoto}
                        alt="Imagem de perfil"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-left text-indigo-500">
                    {card.description}
                  </p>
                </Dialog.Trigger>

                <ModalContent>
                  <Modal
                    key={card.name}
                    title={card.Title}
                    name={card.name}
                    charge={card.charge}
                    description={card.description}
                    sector={card.sector}
                  />
                </ModalContent>
              </div>
            </Dialog.Root>
          )
        })}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  )
}
