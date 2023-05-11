import * as DropDownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Check, List } from 'phosphor-react';

export default function Menu() {
    const { pathname } = useRouter()

    const pagesRoutes = [
        {
            title: "Painel Principal",
            route: "/main-painel/painel",
        },
        {
            title: "Meu Perfil",
            route: "/main-painel/profile",
        },
    ]

    const optionsRoutes = [
        {
            title: "Precisando de Ajuda?",
            route: "",
        },
        {
            title: "Feedback",
            route: "",
        },
        {
            title: "Sair",
            route: "",
        },
    ]

    return (
        <DropDownMenu.Root>
            <DropDownMenu.Trigger asChild>
                <button>
                    <List size={32} className="text-white cursor-pointer" />
                </button>
            </DropDownMenu.Trigger>
            <DropDownMenu.Portal>
                <DropDownMenu.Content align='end' sideOffset={25} className='z-50 py-6 px-12 text-gray-400 text-sm bg-gray-800 rounded-lg'>
                    <DropDownMenu.RadioGroup
                        className='flex flex-col gap-6'
                        value={pathname}
                    >
                        {pagesRoutes.map(page => (
                            <DropDownMenu.RadioItem
                                key={page.route}
                                className='relative flex items-center outline-none cursor-pointer hover:text-blue-400 transition data-[state=checked]:font-semibold data-[state=checked]:text-blue-400'
                                value={page.route}
                            >
                                <DropDownMenu.ItemIndicator className='absolute -left-8 text-blue-400'>
                                    <Check size={24} />
                                </DropDownMenu.ItemIndicator>
                                <Link key={page.title} href={page.route}>
                                    {page.title}
                                </Link>
                            </DropDownMenu.RadioItem>
                        ))}
                    </DropDownMenu.RadioGroup>

                    <DropDownMenu.Separator className='my-6 h-px w-full bg-gray-600' />

                    <DropDownMenu.RadioGroup
                        className='flex flex-col gap-6'
                        value={pathname}
                    >
                        {optionsRoutes.map(option => (
                            <DropDownMenu.RadioItem
                                key={option.route}
                                className='relative flex items-center outline-none cursor-pointer hover:text-blue-400 transition data-[state=checked]:font-semibold data-[state=checked]:text-blue-400'
                                value={option.route}
                            >
                                <DropDownMenu.ItemIndicator className='absolute -left-8 text-blue-400'>
                                    <Check size={24} />
                                </DropDownMenu.ItemIndicator>
                                <Link key={option.title} href={option.route}>
                                    {option.title}
                                </Link>
                            </DropDownMenu.RadioItem>
                        ))}
                    </DropDownMenu.RadioGroup>
                </DropDownMenu.Content>
            </DropDownMenu.Portal>
        </DropDownMenu.Root>
    )
}