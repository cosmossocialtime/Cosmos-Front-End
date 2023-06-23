import { CaretLeft, CaretRight } from 'phosphor-react';
import AstronautaImg from '../../../assets/astronauta.png';
import "keen-slider/keen-slider.min.css";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { programsProps } from '../../../types/programs';

interface currentMissionProps {
    programs: programsProps
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
        <div className="min-h-[16rem] relative p-6 bg-[#1E2543] flex flex-col rounded-lg">
            <span className="absolute text-xl text-gray-500">
                Missões atuais
            </span>

            {programs.filter(program => program.applied).length === 0 ? (
                <div className='relative mt-10 h-60 flex items-center justify-center bg-currentMission bg-no-repeat bg-cover rounded-lg overflow-hidden'>
                    <h1 className='px-4 z-10 text-center text-xl text-gray-200 font-semibold'>
                        Atualmente você não está participando de nenhuma missão. <br/> Acesse as opções abaixo e inscreva-se em uma nova aventura!
                    </h1>
                </div>
            ) : (
                <div ref={sliderRef} className='keen-slider w-full'>
                    {programs.map((program, key) => {
                        return program.applied && (
                            <div key={program.id} className={`${"number-slide" + (key + 1)} keen-slider__slide relative flex-1 flex justify-between`}>
                                <div className='absolute bottom-0 w-full h-60 bg-currentMission bg-no-repeat bg-cover rounded-lg overflow-hidden' />
                                <div className='ml-10 h-60 z-10 flex flex-col justify-center self-end'>
                                    <h2 className="mb-3 text-2xl text-gray-200 font-semibold">{program.name}</h2>
                                    <p className="mb-6 text-gray-200">{program.description}</p>
                                    <Link
                                        className="block max-w-max py-4 px-24 bg-violet-400 hover:bg-violet-600 transition-colors text-white text-lg font-semibold rounded-lg"
                                        href={"/dashboard/mission-painel"}
                                    >
                                        Vamos lá!
                                    </Link>
                                </div>
                                <Image src={AstronautaImg} alt="Foto de um astronauta" className="z-10 mr-16 w-[19rem]" />
                            </div>
                        )
                    })}
                </div>
            )}

            {loaded && instanceRef.current && (
                <>
                    <CaretLeft
                        size={24}
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        className={`${currentSlide === 0 ? "arrow--disabled hidden" : ""} arrow arrow--left absolute right-12 top-6 text-blue-300 cursor-pointer`}
                    />
                    <CaretRight
                        size={24}
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                        className={`${currentSlide === instanceRef.current.track.details.slides.length - 1 ? "arrow--disabled hidden" : ""} arrow arrow--right absolute right-4 top-6 text-blue-300 cursor-pointer`}
                    />
                </>
            )}
        </div>
    )
}