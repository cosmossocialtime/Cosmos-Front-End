import { useRouter } from 'next/router'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { getFormData } from '../../../../../utils/localStorage'

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

        const response = await invokeLambda<
          {
            email: string
            token: string
          },
          { statusCode: number; body: string }
        >('user-confirm-email-update-lambda', payload)

        if (response.statusCode === 200) {
          toast.success('E-mail validado com sucesso!')
        } else if (response.statusCode === 401 || response.statusCode === 400) {
          toast.error('Código de confirmação inválido!')
        } else {
          toast.error('Erro ao validar e-mail.')
        }

        router.push(
          `/institutions/socialOrganization/${socialOrganizationId}/profile`
        )
      } catch (error) {
        toast.error('Erro inesperado ao validar e-mail.')
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
