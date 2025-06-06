import Image from 'next/image'
import { completeAchievements } from '../../../data/completeAchievements'
import { incompleteAchievements } from '../../../data/incompleteAchievements'
import { AchievementProps } from '../../../types/achievement'

interface AchievementsAreaInstitutionProps {
  achievements: AchievementProps[]
}

export default function AchievementsAreaInstitution({
  achievements,
}: AchievementsAreaInstitutionProps) {
  return (
    <div className="scrollbar-thin scrollbar-w-1 scrollbar-h-1/2 scrollbar-thumb-blue-300 scrollbar-track-[#8779B5]/10 scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex-1 overflow-y-auto pr-6">
      {achievements.map((achievement) => {
        const currentAchivement = achievement.completed
          ? completeAchievements[achievement.id - 1]
          : incompleteAchievements[achievement.id - 1]

        return (
          <div key={achievement.id} className="flex items-center gap-4 py-4">
            <Image
              className={`${
                achievement.completed
                  ? 'relative h-12 w-12 rounded-full bg-gradient-to-tr from-sky-400 to-purple-600 p-1'
                  : 'h-12 w-12 rounded-full border-4 border-solid border-gray-500 '
              } `}
              src={currentAchivement.image}
              alt=""
            />
            <div>
              <h2
                className={`${
                  achievement.completed
                    ? 'text-sm font-medium text-gray-800'
                    : 'text-sm text-gray-400'
                }`}
              >
                {currentAchivement.title}
              </h2>
              <p
                className={`${
                  achievement.completed
                    ? 'text-xs text-gray-500'
                    : 'text-xs text-gray-600'
                }`}
              >
                {currentAchivement.description}
              </p>
              {!achievement.completed && currentAchivement.completeLink && (
                <a
                  href="#"
                  className="mt-2 block text-xs font-semibold text-blue-400"
                >
                  Completar
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
