import Router, { useRouter } from 'next/router'
import { useDashboard } from './useDashboard'
import { ProgramProps } from '../types/program'

export function useSubscribeInstitution(
  socialOrganizationId: number,
  {
    disableRedirect = false,
  }: Partial<{
    disableRedirect?: boolean
  }> = {}
) {
  const { dashboard } = useDashboard(socialOrganizationId)
  const router = useRouter()
  const { programId } = router.query

  const program =
    dashboard?.programs.find(
      (program: ProgramProps) => String(program.id) === programId
    ) || null
  const user = dashboard?.user
  const socialOrganization = dashboard?.socialOrganization

  const isSubscribed = program?.completed
  const defaultRoute = `/institutions/adventure/${programId}/subscribe/terms`

  if (isSubscribed && !disableRedirect) {
    Router.push(defaultRoute)
  }

  return { program, user, programId, socialOrganization }
}
