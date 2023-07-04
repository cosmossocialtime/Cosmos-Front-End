import * as DropDownMenu from '@radix-ui/react-dropdown-menu'

interface ItemDropDownProps {
  slug?: string
  title: string
}

export default function ItemDropDown({ slug, title }: ItemDropDownProps) {
  return (
    <DropDownMenu.Item className="cursor-pointer outline-none transition hover:text-blue-400">
      {title}
    </DropDownMenu.Item>
  )
}
