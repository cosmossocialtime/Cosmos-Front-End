import { api } from '../../services/api'
import { SignInData } from './types'

export async function authenticate({ email, password }: SignInData) {
  try {
    const request = await api.post('auth/signin', { email, password })
    return request.data
  } catch (error) {
    return null
  }
}
