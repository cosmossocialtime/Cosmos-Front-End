import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useHeader } from '../../context/HeaderContext'

interface LogoutProps {
  closeLogout: () => void
}

export function Logout({ closeLogout }: LogoutProps) {
  const auth = useAuth()
  const { resetHeader } = useHeader()

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-gray-500 mix-blend-multiply" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-10 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-blue-900 px-12 py-9 text-gray-100">
        <Dialog.Close>
          <X size={24} className="absolute right-5 top-5" />
        </Dialog.Close>
        <h1 className="mb-2 text-2xl font-semibold">
          Deseja mesmo sair da conta?
        </h1>

        <div className="mt-12 flex flex items-center gap-[32px]">
          <Dialog.Close asChild>
            <button className="w-52 rounded-lg border-2 border-solid border-gray-300 py-4 text-center font-semibold text-gray-300 transition-colors hover:border-white hover:text-white">
              Não Sair
            </button>
          </Dialog.Close>
          <button
            className="w-52 rounded-lg bg-red-500 py-4 text-center font-semibold text-white transition-colors hover:bg-red-600"
            onClick={() => {
              resetHeader()
              auth.signOut()
              closeLogout()
            }}
          >
            Sair
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
