import * as DropDownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Check, List } from 'phosphor-react'
import { Feedback } from './Feedback'
import { useState } from 'react'

export default function Menu() {
  const { pathname } = useRouter()
  const [onFeedback, setOnFeedback] = useState(false)

  const pagesRoutes = [
    {
      title: 'Painel Principal',
      route: '/user/painel',
    },
    {
      title: 'Meu Perfil',
      route: '/user/profile',
    },
  ]

  //   const optionsRoutes = [
  //     {
  //       title: 'Precisando de Ajuda?',
  //       route: '',
  //     },
  //     {
  //       title: 'Feedback',
  //       route: '',
  //     },
  //     {
  //       title: 'Sair',
  //       route: '',
  //     },
  //   ]

  return (
    <div>
      <DropDownMenu.Root>
        <DropDownMenu.Trigger asChild>
          <button>
            <List size={32} className="cursor-pointer text-white" />
          </button>
        </DropDownMenu.Trigger>
        <DropDownMenu.Portal>
          <DropDownMenu.Content
            align="end"
            sideOffset={25}
            className="z-50 rounded-lg bg-gray-800 px-12 py-6 text-sm text-gray-400"
          >
            <DropDownMenu.RadioGroup
              className="flex flex-col gap-6"
              value={pathname}
            >
              {pagesRoutes.map((page) => (
                <DropDownMenu.RadioItem
                  key={page.route}
                  className="relative flex cursor-pointer items-center outline-none transition hover:text-blue-400 data-[state=checked]:font-semibold data-[state=checked]:text-blue-400"
                  value={page.route}
                >
                  <DropDownMenu.ItemIndicator className="absolute -left-8 text-blue-400">
                    <Check size={24} />
                  </DropDownMenu.ItemIndicator>
                  <Link key={page.title} href={page.route}>
                    {page.title}
                  </Link>
                </DropDownMenu.RadioItem>
              ))}
            </DropDownMenu.RadioGroup>

            <DropDownMenu.Separator className="my-6 h-px w-full bg-gray-600" />

            <DropDownMenu.RadioGroup
              className="flex flex-col gap-6"
              value={pathname}
            >
              <DropDownMenu.RadioItem
                className="relative flex cursor-pointer items-center outline-none transition hover:text-blue-400 data-[state=checked]:font-semibold data-[state=checked]:text-blue-400"
                value={'Precisando de Ajuda?'}
              >
                Precisando de Ajuda?
              </DropDownMenu.RadioItem>
              <DropDownMenu.RadioItem
                className="relative flex cursor-pointer items-center outline-none transition hover:text-blue-400 data-[state=checked]:font-semibold data-[state=checked]:text-blue-400"
                value={'Feedback'}
                onClick={() => setOnFeedback(true)}
              >
                Feedback
              </DropDownMenu.RadioItem>
              <DropDownMenu.RadioItem
                className="relative flex cursor-pointer items-center outline-none transition hover:text-blue-400 data-[state=checked]:font-semibold data-[state=checked]:text-blue-400"
                value={'Sair'}
              >
                Sair
              </DropDownMenu.RadioItem>
            </DropDownMenu.RadioGroup>
          </DropDownMenu.Content>
        </DropDownMenu.Portal>
      </DropDownMenu.Root>

      <Dialog.Root open={onFeedback} onOpenChange={setOnFeedback}>
        <Dialog.Trigger></Dialog.Trigger>
        <Feedback closeFeedback={() => setOnFeedback(false)} />
      </Dialog.Root>
    </div>
  )
}
