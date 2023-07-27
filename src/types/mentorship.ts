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
  startDate: Date
  steps: StepProps[]
  weeklyHours: number
}
