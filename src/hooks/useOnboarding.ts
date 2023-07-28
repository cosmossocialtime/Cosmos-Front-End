import { useRouter } from 'next/router'
import { useDashboard } from './useDashboard'

export function useOnboarding() {
  const router = useRouter()

  const { dashboard } = useDashboard()
  const { programId } = router.query

  const program =
    dashboard?.programs.find((program) => String(program.id) === programId) ||
    null
  const user = dashboard?.user
  const company = dashboard?.company
  const currentMentorship = dashboard?.currentMentorship

  return { program, user, company, currentMentorship, programId }
}
