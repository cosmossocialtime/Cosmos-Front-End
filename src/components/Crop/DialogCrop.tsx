import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { ReactNode } from 'react'

interface DialogCropProps {
  onDialog: boolean
  setOnDialog: (open: boolean) => void
  children: ReactNode
}

export function DialogCrop({
  onDialog,
  setOnDialog,
  children,
}: DialogCropProps) {
  return (
    <Dialog.Root open={onDialog} onOpenChange={setOnDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 z-10 h-screen w-screen bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800">
          <Dialog.Close>
            <X size={24} className=" absolute top-4 right-4 text-gray-100" />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
