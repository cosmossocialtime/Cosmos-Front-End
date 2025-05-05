import React, { useEffect } from 'react'
import DynamicHeader from '../../../components/header/DynamicHeader'
import { useQuery } from '@tanstack/react-query'
import { invokeLambda } from '../../../lib/aws/invokeLambda'
import AdventureAreaInstitution from '../../../components/main-painel/painel/AdventureAreaInstitution'
import { Loading } from '../../../components/Loading'
import AchievementsAreaInstitution from '../../../components/main-painel/painel/AchievementsAreaInstitution'
import CurrentAchievementInstitution from '../../../components/main-painel/painel/CurrentAchievementInstitution'
import CurrentMissionsInstitutionArea from '../../../components/main-painel/painel/CurrentMissionsInstitutionArea'
import { useHeader } from '../../../context/HeaderContext'
import { AchievementProps } from '../../../types/achievement'

export default function Home() {
  const {
    setShowMenu,
    setShowOrganization,
    setRoutes,
    setOrganizationName,
    setUserName,
  } = useHeader()

  async function getDashboard() {
    const response = await invokeLambda<
      Record<string, never>,
      { statusCode: number; body: string }
    >('dashboard-select-lambda', {})
    return JSON.parse(response.body)
  }

  const { data: dashboard, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    onError: () => {
      setUserName('Erro ao carregar')
      setOrganizationName(null)
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  useEffect(() => {
    if (!dashboard) {
      return
    }
    setShowMenu(true)
    setShowOrganization(true)
    setRoutes([
      { label: 'Painel Principal', href: '/institutions/painel' },
      {
        label: 'Equipe',
        href: `/institutions/painel/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/team`,
      },
      {
        label: 'Sistema Estelar',
        href: `/institutions/painel/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/starSystem`,
      },
      {
        label: 'Trocar de organização',
        href: `/institutions/painel/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/changeOrganization`,
      },
    ])
    setUserName(dashboard.user.fullName)
    setOrganizationName(dashboard.socialOrganization.name)
  }, [dashboard])

  if (!dashboard) {
    return <Loading />
  }

  const achievements = dashboard.achievements
  const user = dashboard.user
  const programs = dashboard.programs
  const mentorships = dashboard.currentMentorships
  const socialOrganization = dashboard.socialOrganization

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-200 text-gray-800">
      <DynamicHeader />
      <main className="flex gap-6 p-6">
        <div className="flex w-4/6 flex-1 flex-col gap-6">
          {mentorships && mentorships.length !== 0 && (
            <CurrentMissionsInstitutionArea mentorships={mentorships} />
          )}
          <AdventureAreaInstitution
            programs={programs || []}
            user={user}
            socialOrganization={socialOrganization}
          />
        </div>
        <aside className="w-[360px] space-y-6">
          <div className="flex w-[360px] flex-col gap-6 p-6">
            <CurrentAchievementInstitution achievements={achievements} />
            <div
              className={`${
                mentorships?.length === 0 ? 'h-[17rem]' : 'h-[36rem]'
              } relative flex flex-col rounded-lg bg-gray-200 p-6`}
            >
              <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                <span className="text-gray-700">Minhas conquistas:</span>
                <span className="text-sm text-gray-700">
                  <strong className="text-blue-400">
                    {
                      achievements?.filter(
                        (achievement: AchievementProps) => achievement.completed
                      ).length
                    }
                  </strong>{' '}
                  de {achievements?.length}
                </span>
              </div>
              <AchievementsAreaInstitution achievements={achievements} />
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
