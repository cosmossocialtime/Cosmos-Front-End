import * as Dialog from '@radix-ui/react-dialog'

type ModalConfirmGoalDeletionProps = {
    deleteObjective: (id: string) => void;
    id: string;
}

export default function ModalConfirmGoalDeletion({ deleteObjective, id }: ModalConfirmGoalDeletionProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='z-40 fixed inset-0 bg-gray-600/25' />
            <Dialog.Content className='z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 bg-blue-900 flex flex-col gap-8 rounded-lg'>
                <p className='text-center text-white text-lg'>
                    Tem certeza que deseja excluir este objetivo? <br />
                    Todos os itens dentro dele serão excluídos.
                </p>

                <div className='flex items-center gap-6'>
                    <Dialog.Close asChild>
                        <button className='w-52 py-4 text-center text-gray-300 font-semibold rounded-lg border-2 border-solid border-gray-300 hover:border-white hover:text-white transition-colors'>
                            Cancelar
                        </button>
                    </Dialog.Close>
                    <button
                        className='w-52 py-4 text-center text-white font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition-colors'
                        onClick={() => deleteObjective(id)}
                    >
                        Excluir
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}