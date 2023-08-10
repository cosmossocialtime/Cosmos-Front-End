import * as Menu from '@radix-ui/react-dropdown-menu'
import { DotsThree } from 'phosphor-react'
import React from 'react'

interface MenuRootProps {
  children: React.ReactNode
}

export function MenuRoot({ children }: MenuRootProps) {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <DotsThree size={32} weight="bold" className="cursor-pointer" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          className="z-30 flex flex-col gap-8 rounded-lg bg-blue-900 py-6 pl-6 pr-28 shadow-lg"
          align="end"
        >
          {children}
          <Menu.Arrow fill="#0B1340" className="h-3 w-3" />
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  )
}
