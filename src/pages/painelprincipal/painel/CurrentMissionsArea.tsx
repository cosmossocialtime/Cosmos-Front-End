import { CaretRight } from 'phosphor-react';
import AstronautaImg from './assets/astronauta.png';
import { missionsData } from './data/missionsData';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import Image from 'next/image';

export function CurrentMissionsArea() {
    if (missionsData.length === 0) {
        return (
            <></>
        )
    }

    return (
        <div className="min-h-[16rem] relative p-6 bg-[#1E2543] flex flex-col rounded-lg overflow-hidden">
            <span className="text-xl text-gray-500">
                Missões atuais
            </span>

            <div>
                {missionsData.map((mission, key) => (
                    <div key={mission.id} className={`${"number-slide" + (key + 1)} keen-slider__slide flex-1 relative mt-6 p-6 bg-currentMission bg-no-repeat bg-cover rounded-lg`}>
                        <div>
                            <h2 className="mb-3 text-2xl text-gray-200 font-semibold">{mission.title}</h2>
                            <p className="mb-6 text-gray-200">{mission.description}</p>
                            <button className="py-4 px-24 bg-violet-400 text-white text-lg font-semibold rounded-lg">Vamos lá!</button>
                        </div>
                        <Image src={AstronautaImg} alt="Foto de um astronauta" className="absolute bottom-0 right-16 w-[16rem]" />
                    </div>
                ))}
            </div>

            <CaretRight size={24} className="text-blue-300 absolute right-5 top-[1.625rem] cursor-pointer transition-transform" />
        </div>
    )
}