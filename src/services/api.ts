import { getApiClient } from './axios'
import { parseCookies, setCookie } from 'nookies'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'
import axios from 'axios'

export const api = getApiClient()

async function renewToken(refreshToken: string) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {},
    {
      headers: { RefreshToken: refreshToken },
    }
  )
}

type userExpiration = {
  exp: number
}

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies()
  const token = cookies['cosmos.token']
  const refreshToken = cookies['cosmos.refreshToken']

  if (token) {
    const user = jwtDecode<userExpiration>(token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (isExpired && refreshToken) {
      try {
        const response = await renewToken(refreshToken)
        const { accessToken: newToken, refreshToken: newRefreshToken } =
          response.data

        setCookie(undefined, 'cosmos.token', newToken, { path: '/' })
        setCookie(undefined, 'cosmos.refreshToken', newRefreshToken, {
          path: '/',
        })

        config.headers.Authorization = `Bearer ${newToken}`
        return config
      } catch (err) {
        console.error('Erro ao renovar token', err)
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})
