import { X } from 'phosphor-react'
import { useTeam } from '../../../../hooks/useTeam'

type CloseModalProps = {
  closeModal: () => void
  memberName: string
  userId: number
  socialOrganizationId: number
}

export const DeleteMember = ({
  closeModal,
  memberName,
  userId,
  socialOrganizationId,
}: CloseModalProps) => {
  const { deleteUser } = useTeam(socialOrganizationId)

  const handleRemoveMember = () => {
    deleteUser(userId)
    closeModal()
  }

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
            Deseja mesmo remover {memberName} da equipe ?
          </h1>

          <p className="text-m mb-6 text-gray-500">
            Essa ação não poderá ser desfeita
          </p>

          {/* Botões */}
          <div className="justify-left mt-12 flex gap-[32px]">
            <button
              className="h-[48px] w-[240px] rounded-md bg-red-500 font-semibold text-white transition-colors hover:bg-red-600"
              onClick={() => handleRemoveMember()}
            >
              Remover
            </button>
            <button
              onClick={closeModal}
              className="h-[48px] w-[163px] rounded-md border border-solid border-blue-500 bg-transparent px-6 py-3 font-semibold text-blue-500 transition-colors hover:bg-blue-50"
            >
              Não Remover
            </button>
          </div>
        </section>
      </section>
    </div>
  )
}
