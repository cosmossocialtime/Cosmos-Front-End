import Head from 'next/head'
import { UserRegisterForm } from '../../components/Cadastro/RegisterForm'
import Main from '../../components/Main'

export default function Cadastrar() {
  return (
    <div>
      <Head>
        <title>Cadastrar | Cosmos</title>
      </Head>
      <div className="h-screen md:flex">
        <Main />
        <UserRegisterForm />
      </div>
    </div>
  )
}
