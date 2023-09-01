import Header from '../../../components/main-painel/Header'
import CurrentAchievement from '../../../components/main-painel/painel/CurrentAchievement'
import CurrentMissionsArea from '../../../components/main-painel/painel/CurrentMissionsArea'
import AdventureArea from '../../../components/main-painel/painel/AdventureArea'
import PerfilArea from '../../../components/main-painel/painel/PerfilArea'
import AchievementsArea from '../../../components/main-painel/painel/AchievementsArea'
import { Loading } from '../../../components/Loading'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../services/api'
import { DashboardProps } from '../../../types/dashboard'

export default function Painel() {
  async function getDashboard() {
    const response = await api.get<DashboardProps>('/dashboard')

    return response.data
  }

  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  })

  if (!dashboard) {
    return <Loading />
  }

  const achievements = dashboard.achievements
  const user = dashboard.user
  const programs = dashboard.programs
  const mentorships = dashboard.currentMentorships

  return (
    <div className="flex h-screen max-w-[100vw] flex-col">
      <Header />

      <main className="flex flex-1 gap-6 bg-gray-800 px-16 py-5">
        <div className="flex w-4/6 flex-1 flex-col gap-6">
          <CurrentAchievement achievements={achievements} />

          {mentorships.length !== 0 && (
            <CurrentMissionsArea mentorships={mentorships} />
          )}

          <AdventureArea programs={programs} />
        </div>

        <div className="flex w-1/3 flex-col gap-6">
          <div className="relative flex flex-1 flex-col items-center overflow-hidden rounded-lg bg-[#1E2543] py-11 pb-7">
            <PerfilArea
              bannerPicture={user.banner}
              profilePicture={user.profilePicture}
              name={user.byname}
            />
          </div>

          <div
            className={`${
              mentorships?.length === 0 ? 'h-[17rem]' : 'h-[36rem]'
            } relative flex flex-col rounded-lg bg-[#1E2543] p-6`}
          >
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500">Minhas conquistas:</span>
              <span className="text-sm text-gray-500">
                <strong className="text-gray-200">
                  {
                    achievements?.filter((achievement) => achievement.completed)
                      .length
                  }
                </strong>{' '}
                de 8
              </span>
            </div>
            <AchievementsArea achievements={achievements} />

            <div className="absolute bottom-0 left-0 right-4 m-6 box-border h-12 bg-gradient-to-t from-[#1E2543]"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
