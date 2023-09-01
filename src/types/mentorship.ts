import { StepProps } from './step'

export type MentorshipProps = {
  currentStepId: number
  description: string
  endDate: Date
  logo: string | null
  mentorshipId: number
  name: string
  programId: number
  socialOrganizationId: number
  socialOrganization: string
  startDate: Date | null
  role: string
  roleId: number
  steps: StepProps[]
  weeklyHours: number
  completedOnboarding: boolean
  volunteerId: number
}
