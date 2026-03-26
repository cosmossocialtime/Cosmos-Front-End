import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Router from 'next/router'
import { getFormData } from '../../utils/localStorage'
import { resendInstitutionConfirmationTemplate } from '../../lib/email/templates/templates'
import Link from 'next/link'
import { api } from '../../services/api'
import { sendEmail } from '../api/send-email'

export default function CompletedRegistration() {
  const [secondsAmount, setSecondsAmount] = useState(60)
  const [timeExpire, setTimeExpire] = useState(false)
  const [email, setEmail] = useState('')

  const minutes = Math.floor(secondsAmount / 60)
  const seconds = secondsAmount % 60

  useEffect(() => {
    if (secondsAmount > 0) {
      setTimeout(() => {
        setSecondsAmount((state) => state - 1)
      }, 1000)
    }
    if (secondsAmount === 0) {
      setTimeExpire(true)
    }
  }, [secondsAmount])

  useEffect(() => {
    const email = getFormData('cosmos.user')
    setEmail(email)
  }, [])

  async function resendCode() {
    try {
      const payload = { email: email }

      const response = await api.post('/auth/resend-confirmation', payload)

      if (response.status === 200) {
        const parsed = response.data
        const { subject, html } = resendInstitutionConfirmationTemplate(
          parsed.confirmationCode
        )
        sendEmail([email], subject, html)
          .then(() => {
            toast.success('Email reenviado')
          })
          .catch(() => {
            toast.error(
              'Não foi possivel enviar, tente novamente em alguns instantes'
            )
          })
      } else {
        toast.error(
          'Não foi possivel enviar, tente novamente em alguns instantes'
        )
      }
    } catch (error) {
      toast.error(
        'Não foi possivel enviar, tente novamente em alguns instantes'
      )
    }
  }

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <header className="p-10">
        <Link href="/user/login">
          <Image src={logo} width={190} height={190} alt="Logo cosmos" />
        </Link>
      </header>
      <main className="flex flex-col  items-center justify-center gap-6">
        <h1 className="text-3xl">Você finalizou seu cadastro!</h1>
        <span className="max-w-lg text-center">
          Ative sua conta clicando no link que enviamos para o e-mail {''}
          {email} e depois faça seu login
        </span>
        <button
          onClick={() => Router.push('/user/login')}
          className="mt-10 w-full max-w-md rounded-lg bg-violet-500 p-4 text-zinc-50 transition-colors hover:bg-violet-600"
        >
          Fazer login
        </button>
      </main>
      <footer className="mb-40 flex h-28 flex-col items-center justify-center gap-6">
        <span className="text-sm text-zinc-500">
          Caso não tenha recebido o link, verifique sua caixa de spam.
        </span>
        <button
          onClick={resendCode}
          disabled={!timeExpire}
          className={`font-semibold ${
            secondsAmount <= 0
              ? 'text-violet-500'
              : 'cursor-not-allowed text-purple-300'
          }`}
        >
          Enviar novo link em: {''}
          <span>{String(minutes).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, '0')}</span>
        </button>
      </footer>
    </div>
  )
}
