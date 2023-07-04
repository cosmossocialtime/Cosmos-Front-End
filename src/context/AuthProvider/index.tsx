import { setCookie } from 'nookies'
import { createContext, useState } from 'react'
import { IAuthProvider, IContext, SignInData, User } from './types'
import { authenticate } from './util'
import { api } from '../../services/api'
import Router from 'next/router'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user] = useState<User | null>(null)
  const isAutenticate = !!user

  async function signIn({ email, password }: SignInData) {
    const response = await authenticate({
      email,
      password,
    })

    if (response) {
      setCookie(undefined, 'cosmos.token', response?.accessToken, {
        maxAge: 60 * 20,
      })
      setCookie(undefined, 'cosmos.refreshToken', response?.refreshToken, {
        maxAge: 60 * 20,
      })
      api.defaults.headers.Authorization = `Bearer ${response?.accessToken}`
      Router.push('/user/start')
    }
    if (!response) {
      throw new Error('Sem dados de resposta para salvar nos cookies')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
