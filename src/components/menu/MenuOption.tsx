import { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

import * as Menu from '@radix-ui/react-dropdown-menu'

interface MenuOptionProps {
  icon: ElementType
  content: string
  className?: string
  onClick?: () => void
}

export function MenuOption({
  icon: Icon,
  content,
  className,
  onClick,
}: MenuOptionProps) {
  return (
    <Menu.Item
      onClick={onClick}
      className={twMerge(
        'flex cursor-pointer items-center gap-1 text-gray-300',
        className,
      )}
    >
      <Icon size={24} />
      <span>{content}</span>
    </Menu.Item>
  )
}
