import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Image from "next/image";

import ProfilePhoto from "../../../../public/images/tripulacao/ProfileIcon.jpg";
import Arrow from "./ArrowSlider";
import { useKeenSlider } from "keen-slider/react";
import ModalContent from "./CreateModal";
import Modal from "./Modal";
import { cardTripulation } from "../../../data/cardTripulation";

export default function Slider() {
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 15,
    },

    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div>
      {!openModal && (
        <div className="z-10 absolute bg-gradient-to-l from-white right-0 top-0 lg:w-80 h-full" />
      )}

      <div ref={sliderRef} className="flex keen-slider py-2">
        {cardTripulation.map((card) => {
          return (
            <Dialog.Root
              key={card.Title}
              onOpenChange={(Modal) => {
                setOpenModal(Modal);
              }}

            >
              <div className="keen-slider__slide bg-gray-100 rounded p-8 border border-gray-50 drop-shadow">
                <Dialog.Trigger>
                  <div className="flex justify-between pb-12">
                    <div className="flex flex-col">
                      <h2 className="text-cian-500 font-semibold text-2xl pb-2 text-left">
                        {card.Title}
                      </h2>
                      <span className="text-indigo-500 text-[18px] font-medium text-left">
                        {card.name}
                      </span>
                      <span className="text-left text-indigo-500">
                        Cargo: [{card.charge}]
                      </span>
                      <span className="text-left text-indigo-500">
                        Setor: [{card.sector}]
                      </span>
                    </div>
                    <div className="rounded-md overflow-hidden w-28 h-28">
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
          );
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
  );
}
