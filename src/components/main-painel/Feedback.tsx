import * as Dialog from '@radix-ui/react-dialog'

export function Feedback() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray-500/50" />
      <Dialog.Content className="bg-blue-900"></Dialog.Content>
    </Dialog.Portal>
  )
}
