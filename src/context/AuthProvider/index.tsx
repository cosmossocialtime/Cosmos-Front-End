import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { IAuthProvider, IContext, SignInData, UserLogged } from './types'
import { api } from '../../services/api'
import { invokeLambda } from '../../lib/aws/invokeLambda'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'

export const AuthContext = createContext<IContext>({} as IContext)

type DecodedToken = {
  id: number
  exp: number
  iat: number
  socialOrganizations: { socialOrganizationId: number }[]
  fullName: string
  role: string
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<UserLogged | null>(null)
  const isAutenticate = !!user

  // Verifica token na inicialização
  useEffect(() => {
    const { 'cosmos.token': token } = parseCookies()

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)

        // Verifica se o token está expirado
        const isExpired = decoded.exp * 1000 < Date.now()
        if (isExpired) {
          signOut()
        } else {
          setUser({
            id: decoded.id,
            fullName: decoded.fullName,
            role: decoded.role,
            socialOrganizations: decoded.socialOrganizations,
          })

          api.defaults.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        signOut()
      }
    } /*else {
      Router.push('/user/login') // sem token
    }*/
  }, [])

  async function signIn({ email, password }: SignInData) {
    const payload = { email, password }
    const response = await invokeLambda<
      typeof payload,
      { statusCode: number; body: string }
    >('user-login-lambda', payload)

    const res = JSON.parse(response.body)

    if (!res) {
      throw new Error('Sem dados de resposta para salvar nos cookies')
    }

    const decoded: DecodedToken = jwtDecode(res.accessToken)

    setCookie(undefined, 'cosmos.token', res.accessToken, { path: '/' })
    setCookie(undefined, 'cosmos.refreshToken', res.refreshToken, {
      path: '/',
    })

    api.defaults.headers.Authorization = `Bearer ${res.accessToken}`

    setUser({
      id: decoded.id,
      fullName: decoded.fullName,
      role: decoded.role,
      socialOrganizations: decoded.socialOrganizations,
    })

    // Redirecionamento pós-login
    if (decoded.role === 'volunteer') {
      Router.push('/user/onboarding/start')
    } else if (decoded.socialOrganizations.length === 1) {
      if (decoded.fullName) {
        Router.push(
          `/institutions/socialOrganization/${decoded.socialOrganizations[0].socialOrganizationId}/home`
        )
      } else {
        Router.push(
          `/institutions/socialOrganization/register/onboarding/aboutYou?member=1&socialOrganizationId=${decoded.socialOrganizations[0].socialOrganizationId}`
        )
      }
    } else if (decoded.socialOrganizations.length > 1) {
      Router.push('/institutions/socialOrganization/selectOrganization')
    } else {
      Router.push('/institutions/socialOrganization/register/aboutOrganization')
    }
  }

  function signOut() {
    destroyCookie(undefined, 'cosmos.token')
    destroyCookie(undefined, 'cosmos.refreshToken')
    setUser(null)
    Router.push('/user/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
