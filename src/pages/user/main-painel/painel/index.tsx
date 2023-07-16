import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'

import { userProps } from '../../../../types/user'
import { achievementsProps } from '../../../../types/achievements'
import { programProps } from '../../../../types/program'

import Header from '../../../../components/main-painel/Header'
import CurrentAchievement from '../../../../components/main-painel/painel/CurrentAchievement'
import CurrentMissionsArea from '../../../../components/main-painel/painel/CurrentMissionsArea'
import AdventureArea from '../../../../components/main-painel/painel/AdventureArea'
import PerfilArea from '../../../../components/main-painel/painel/PerfilArea'
import AchievementsArea from '../../../../components/main-painel/painel/AchievementsArea'
import { mentorshipProps } from '../../../../types/mentorship'

export default function Painel() {
  const [user, setUser] = useState<userProps | null>(null)
  const [achievements, setAchievements] = useState<achievementsProps>([])
  const [programs, setPrograms] = useState<programProps[]>([])
  const [mentorships, setMentorships] = useState<mentorshipProps[]>([])
  //   const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get('/dashboard')
      .then((response) => {
        setUser(response.data.user)
        setAchievements(response.data.achievements)
        setPrograms(response.data.programs)
        setMentorships([response.data.currentMentorship])
        // setIsLoading(false)
      })
      .catch((error) => {
        // setIsLoading(false)
        console.error(error)
      })
  }, [])

  if (!user || !achievements || !mentorships) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 text-zinc-50">
        <h1 className="text-lg">Carregando...</h1>
      </div>
    )
  }
  return (
    <div className="flex h-screen max-w-[100vw] flex-col">
      <Header />

      <main className="flex flex-1 gap-6 bg-gray-800 px-16 py-5">
        <div className="flex w-4/6 flex-1 flex-col gap-6">
          <CurrentAchievement achievements={achievements} />

          {programs.length !== 0 && (
            <CurrentMissionsArea mentorships={mentorships} />
          )}

          <AdventureArea programs={programs} />
        </div>

        <div className="flex w-1/3 flex-col gap-6">
          <PerfilArea
            bannerPicture={user.banner}
            profilePicture={user.profilePicture}
            name={user.byname}
          />

          <div
            className={`${
              programs.length === 0 ? 'h-[17rem]' : 'h-[36rem]'
            } relative flex flex-col rounded-lg bg-[#1E2543] p-6`}
          >
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Minhas conquistas:</span>
              <span className="text-sm text-gray-500">
                <strong className="text-gray-200">
                  {
                    achievements.filter((achievement) => achievement.completed)
                      .length
                  }
                </strong>{' '}
                de 8
              </span>
            </div>

            <AchievementsArea achievements={achievements} />

            <div className="absolute left-0 right-4 bottom-0 m-6 box-border h-12 bg-gradient-to-t from-[#1E2543]"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
