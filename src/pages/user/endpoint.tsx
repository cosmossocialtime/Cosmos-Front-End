import { BackButton } from '../../components/BackButton'
import { api } from '../../services/api'
import Router from 'next/router'

export default function Decolar() {
  function handleSubmitCompletedOnboarding() {
    api
      .patch('/user/onboarding', {
        completed: true,
      })
      .finally(() => {
        Router.push('/main-painel/painel')
      })
  }

  return (
    <>
      <BackButton link="/user/live" />
      <main className="flex h-screen items-center justify-center bg-decolar bg-cover bg-bottom bg-no-repeat text-zinc-50">
        <div className="flex w-fit flex-col items-center gap-5 rounded-2xl bg-black/10 p-16 backdrop-blur-md">
          <h2 className="text-2xl">Tudo pronto para a decolagem!</h2>
          <p className="max-w-sm text-center text-xl font-light">
            Viajaremos juntos para aprender e fazer o bem, ajudando organizações
            sociais a brilharem ainda mais!
          </p>
          <button
            onClick={handleSubmitCompletedOnboarding}
            className="mt-5 w-full rounded-lg bg-violet-500 py-4 text-center text-lg transition-colors hover:bg-violet-600"
          >
            Decolar!
          </button>
        </div>
      </main>
    </>
  )
}
