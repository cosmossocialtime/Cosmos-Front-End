import { ArrowLeft } from 'phosphor-react'
import DynamicHeader from '../../../../../../components/header/DynamicHeader'
import Router, { useRouter } from 'next/router'
import { Button } from '../../../../../../components/Button/ButtonSubmit'
import { useHeader } from '../../../../../../context/HeaderContext'
import { useEffect } from 'react'
import { useDashboard } from '../../../../../../hooks/useDashboard'
import { MentorshipProps } from '../../../../../../types/mentorship'
import { ProgramProps } from '../../../../../../types/program'

export default function Welcome() {
  const router = useRouter()
  const { socialOrganizationId, mentorshipId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const mentorId = Number(mentorshipId || '0')
  const { dashboard } = useDashboard(organizationId)
  const mentorship = dashboard?.currentMentorships.find(
    (m: MentorshipProps) => m.mentorshipId === mentorId
  )
  const program = dashboard?.programs.find(
    (p: ProgramProps) => p.id === mentorship?.programId
  )

  const { setShowMenu, setShowOrganization } = useHeader()

  useEffect(() => {
    setShowMenu(false)
    setShowOrganization(false)
  }, [])

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <DynamicHeader />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-bgWelcomeAdventureInstitution bg-cover bg-center text-white">
        <div className="absolute left-10 top-8 z-10">
          <ArrowLeft
            className="cursor-pointer text-white"
            onClick={() => {
              setShowMenu(true)
              setShowOrganization(true)
              Router.push(
                `/institutions/socialOrganization/${organizationId}/home`
              )
            }}
            size={24}
          />
        </div>

        <div className="flex w-full max-w-6xl items-center px-4">
          <div className="rounded-lg p-8 backdrop-blur-xl">
            <p className="mb-8 text-xl text-gray-300">Olá, Cosmonauta!</p>
            <h1 className="mb-4 text-4xl">
              Boas-vindas ao programa <br />
              <span className="mb-8 text-3xl">{program?.name}</span>
            </h1>
            <p className="mb-10 text-xl text-gray-300">
              Prepare-se para uma aventura!
            </p>
            <div className="h-[48px] w-[453px]">
              <Button
                text="Vamos lá"
                onClick={() =>
                  Router.push(
                    `/institutions/socialOrganization/${organizationId}/onboarding/${mentorId}/organizationInfo`
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
