export type UserProps = {
  id: number
  userId: number
  fullName: string
  byname: string
  email: string
  gender: string
  birthdate: Date
  country: boolean
  state: string
  city: string
  company: string
  companyId: number
  socialOrganizationId: number | null
  completedOnboarding: boolean
  professionalExperience: number | null
  professionalSector: string | null
  professionalRole: string | null
  availableTime: number | null
  linkedinUrl: string | null
  professionalPreviousExperiences: string | null
  mainCompetencies: string | null
  reasonToJoin: string | null
  previousMentorship: string | null
  banner: string | null
  profilePicture: string | null
  roleId: number
  role: {
    id: number
    role: string
  }
  isVerified: boolean
}
