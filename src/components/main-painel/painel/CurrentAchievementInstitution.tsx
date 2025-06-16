import Image from 'next/image'
import Medal from '../../../assets/medal.svg'
import SilverMedal from '../../../assets/silver-medal.svg'
import { incompleteAchievements } from '../../../data/incompleteAchievements'
import { AchievementProps } from '../../../types/achievement'
import { SocialOrganizationProps } from '../../../types/socialOrganization'
import { useState } from 'react'
import { AboutInstitutionModal } from '../../instituition/modal/AboutInstitution'
import Link from 'next/link'

interface CurrentAchievementInstitutionProps {
  achievements: AchievementProps[]
  socialOrganization: SocialOrganizationProps
}

export default function CurrentAchievementInstitution({
  achievements,
  socialOrganization,
}: CurrentAchievementInstitutionProps) {
  const [isOpenAboutInstitution, setIsOpenAboutInstitution] = useState(false)
  const closeModalAboutInstitution = () => setIsOpenAboutInstitution(false)
  const achievement = achievements.find(
    (a, index) => !a.completed && index > 0 && achievements[index - 1].completed
  )

  const currentAchievement =
    incompleteAchievements[achievement !== undefined ? achievement.id - 1 : 0]

  //if (!achievement) return null

  return (
    <>
      {isOpenAboutInstitution && (
        <AboutInstitutionModal
          closeModal={closeModalAboutInstitution}
          socialOrganization={socialOrganization}
          isFilled={false}
        />
      )}
      <div className="flex flex-col items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="relative h-[72px] w-[51px] rounded-full">
          <Image
            src={
              achievement !== undefined && achievement.completed
                ? Medal
                : SilverMedal
            }
            alt="Medalha Incompleta"
            className="w-[51px]"
          />
          <Image
            src={currentAchievement.image}
            alt="Medalha atual"
            className="absolute left-0 top-0 rounded-full border-4 border-solid border-transparent"
          />
        </div>

        <div>
          <p
            className={`${
              achievement !== undefined && achievement.completed
                ? 'text-xl font-medium text-gray-500'
                : 'text-xl font-medium text-gray-600'
            }`}
          >
            {currentAchievement.description}
          </p>
          <p className="text-base text-gray-500">e conquiste uma medalha!</p>
          {currentAchievement.hasCompleteLink && (
            <Link
              href={currentAchievement.completeLink.replace(
                '[socialOrganizationId]',
                String(socialOrganization.id || '0')
              )}
              className="mt-2 block text-base font-semibold text-blue-400"
            >
              Completar
            </Link>
          )}
          {currentAchievement.openModal && (
            <button
              className="mt-2 block text-base font-semibold text-blue-400"
              onClick={() => setIsOpenAboutInstitution(true)}
            >
              Completar
            </button>
          )}
        </div>
      </div>
    </>
  )
}
