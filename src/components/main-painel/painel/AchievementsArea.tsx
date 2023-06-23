import Image from "next/image";
import { completeAchievements } from "../../../data/completeAchievements";
import { incompleteAchievements } from "../../../data/incompleteAchievements";
import { achievementsProps } from "../../../types/achievements";

interface AchievementsAreaProps {
    achievements: achievementsProps;
}

export default function AchievementsArea({ achievements }: AchievementsAreaProps) {
    return (
        <div className="pr-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {achievements.map(achievement => {
                const currentAchivement = achievement.completed ? completeAchievements[achievement.id - 1] : incompleteAchievements[achievement.id - 1]

                return (
                    <div key={achievement.id} className="py-4 border-0 border-b border-solid border-[#333B5B] flex items-center gap-4">
                        <Image
                            className={`${achievement.completed ? "border-blue-200" : "border-gray-500"} w-12 h-12 rounded-full border-4 border-solid `}
                            src={currentAchivement.image}
                            alt=""
                        />
                        <div>
                            <h2 className="text-gray-300 text-sm font-medium">{currentAchivement.title}</h2>
                            <p className="text-gray-500 text-xs">{currentAchivement.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}