import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface PropsChild {
  children: ReactNode
}

export default function ModalContent(Props: PropsChild) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gray-100 text-white shadow-lg shadow-black/25 lg:h-4/5 lg:w-[80%]">
        {Props.children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
