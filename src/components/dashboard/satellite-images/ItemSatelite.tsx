import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

type SateliteProps = {
  children: ReactNode
  className?: string
}

export default function ItemSatelite({ className, children }: SateliteProps) {
  return (
    <Dialog.Trigger className={`${className}`}>
      <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-zinc-200/5 py-3 text-white backdrop-blur-sm">
        {children}
      </div>
    </Dialog.Trigger>
  )
}
