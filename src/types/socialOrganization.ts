import { SectorProps } from './sector'

export interface Option {
  value: string
  label: string
}

export type SocialOrganizationProps = {
  id?: number
  name: string
  causes: Option[]
  sectors?: SectorProps[]
  creationDate?: Date
  city?: string
  state?: string
  collaborators?: number
  beneficiaries?: number
  annualRevenue?: number
  history?: string
  socialImpact?: string
  mainChallenges?: string
  cnpj?: string
  storageId?: number
  estatutoFileLocation?: string
  semCnpj?: boolean
  semEstatuto?: boolean
  foraDoBrasil?: boolean
}
