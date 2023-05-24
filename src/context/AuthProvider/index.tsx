import { setCookie, parseCookies } from "nookies"
import { createContext, useEffect, useState } from "react"
import { IAuthProvider, IContext, SignInData, User } from "./types"
import { authenticate } from "./util"
import Router from 'next/router'

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null)
  const isAutenticate = !!user

  async function signIn({ email, password }: SignInData) {
    const { accessToken, user } = await authenticate({ email, password })

    setCookie(undefined, 'cosmos.token', accessToken, {
      maxAge: 60 * 60 * 12 // 1 Dia 
    })
    setUser(user)
    Router.push('/usuario/iniciar')
  }

  return (
    <AuthContext.Provider value={{ user, isAutenticate, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}