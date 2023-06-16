import { parseCookies, setCookie } from "nookies"
import { createContext, useEffect, useState } from "react"
import { IAuthProvider, IContext, SignInData, User } from "./types"
import { authenticate } from "./util"
import { api } from "../../services/api"
import Router from 'next/router'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null)
  const isAutenticate = !!user

  async function signIn({ email, password }: SignInData) {
    const { accessToken, refreshToken } = await authenticate({ email, password })

    setCookie(undefined, 'cosmos.token', accessToken, {
      maxAge: 60 * 60 * 12
    })

    setCookie(undefined, 'cosmos.refreshToken', refreshToken)
    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

    Router.push('/user/start')
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}