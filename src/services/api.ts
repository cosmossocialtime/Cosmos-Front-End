import { getApiClient } from './axios'
import { parseCookies, setCookie } from 'nookies'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'
import axios from 'axios'

export const api = getApiClient()

const { 'cosmos.refreshToken': RefreshToken } = parseCookies()
const { 'cosmos.token': Token } = parseCookies()

type userExpiration = {
  exp: number
}

async function renewToken() {
  const response = await axios({
    method: 'post',
    url: 'https://api.cosmossocial.com.br/api/auth/refreshToken',
    headers: { RefreshToken },
  })

  return response
}

api.interceptors.request.use(async (req) => {
  if (Token) {
    const user: userExpiration = jwtDecode(Token)
    const isExpire = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (isExpire) {
      const newToken = await renewToken()
      api.defaults.headers.Authorization = `Bearer ${newToken.data.accessToken}`
      setCookie(undefined, 'cosmos.token', newToken.data.accessToken, {
        maxAge: 60 * 25,
      })
      setCookie(undefined, 'cosmos.refreshToken', newToken.data.refreshToken, {
        maxAge: 60 * 25,
      })
    }
    if (!isExpire) return req
  }

  return req
})
