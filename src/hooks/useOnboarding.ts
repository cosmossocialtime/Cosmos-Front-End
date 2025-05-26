import { useRouter } from 'next/router'
import { useDashboard } from './useDashboard'
import { MentorshipProps } from '../types/mentorship'

export function useOnboarding() {
  const router = useRouter()

  const { dashboard } = useDashboard(null)
  const { mentorshipId } = router.query

  // const program =
  //   dashboard?.programs.find((program) => String(program.id) === programId) ||
  //   null
  const user = dashboard?.user
  const company = dashboard?.company
  const currentMentorship = dashboard?.currentMentorships.find(
    (mentorship: MentorshipProps) =>
      String(mentorship.mentorshipId) === mentorshipId
  )

  const rootRoute = `/user/adventure/onboarding/${mentorshipId}`

  return { user, company, currentMentorship, mentorshipId, rootRoute }
}
