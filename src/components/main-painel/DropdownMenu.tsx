import Link from 'next/link'
import { useRouter } from 'next/router'
import { Check } from 'phosphor-react'
import { FeedbackModal } from '../../pages/institutions/painel/_components/FeedbackModal'
import { useState } from 'react'

export default function DropdownMenu() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { pathname } = useRouter()
  const optionsMenu = [
    {
      title: 'Painel Principal',
      link: '/institutions/painel',
    },
    {
      title: 'Equipe',
      link: '/institutions/painel/teams',
    },
    {
      title: 'Sistema Solar',
      link: '/institutions/painel/solarSystem',
    },
    {
      title: 'Trocar de organização',
      link: '/institutions/painel/changeOrganization',
    },
  ]

  const othersOptionsMenu = [
    {
      title: 'Precisa de Ajuda?',
      link: '/',
    },
  ]

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div
      className={`absolute -right-2 top-12 z-50 rounded-md bg-white p-5 shadow-sm shadow-black/20 md:w-[280px]`}
    >
      <div className={`flex flex-col gap-5`}>
        {optionsMenu.map((option, index) => (
          <Link
            className={`flex items-center gap-1 text-gray-500 hover:text-blue-500`}
            href={option.link}
            key={index}
          >
            {/* A lógica deverá ser trocada pelo link dinamico */}
            <span
              className={`${
                option.link === pathname && 'text-blue-500'
              } flex items-center gap-2`}
            >
              {option.title}
              {option.link === pathname && <Check />}
            </span>
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
          onClick={() => setIsModalOpen(true)}
        >
          Feedback
        </span>
        {isModalOpen && <FeedbackModal closeModal={closeModal} />}
        <div className={`h-[1px] w-full bg-black/5`} />

        <button className={`text-red-500`}>Sair</button>
      </div>
    </div>
  )
}
