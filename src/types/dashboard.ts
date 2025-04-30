import { AchievementProps } from './achievement'
import { CompanyProps } from './company'
import { MentorshipProps } from './mentorship'
import { ProgramProps } from './program'
import { SocialOrganizationProps } from './socialOrganization'
import { UserProps } from './user'

export type DashboardProps = {
  achievements: AchievementProps[]
  company: CompanyProps
  socialOrganization: SocialOrganizationProps
  currentMentorships: MentorshipProps[]
  programs: ProgramProps[]
  user: UserProps
}
