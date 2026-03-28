import axios from 'axios'
import { parseCookies } from 'nookies'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export function getApiClient(ctx?: any) {
  const { 'cosmos.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: BASE_URL,
  })

  api.interceptors.request.use((config) => {
    const cookies = parseCookies(ctx)
    const token = cookies['cosmos.token']

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
  return api
}
