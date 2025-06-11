import { MentorshipSectorProps } from './mentorshipSector'
import { SectorProps } from './sector'

export interface Option {
  value: string
  label: string
}

export type MentorshipSocialOrganizationProps = {
  id?: number
  mentorshipId: number
  socialOrganizationId: number
  name: string
  causes: Option[]
  mentorshipSectors?: MentorshipSectorProps[]
  creationDate?: Date
  city?: string
  state?: string
  collaborators?: number
  beneficiaries?: number
  annualRevenue?: number
  history?: string
  socialImpact?: string
  mainChallenges?: string
  cnpj?: string | null
  storageId?: number
  estatutoFileLocation?: string
  directoryPathEstatuto?: string
  semCnpj?: boolean
  semEstatuto?: boolean
  foraDoBrasil?: boolean
  logo?: string
  mimeEstatuto?: string
  completedOnboarding: boolean
}
