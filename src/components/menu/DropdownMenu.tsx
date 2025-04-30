import Link from 'next/link'
import { FeedbackModal } from '../main-painel/institutions/FeedbackModal'
import { useState } from 'react'
import { Check } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { LogoutConfirmation } from '../logoutConfirmation'

interface DropdownMenuProps {
  routes: { label: string; href: string }[]
  onClose: () => void
}

export default function DropdownMenu({ routes, onClose }: DropdownMenuProps) {
  const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState<boolean>(false)
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false)
  const othersOptionsMenu = [
    {
      title: 'Precisa de Ajuda?',
      link: '/',
    },
  ]

  const closeModalFeedback = () => {
    setIsModalFeedbackOpen(false)
  }

  const closeModalLogout = () => {
    setIsModalLogoutOpen(false)
  }

  return (
    <div
      className={`absolute -right-2 top-12 z-50 rounded-md bg-white p-5 shadow-sm shadow-black/20 md:w-[280px]`}
    >
      <div className={`flex flex-col gap-5`}>
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            onClick={onClose}
            className="text-gray-500 hover:text-blue-500"
          >
            {route.label}
          </Link>
        ))}
        <div className={`h-[1px] w-full bg-black/5`} />
        {othersOptionsMenu.map((option, index) => (
          <Link
            className={`text-gray-500 hover:text-blue-500`}
            href={option.link}
            key={index}
          >
            {/* A lógica deverá ser trocada pelo link dinamico */}
            {option.title}
            {option.title === 'Painel Principal' && <Check />}
          </Link>
        ))}
        <span
          className="cursor-pointer text-gray-500 hover:text-blue-500"
          onClick={() => setIsModalFeedbackOpen(true)}
        >
          Feedback
        </span>
        {isModalFeedbackOpen && (
          <FeedbackModal closeModal={closeModalFeedback} />
        )}
        <div className={`h-[1px] w-full bg-black/5`} />
        <span
          className={`cursor-pointer text-red-500`}
          onClick={() => setIsModalLogoutOpen(true)}
        >
          Sair
        </span>
        {isModalLogoutOpen && (
          <LogoutConfirmation closeModal={closeModalLogout} />
        )}
      </div>
    </div>
  )
}
