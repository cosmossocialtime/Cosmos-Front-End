import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { IAuthProvider, IContext, SignInData, UserLogged } from './types'
import { api } from '../../services/api'
import { invokeLambda } from '../../lib/aws/invokeLambda'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { publicRoutes } from '../../utils/publicRoutes'

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Verifica token na inicialização
  useEffect(() => {
    if (pathname) {
      const { 'cosmos.token': token } = parseCookies()
      const fullPath = `${window.location.pathname}${window.location.search}`

      const isPublicRoute = publicRoutes.some((route) =>
        normalizePath(pathname || '').startsWith(normalizePath(route))
      )

      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token)

          // Verifica se o token está expirado
          const isExpired = decoded.exp * 1000 < Date.now()

          if (isExpired) {
            router.push(`/user/login?redirect=${encodeURIComponent(fullPath)}`)
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
      } else {
        // Só redireciona para login se estiver numa rota privada
        if (!isPublicRoute) {
          router.push(`/user/login?redirect=${encodeURIComponent(fullPath)}`)
        }
        return
      }
    }
  }, [pathname])

  function normalizePath(path: string) {
    return path.replace(/\/+$/, '') // remove barra final
  }

  async function signIn(
    { email, password }: SignInData,
    socialOrganizationId: string | null
  ) {
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

    if (socialOrganizationId !== null) {
      Router.push(
        `/institutions/socialOrganization/register/aboutYou?member=1&socialOrganizationId=${socialOrganizationId}`
      )
    }

    const redirect = searchParams?.get('redirect')

    if (redirect) {
      router.push(redirect)
      return
    }

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
          `/institutions/socialOrganization/register/aboutYou?member=1&socialOrganizationId=${decoded.socialOrganizations[0].socialOrganizationId}`
        )
      }
    } else if (decoded.socialOrganizations.length > 1) {
      Router.push('/institutions/socialOrganization/selectOrganization')
    } else {
      Router.push('/institutions/socialOrganization/register/aboutOrganization')
    }
  }

  function signOut() {
    destroyCookie(null, 'cosmos.token', {
      path: '/',
    })
    destroyCookie(null, 'cosmos.refreshToken', {
      path: '/',
    })
    setUser(null)
    Router.push('/user/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
