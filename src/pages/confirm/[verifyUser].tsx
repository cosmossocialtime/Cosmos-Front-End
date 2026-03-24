import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { getFormData } from '../../utils/localStorage'
import { api } from '../../services/api'
import axios from 'axios'

export default function VerifyUser() {
  const router = useRouter()
  const { verifyUser } = router.query
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const email = getFormData('cosmos.user')
    if (email) {
      setUser(email)
    } else {
      console.log('Nenhum email encontrado no LocalStorage')
    }

    if (verifyUser !== undefined) {
      setToken(String(verifyUser))
    }
  }, [verifyUser])

  useEffect(() => {
    async function verifyAccount() {
      try {
        if (!user || !token) return

        const payload = { email: user, token: token }

        const response = await api.post('user-verify', payload)

        if (response.data.statusCode === 200) {
          toast.success('Usuário validado com sucesso!')
          router.push('/user/login')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
          if (status === 401) {
            return toast.error('Código de confirmação inválido!')
          } else if (status === 404) {
            return toast.error('Usuário já foi verificado!')
          } else {
            return toast.error('Erro ao validar usuário.')
          }
        }
        return toast.error('Erro inesperado ao validar usuário.')
      }
    }

    verifyAccount()
  }, [user, token, router])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-900 text-zinc-50">
      <h2></h2>
      <p>Sua conta está sendo ativada...</p>
    </div>
  )
}
