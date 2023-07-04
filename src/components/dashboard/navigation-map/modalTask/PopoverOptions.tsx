import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction, useState } from 'react'

import { DotsThree, PencilSimpleLine, Trash } from 'phosphor-react'
import ModalConfirmGoalDeletion from './ModalConfirmGoalDeletion'

interface PopoverOptionsProps {
  setEditEnabled: Dispatch<SetStateAction<boolean>>
  deleteObjective: (id: string) => void
  id: string
}

export default function PopoverOptions({
  setEditEnabled,
  deleteObjective,
  id,
}: PopoverOptionsProps) {
  const [openPopover, setOpenPopover] = useState(false)

  function EnableEdit() {
    setEditEnabled(true)
    setOpenPopover(false)
  }

  return (
    <Popover.Root
      open={openPopover}
      onOpenChange={(open) => setOpenPopover(open)}
    >
      <Popover.Trigger>
        <DotsThree size={32} weight="bold" className="cursor-pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-30 flex flex-col gap-8 rounded-lg bg-blue-900 py-6 pl-6 pr-28 shadow-lg"
          align="end"
        >
          <div
            className="flex cursor-pointer items-center gap-1 text-gray-300"
            onClick={EnableEdit}
          >
            <PencilSimpleLine size={24} />
            <span>Editar</span>
          </div>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex cursor-pointer items-center gap-1  text-red-500">
                <Trash size={24} />
                <span>Excluir</span>
              </button>
            </Dialog.Trigger>
            <ModalConfirmGoalDeletion
              deleteObjective={deleteObjective}
              id={id}
            />
          </Dialog.Root>
          <Popover.Arrow fill="#0B1340" className="h-3 w-3" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
