import { X } from 'phosphor-react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { useHeader } from '../context/HeaderContext'

interface LogoutConfirmationProps {
  closeModal: () => void
}

export const LogoutConfirmation = ({ closeModal }: LogoutConfirmationProps) => {
  const auth = useAuth()
  const { resetHeader } = useHeader()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <section className="flex h-screen w-full items-center justify-center">
        <section
          className="relative h-[223px] rounded-lg bg-white p-8 md:w-[640px]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Deseja mesmo sair da conta?
          </h1>

          <p className="text-m mb-6 text-gray-500">
            Você poderá entrar nela novamente depois
          </p>

          {/* Botões */}
          <div className="justify-left mt-12 flex gap-[32px]">
            <button
              onClick={() => {
                resetHeader()
                auth.signOut()
                closeModal()
              }}
              className="h-[48px] w-[240px] rounded-md bg-red-500 font-semibold text-white transition-colors hover:bg-red-600"
            >
              Sair
            </button>
            <button
              onClick={closeModal}
              className="h-[48px] w-[128px] rounded-md border border-solid border-blue-500 bg-transparent px-6 py-3 font-semibold text-blue-500 transition-colors hover:bg-blue-50"
            >
              Não sair
            </button>
          </div>
        </section>
      </section>
    </div>
  )
}
