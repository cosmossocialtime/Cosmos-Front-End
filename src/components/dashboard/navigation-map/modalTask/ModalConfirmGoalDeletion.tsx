import * as Dialog from '@radix-ui/react-dialog'

type ModalConfirmGoalDeletionProps = {
  deleteObjective: (id: string) => void
  id: string
}

export default function ModalConfirmGoalDeletion({
  deleteObjective,
  id,
}: ModalConfirmGoalDeletionProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-gray-600/25" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-lg bg-blue-900 p-10">
        <p className="text-center text-lg text-white">
          Tem certeza que deseja excluir este objetivo? <br />
          Todos os itens dentro dele serão excluídos.
        </p>

        <div className="flex items-center gap-6">
          <Dialog.Close asChild>
            <button className="w-52 rounded-lg border-2 border-solid border-gray-300 py-4 text-center font-semibold text-gray-300 transition-colors hover:border-white hover:text-white">
              Cancelar
            </button>
          </Dialog.Close>
          <button
            className="w-52 rounded-lg bg-red-500 py-4 text-center font-semibold text-white transition-colors hover:bg-red-600"
            onClick={() => deleteObjective(id)}
          >
            Excluir
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
