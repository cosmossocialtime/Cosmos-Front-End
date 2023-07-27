import Router, { useRouter } from 'next/router'
import { useDashboard } from './useDashboard'

export function useSubscribe(disableRedirect?: boolean) {
  const { dashboard } = useDashboard()
  const router = useRouter()
  const { programId } = router.query

  const program =
    dashboard?.programs.find((program) => String(program.id) === programId) ||
    null
  const user = dashboard?.user

  const isSubscribed = program?.completed
  const defaultRoute = `/user/adventure/${programId}/subscribe`

  if (isSubscribed && !disableRedirect) {
    Router.push(defaultRoute)
  }

  return { program, user, programId }
}
