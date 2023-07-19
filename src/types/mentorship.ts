export type mentorshipProps = {
  currentStepId: number
  description: string
  endDate: Date
  logo: string | null
  mentorshipId: number
  name: string
  programId: number
  socialOrganizationId: number
  startDate: Date
  steps: {
    stepId: number
    step: string
    startDate: Date
    endDate: Date
  }[]
  weeklyHours: number
}
