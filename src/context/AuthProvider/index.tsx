import { setCookie } from 'nookies'
import { createContext, useState } from 'react'
import { IAuthProvider, IContext, SignInData, User } from './types'
import { api } from '../../services/api'
import { invokeLambda } from '../../lib/aws/invokeLambda'
import Router from 'next/router'
import { useRouter } from 'next/navigation'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user] = useState<User | null>(null)
  const isAutenticate = !!user
  const router = useRouter()

  async function signIn({ email, password }: SignInData) {
    const payload = { email: email, password: password }
    const response = await invokeLambda<
      {
        email: string
        password: string
      },
      { statusCode: number; body: string }
    >('user-login-lambda', payload)
    const res = JSON.parse(response.body)

    if (res) {
      const decoded: {
        id: number
        exp: number
        iat: number
        socialOrganizationId: number
        fullName: string
        role: string
      } = jwtDecode(res?.accessToken)
      setCookie(undefined, 'cosmos.token', res?.accessToken, {
        path: '/',
      })
      setCookie(undefined, 'cosmos.refreshToken', res?.refreshToken, {
        path: '/',
      })
      api.defaults.headers.Authorization = `Bearer ${res?.accessToken}`
      if (decoded.role === 'volunteer') {
        Router.push('/user/onboarding/start')
      } else {
        if (decoded.socialOrganizationId && decoded.socialOrganizationId > 0) {
          if (decoded.fullName !== null && decoded.fullName !== '') {
            Router.push('/institutions/painel')
          } else {
            router.push('/institutions/onboarding/aboutYou?member=1')
          }
        } else {
          Router.push('/institutions/onboarding/aboutOrganization')
        }
      }
    }
    if (!res) {
      throw new Error('Sem dados de resposta para salvar nos cookies')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
