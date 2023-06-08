import Image from "next/image";
import { completeAchievements } from "../../../data/completeAchievements";
import { incompleteAchievements } from "../../../data/incompleteAchievements";

interface AchievementsAreaProps {
    openMission: string;
}

export default function AchievementsArea({ openMission }: AchievementsAreaProps) {
    return (
        <div className="relative p-6 bg-[#1E2543] rounded-lg overflow-hidden">
            <div className="flex justify-between">
                <span className="text-gray-500">Minhas conquistas:</span>
                <span className="text-sm text-gray-500">
                    <strong className="text-gray-200">{completeAchievements.length}</strong> de 9
                </span>
            </div>

            <div className="pr-6 h-[29rem] mt-2 overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                {completeAchievements.map(achievement => (
                    <div key={achievement.id} className="py-4 border-0 border-b border-solid border-[#333B5B] flex items-center gap-4">
                        <Image
                            className="w-12 h-12 rounded-full border-4 border-solid border-blue-200"
                            src={achievement.image}
                            alt=""
                        />
                        <div>
                            <h2 className="text-gray-300 text-sm font-medium">{achievement.title}</h2>
                            <p className="text-gray-500 text-xs">{achievement.description}</p>
                        </div>
                    </div>
                ))}
                {incompleteAchievements.map(achievement => (
                    <div key={achievement.id} className="py-4 border-0 border-b border-solid border-[#333B5B] flex items-center gap-4">
                        <Image
                            className="w-12 h-12 rounded-full border-4 border-solid border-gray-500"
                            src={achievement.image}
                            alt=""
                        />
                        <div>
                            <h2 className="text-gray-300 text-sm font-medium">{achievement.title}</h2>
                            <p className="text-gray-500 text-xs">{achievement.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute box-border left-0 right-4 bottom-0 m-6 h-12 bg-gradient-to-t from-[#1E2543]"></div>
        </div>
    )
}