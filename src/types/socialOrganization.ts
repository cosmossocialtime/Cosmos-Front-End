export interface Option {
  value: string
  label: string
}

export type SocialOrganizationProps = {
  id?: number
  name: string
  causes: Option[]
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
  semCnpj?: boolean
  semEstatuto?: boolean
  foraDoBrasil?: boolean
}
