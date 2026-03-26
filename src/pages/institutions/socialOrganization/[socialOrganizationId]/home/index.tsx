import React, { useEffect, useState } from 'react'
import DynamicHeader from '../../../../../components/header/DynamicHeader'
import { useQuery } from '@tanstack/react-query'
import AdventureAreaInstitution from '../../../../../components/main-painel/painel/AdventureAreaInstitution'
import { Loading } from '../../../../../components/Loading'
import AchievementsAreaInstitution from '../../../../../components/main-painel/painel/AchievementsAreaInstitution'
import CurrentAchievementInstitution from '../../../../../components/main-painel/painel/CurrentAchievementInstitution'
import CurrentMissionsInstitutionArea from '../../../../../components/main-painel/painel/CurrentMissionsInstitutionArea'
import { useHeader } from '../../../../../context/HeaderContext'
import { AchievementProps } from '../../../../../types/achievement'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { api } from '../../../../../services/api'

export default function Home() {
  const {
    setShowMenu,
    setShowOrganization,
    setRoutes,
    setOrganizationName,
    setSocialOrganizationId,
    setUserName,
    setProfilePicture,
  } = useHeader()

  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const [hasShownError, setHasShownError] = useState(false)

  async function getDashboard() {
    const payload = { socialOrganizationId: organizationId }
    const response = await api.get('/dashboard', {
      params: payload,
    })
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Erro ao buscar informações')
    }
  }

  const { data: dashboard, error } = useQuery({
    queryKey: ['dashboard', organizationId],
    queryFn: () => getDashboard(),
    enabled: !!socialOrganizationId,
    onError: () => {
      if (!hasShownError) {
        toast.error('Erro ao buscar informações!')
        setHasShownError(true)
      }
      setUserName(null)
      setOrganizationName(null)
      setSocialOrganizationId(null)
    },
    retry: false,
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
      {
        label: 'Painel Principal',
        href: `/institutions/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/home`,
      },
      {
        label: 'Equipe',
        href: `/institutions/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/team`,
      },
      {
        label: 'Sistema Estelar',
        href: `/institutions/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/starSystem`,
      },
      {
        label: 'Trocar de organização',
        href: `/institutions/socialOrganization/${
          dashboard.socialOrganization.id || 0
        }/changeOrganization`,
      },
    ])
    setUserName(dashboard.user.fullName)
    setOrganizationName(dashboard.socialOrganization.name)
    setSocialOrganizationId(dashboard.socialOrganization.id)
    setProfilePicture(dashboard.user.profilePicture)
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
      <main className="flex h-[calc(100vh-68px)] gap-6 p-6 ">
        <div className="flex w-4/6 flex-1 flex-col gap-6">
          {mentorships && mentorships.length !== 0 && (
            <CurrentMissionsInstitutionArea mentorships={mentorships} />
          )}
          <AdventureAreaInstitution
            programs={programs || []}
            user={user}
            socialOrganization={socialOrganization}
            mentorships={mentorships || []}
          />
        </div>
        <aside className="flex w-[360px] flex-col space-y-6">
          <div className="flex flex-1 flex-col gap-6 p-6">
            <CurrentAchievementInstitution
              achievements={achievements}
              socialOrganization={socialOrganization}
            />
            <div className="flex h-full max-h-[calc(100vh-408px)] flex-col rounded-lg bg-gray-200 p-6">
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
              <div className="flex-1 overflow-y-auto pr-2">
                <AchievementsAreaInstitution
                  achievements={achievements}
                  socialOrganization={socialOrganization}
                />
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
