import axios from 'axios'
import { parseCookies } from 'nookies'

const BASE_URL = 'https://api.cosmossocial.com.br/api'

export function getApiClient(ctx?: any) {
  const { 'cosmos.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: BASE_URL,
  })

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
  return api
}
