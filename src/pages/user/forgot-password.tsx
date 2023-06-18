import Head from 'next/head'
import Main from '../../components/Main'
import { UserRecoveryForm } from '../../components/Recovery/RecoveryForm'

export default function ForgotPassword() {
  return (
    <div>
      <Head>
        <title>Esqueci minha senha | Cosmos</title>
      </Head>
      <div className="md:flex h-screen">
        <Main />
        <UserRecoveryForm />
      </div>
    </div>
  )
}
