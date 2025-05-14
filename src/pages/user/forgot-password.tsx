import Head from 'next/head'
import Main from '../../components/Main'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { invokeLambda } from '../../lib/aws/invokeLambda'
import { sendEmail } from '../../lib/aws/sesSendMail'
import { forgotPasswordTemplate } from '../../lib/email/templates/templates'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const SubmitForm = async (e: FormEvent) => {
    e.preventDefault()
    setCookie(undefined, 'cosmos.user', email)
    try {
      const payload = {
        email: email,
      }
      const response = await invokeLambda<
        {
          email: string
        },
        { statusCode: number; body: string }
      >('user-forgot-password-lambda', payload)

      const parsed = JSON.parse(response.body)

      if (response.statusCode == 200) {
        const { subject, html } = forgotPasswordTemplate(
          parsed.name,
          parsed.confirmationCode
        )
        sendEmail(email, subject, html)
          .then(() => {
            toast.success(
              'Enviado um link para redefinição de senha no seu email'
            )
            Router.push('/user/completed-reset-password')
          })
          .catch((error) => {
            toast.error('Erro ao enviar email de redefinção de senha')
          })
      }
      if (response.statusCode == 401) {
        toast.error('Email inválido')
      }
    } catch (error) {
      return toast.error(
        'Não foi possivel recuperar sua senha, por favor tente novamente mais tarde'
      )
    }
  }

  return (
    <div>
      <Head>
        <title>Esqueci minha senha | Cosmos</title>
      </Head>
      <div className="h-screen md:flex">
        <Main />
        <main className="flex w-full flex-col items-center justify-center gap-2">
          <h2 className="text-3xl text-purple-600">Informe o seu email</h2>
          <form onSubmit={SubmitForm} className="mt-4 flex flex-col gap-2 p-10">
            <div className="mb-9 flex w-full max-w-md flex-col gap-3">
              <label htmlFor="email" className="text-lg">
                Para recuperar sua senha, informe o email com o qual se
                cadastrou
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                required
                placeholder="Escreva seu email aqui@email.com.br"
                className="rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 valid:border-green-500 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <button type="submit" onClick={SubmitForm} className="colorButton">
              Recuperar
            </button>
          </form>
          <span className="mt-2">
            Lembrou de sua senha?{' '}
            <strong className="font-bold text-purple-700 transition-all duration-200 hover:text-purple-600">
              <Link href="/user/login">Fazer Login</Link>
            </strong>
          </span>

          <div></div>
        </main>
      </div>
    </div>
  )
}
