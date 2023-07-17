import { achievementProps } from './achievement'
import { companyProps } from './company'
import { mentorshipProps } from './mentorship'
import { programProps } from './program'
import { userProps } from './user'

export type dashboardProps = {
  achievements: achievementProps[]
  company: companyProps
  currentMentorship: mentorshipProps
  programs: programProps[]
  user: userProps
}
