import { ReactNode } from 'react'

export interface SignInData {
  email: string
  password: string
}

export interface User {
  email: string
  password: string
  avatar_url: string
}

export interface IContext {
  isAutenticate: boolean
  user: UserLogged | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
}

export interface IAuthProvider {
  children: ReactNode
}

export interface UserLogged {
  id: number
  fullName: string
  role: string
  socialOrganizations: { socialOrganizationId: number }[]
}
