import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, useEffect, useRef, useState } from 'react'
import { IAuthProvider, IContext, SignInData, UserLogged } from './types'
import Router from 'next/router'
import jwtDecode from 'jwt-decode'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { publicRoutes } from '../../utils/publicRoutes'
import { saveFormData } from '../../utils/localStorage'
import { toast } from 'react-toastify'
import { api } from '../../services/api'

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
  const justSignedIn = useRef(false)
  const windowId = useRef(`${Date.now()}-${Math.random()}`).current

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'force-logout' && event.newValue) {
        try {
          const { source } = JSON.parse(event.newValue)
          if (source !== windowId) {
            toast.error(
              'Você foi deslogado da aplicação, favor realizar login novamente'
            )
            internalSignOut()
          }
        } catch (err) {
          console.error('Erro ao processar logout de outra aba', err)
        }
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [router])

  /*useEffect(() => {
    const { 'cosmos.token': token } = parseCookies()

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        const isExpired = decoded.exp * 1000 < Date.now()

        if (isExpired) {
          internalSignOut()
        } else {
          setUser({
            id: decoded.id,
            fullName: decoded.fullName,
            role: decoded.role,
            socialOrganizations: decoded.socialOrganizations,
          })
        }
      } catch {
        internalSignOut()
      }
    } else {
      internalSignOut()
    }
  }, [])*/

  // Verifica token na inicialização
  useEffect(() => {
    if (justSignedIn.current) {
      // Evita execução logo após login
      return
    }

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
            if (!isPublicRoute) {
              router.push(
                `/user/login?redirect=${encodeURIComponent(fullPath)}`
              )
            }
          } else {
            setUser({
              id: decoded.id,
              fullName: decoded.fullName,
              role: decoded.role,
              socialOrganizations: decoded.socialOrganizations,
            })
          }
        } catch (error) {
          internalSignOut()
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

  function getWindowName(): string {
    if (typeof window !== 'undefined') {
      if (!window.name) {
        window.name = crypto.randomUUID()
      }
      return window.name
    }
    return ''
  }

  function normalizePath(path: string) {
    return path.replace(/\/+$/, '') // remove barra final
  }

  async function signIn(
    { email, password }: SignInData,
    socialOrganizationId: string | null
  ) {
    const response = await api.post('/auth/login', { email, password })

    const res = response.data

    if (!res) {
      throw new Error('Sem dados de resposta para salvar nos cookies')
    }

    const decoded: DecodedToken = jwtDecode(res.accessToken)
    const windowId = `${Date.now()}-${Math.random()}`

    saveFormData(
      'force-logout',
      JSON.stringify({ source: windowId, timestamp: Date.now() })
    )

    setTimeout(() => {
      setCookie(undefined, 'cosmos.token', res.accessToken, { path: '/' })
      setCookie(undefined, 'cosmos.refreshToken', res.refreshToken, {
        path: '/',
      })

      setUser({
        id: decoded.id,
        fullName: decoded.fullName,
        role: decoded.role,
        socialOrganizations: decoded.socialOrganizations,
      })

      saveFormData(
        'auth-event',
        JSON.stringify({
          type: 'login',
          timestamp: Date.now(),
          source: getWindowName(),
        })
      )

      justSignedIn.current = true

      if (socialOrganizationId !== null) {
        Router.push(
          `/institutions/socialOrganization/register/aboutYou?member=1&socialOrganizationId=${socialOrganizationId}`
        )
        return
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
        Router.push(
          '/institutions/socialOrganization/register/aboutOrganization'
        )
      }
    }, 300)
  }

  function internalSignOut() {
    destroyCookie(null, 'cosmos.token', { path: '/' })
    destroyCookie(null, 'cosmos.refreshToken', { path: '/' })
    setUser(null)
    Router.push('/user/login')
  }

  function signOut() {
    internalSignOut()

    if (typeof window !== 'undefined') {
      saveFormData(
        'auth-event',
        JSON.stringify({
          type: 'logout',
          timestamp: Date.now(),
          source: getWindowName(),
        })
      )
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
