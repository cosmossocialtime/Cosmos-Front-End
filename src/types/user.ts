export type userProps = {
  id: number
  email: string
  isVerified: boolean
  byname: string
  fullName: string
  gender: string
  birthdate: Date
  country: boolean
  state: string
  city: string
  company: string
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
  role: {
    id: number
    role: string
  }
}
