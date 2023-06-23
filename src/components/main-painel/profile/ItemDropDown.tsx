import * as DropDownMenu from '@radix-ui/react-dropdown-menu';

interface ItemDropDownProps {
    slug?: string;
    title: string;
}

export default function ItemDropDown({ slug, title }: ItemDropDownProps) {
    return (
        <DropDownMenu.Item className='outline-none cursor-pointer hover:text-blue-400 transition'>
            {title}
        </DropDownMenu.Item>
    )
}