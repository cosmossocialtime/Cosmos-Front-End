import { createContext, useEffect, useState } from "react"
import { IAuthProvider, IContext, IUser } from "./types"
import { getUserLocalStorage, loginRequest, setRefreshTokenUser, setTokenUser, setUserLocalStorage } from "./util"

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>()

  useEffect(() => {
    const user = getUserLocalStorage()
    if (user) {
      setUser(user)
    }
  }, [])

  async function authenticate(email: string, password: string) {
    const response = await loginRequest(email, password)
    const payload = { accessToken: response.accessToken, refreshToken: response.refreshToken, email }
    setUser(payload)
    setUserLocalStorage(payload)
    setTokenUser(payload)
    setRefreshTokenUser(payload)
  }

  function logout() { setUser(null), setUserLocalStorage(null) }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}