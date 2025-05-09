import { UserSocialOrganizationProps } from './userSocialOrganization'

export type UserProps = {
  id?: number
  userId?: number
  fullName?: string
  byname?: string
  email?: string
  phone?: string
  gender?: string
  birthdate?: Date
  country?: boolean
  state?: string
  city?: string
  company?: string
  companyId?: number
  completedOnboarding?: boolean
  professionalExperience?: number
  professionalSector?: string
  professionalRole?: string
  availableTime?: number
  linkedinUrl?: string
  professionalPreviousExperiences?: string
  mainCompetencies?: string
  reasonToJoin?: string
  previousMentorship?: string
  banner?: string
  profilePicture?: string
  roleId?: number
  role?: {
    id?: number
    role?: string
  }
  isVerified?: boolean
  socialOrganizations?: UserSocialOrganizationProps[]
}
