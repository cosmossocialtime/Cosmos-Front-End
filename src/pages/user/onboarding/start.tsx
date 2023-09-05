/* eslint-disable @next/next/no-img-element */
import Router from 'next/router'
import useFetch from '../../../hooks/useFetch'

interface UserProps {
  user: {
    completedOnboarding: boolean
  }
}

export default function Iniciar() {
  const { data } = useFetch<UserProps>(
    'https://api.cosmossocial.com.br/api/dashboard',
  )
  const completedOboarding = data?.user.completedOnboarding
  if (completedOboarding) {
    Router.push('/user/painel')
  }

  return (
    <main className="flex h-screen items-center justify-center bg-espaco bg-cover bg-no-repeat p-4 text-white">
      <div className="flex flex-col items-center gap-10 rounded-2xl bg-black/10 p-10 backdrop-blur-md">
        <h2 className="text-4xl font-semibold">Boas-vindas, Cosmonauta!</h2>
        <p className="max-w-sm text-center text-xl font-light">
          Antes de começarmos, precisamos saber um pouco mais sobre você
        </p>
        <a
          className=" rounded-lg bg-violet-500 px-40 py-4 text-lg font-semibold transition-all duration-150 hover:bg-violet-600"
          href={'/user/onboarding/gender'}
        >
          Vamos lá
        </a>
      </div>
      <img
        className="z-10 -ml-10 h-fit w-1/3"
        src="/images/satelite.png"
        alt="Imagem de um satélite"
      />
    </main>
  )
}
