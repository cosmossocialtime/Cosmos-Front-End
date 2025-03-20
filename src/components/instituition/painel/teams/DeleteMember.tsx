import { X } from 'phosphor-react'

type CloseModalProps = {
  closeModal: () => void
  memberName: string
}

export const DeleteMember = ({ closeModal, memberName }: CloseModalProps) => {
  return (
    <section className="absolute left-0 top-0 z-[60] flex min-h-screen w-full items-center justify-center bg-black/25">
      <section className="rounded-md bg-white p-10 shadow-lg md:min-w-[500px]">
        <div className="flex items-center justify-between gap-3 border-b pb-2">
          <h1 className="text-xl font-semibold">
            Deseja mesmo remover {memberName} da equipe ?
          </h1>
          <button type="button">
            <X
              onClick={closeModal}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              size={20}
            />
          </button>
        </div>
        <p>Essa ação não poderá ser desfeita</p>

        <div className="mt-5 flex items-center gap-4">
          <button className="rounded-md bg-red-400 p-3 px-16 font-semibold text-white">
            Remover
          </button>
          <button
            onClick={closeModal}
            className="rounded-md border border-blue-600 bg-white p-3 px-5 font-semibold text-c-blue-500 shadow-sm shadow-black/10"
          >
            Não Remover
          </button>
        </div>
      </section>
    </section>
  )
}
