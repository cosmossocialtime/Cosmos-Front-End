export type UserSocialOrganizationProps = {
  id?: number
  userId: number
  socialOrganizationId: number
  socialOrganizationName?: string
  professionalSector?: string
  professionalRole?: string
  roleId?: number
  role?: {
    id?: number
    role?: string
  }
}
