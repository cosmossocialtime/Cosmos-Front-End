import Medal from '../../../assets/medal.svg';
import LightMedal from '../../../assets/light-medal.svg';
import Image from 'next/image';
import achievementsData from '../../../data/achievementData';


export default function CurrentAchievement() {
    const nextAchievement = achievementsData.find(achievement => achievement.status == false)

    console.log(nextAchievement?.imageOn)
    return (
        <div className="relative p-6 pr-9 bg-[#1E2543] rounded-lg flex justify-between">
            <div className="flex flex-col">
                <span className="text-xl text-gray-500">{nextAchievement?.title}</span>
                <strong className="mt-4 mb-2 text-gray-200 font-semibold text-2xl">{nextAchievement?.description}</strong>
                <span className="text-gray-200">e consquiste uma medalha</span>
            </div>
            <div className={`${false ? "scale-125 opacity-0" : "opacity-100 scale-1"} absolute -top-1 right-9 z-10 transition-all duration-400`}>
                <Image src={LightMedal} alt="Medalha" className="w-32" />
                <Image
                    className="absolute top-0 border-8 border-solid border-transparent rounded-full"
                    src={nextAchievement?.imageOn}
                    alt=""
                />
            </div>
            {/* <div className={`absolute -top-1 right-9 z-10 transition-all duration-400`}>
                <Image src={Medal} alt="Medalha" className="w-32" />
                <Image src={nextAchievement?.imageOff} alt="" className="absolute top-0 border-8 border-transparent rounded-full" />
            </div> */}


        </div>
    )
}