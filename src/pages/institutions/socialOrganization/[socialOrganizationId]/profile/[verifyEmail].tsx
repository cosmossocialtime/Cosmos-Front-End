import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { getFormData } from '../../../../../utils/localStorage'
import { api } from '../../../../../services/api'
import axios from 'axios'

export default function VerifyEmail() {
  const router = useRouter()
  const { verifyEmail, socialOrganizationId } = router.query
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const email = getFormData('cosmos.newEmail')
    if (email) {
      setUser(email)
    } else {
      console.log('Nenhum email encontrado no LocalStorage')
    }

    if (verifyEmail !== undefined) {
      setToken(String(verifyEmail))
    }
  }, [verifyEmail])

  useEffect(() => {
    async function verifyAccount() {
      try {
        if (!user || !token) return

        const payload = { email: user, token: token }

        const response = await api.put('user-confirm-email-update', payload)

        if (response.data.statusCode === 200) {
          toast.success('E-mail validado com sucesso!')
          router.push(
            `/institutions/socialOrganization/${socialOrganizationId}/profile`
          )
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          if (status === 401 || status === 400) {
            return toast.error('Código de confirmação inválido!')
          } else {
            return toast.error('Erro ao validar e-mail.')
          }
        }
        return toast.error('Erro inesperado ao validar e-mail.')
      }
    }

    verifyAccount()
  }, [user, token, router])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900 text-zinc-50">
      <h2></h2>
      <p>Seu e-mail está sendo validado...</p>
    </div>
  )
}
