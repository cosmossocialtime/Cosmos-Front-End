import Image from 'next/image'
import { completeAchievements } from '../../../data/completeAchievements'
import { incompleteAchievements } from '../../../data/incompleteAchievements'
import { achievementProps } from '../../../types/achievement'

interface AchievementsAreaProps {
  achievements: achievementProps[]
}

export default function AchievementsArea({
  achievements,
}: AchievementsAreaProps) {
  return (
    <div className="scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex-1 overflow-y-auto pr-6">
      {achievements.map((achievement) => {
        const currentAchivement = achievement.completed
          ? completeAchievements[achievement.id - 1]
          : incompleteAchievements[achievement.id - 1]

        return (
          <div
            key={achievement.id}
            className="flex items-center gap-4 border-0 border-b border-solid border-[#333B5B] py-4"
          >
            <Image
              className={`${
                achievement.completed ? 'border-blue-200' : 'border-gray-500'
              } h-12 w-12 rounded-full border-4 border-solid `}
              src={currentAchivement.image}
              alt=""
            />
            <div>
              <h2 className="text-sm font-medium text-gray-300">
                {currentAchivement.title}
              </h2>
              <p className="text-xs text-gray-500">
                {currentAchivement.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
