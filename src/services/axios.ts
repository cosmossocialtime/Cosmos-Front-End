import axios from 'axios'
import { parseCookies } from 'nookies'

const BASE_URL = 'http://18.222.112.130:8080/api'

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
