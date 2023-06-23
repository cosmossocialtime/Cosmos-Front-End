import Image from 'next/image'
import logo from '../../../public/images/logo.png'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { GetServerSideProps } from 'next'
import CheckIcon from '../../../public/images/CheckCircle.svg'
import Router from 'next/router'

export default function CompletedResetPassword() {
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
    const { 'cosmos.u': email } = parseCookies()
    setEmail(email)
  }, [])

  function resendCode() {
    Router.push('/user/login')
  }

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <header className="p-10">
        <Image src={logo} width={190} height={190} alt="Logo cosmos" />
      </header>
      <main className="flex flex-col  items-center justify-center gap-6">
        <Image src={CheckIcon} height={40} width={40} alt="check icon" />
        <h1 className="text-3xl">Enviamos um email para você</h1>
        <span className="max-w-lg text-center">
          Redefina sua senha clicando no link que enviamos para o e-mail {email}{' '}
          e depois faça seu login
        </span>
        <button
          onClick={() => Router.push('/user/login')}
          className="mt-10 w-full max-w-md rounded-lg bg-violet-500 p-4 text-zinc-50 transition-colors hover:bg-violet-600"
        >
          Entrar com a minha senha nova
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
      <ToastContainer autoClose={2000} limit={3} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'cosmos.user': email } = parseCookies(ctx)

  if (!email) {
    return {
      redirect: {
        destination: '/user/register',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}