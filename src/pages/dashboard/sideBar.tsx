'use client'

import {
  ArrowLeft,
  Calendar,
  File,
  HouseLine,
  MapTrifold,
  Star,
  UsersThree,
} from 'phosphor-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SideBar() {
  const SideBarItems = [
    {
      id: 1,
      route: '/dashboard/mission-painel',
      name: 'Painel da Missão',
      icon: <HouseLine />,
    },
    {
      id: 2,
      route: '/dashboard/log-book',
      name: 'Diário de Bordo',
      icon: <File />,
    },
    {
      id: 3,
      route: '/dashboard/satellite-images',
      name: 'Imagens de Satétile',
      icon: <Star />,
    },
    {
      id: 4,
      route: '/dashboard/events-calendar',
      name: 'Calendário de Eventos',
      icon: <Calendar />,
    },
    {
      id: 6,
      route: '/dashboard/navigation-map',
      name: 'Mapa de Navegação',
      icon: <MapTrifold />,
    },
    {
      id: 7,
      route: '/dashboard/crew',
      name: 'Tripulação',
      icon: <UsersThree />,
    },
  ]
  const { pathname } = useRouter()
  const [showside, setShowSide] = useState(true)

  return (
    <div className="relative">
      <aside
        className={`${
          showside ? 'w-[19rem]' : 'w-20 2xl:w-[5.5rem]'
        } relative flex min-h-screen flex-col overflow-hidden bg-violet-900 transition-all duration-300`}
      >
        <div>
          <div className="mx-auto my-7 w-fit">
            <Link href={'/main-painel/painel'}>
              {showside ? (
                <Image
                  width={160}
                  height={30}
                  src="/images/logoCosmosBranco.svg"
                  alt="Logo Cosmos"
                />
              ) : (
                <Image
                  width={32}
                  height={0}
                  src="/images/Ccosmos.svg"
                  alt="Logo Cosmos"
                />
              )}
            </Link>
          </div>

          {showside && (
            <Link
              href={'/main-painel/painel'}
              className="mx-auto block text-center font-semibold text-blue-400"
            >
              Voltar ao Painel Principal
            </Link>
          )}

          <div className="relative mt-2 flex flex-col px-2">
            {SideBarItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`${
                    pathname === item.route ? 'bg-white/10' : ''
                  } z-[1] my-1 flex items-center gap-4 rounded-lg border border-solid border-transparent py-3 pl-2 pr-3 text-white transition-colors hover:border-violet-500`}
                >
                  <span
                    className={`${
                      pathname === item.route ? 'bg-purple-600' : 'bg-white/10'
                    } items-center justify-center rounded-full p-2 text-center text-2xl 2xl:p-4`}
                  >
                    {item.icon}
                  </span>
                  <strong>{item.name}</strong>
                </Link>
              )
            })}
          </div>
        </div>

        <div
          className={`${
            showside ? '' : 'hidden'
          } mt-auto flex flex-col gap-1 bg-blue-900 px-2 py-4 text-white`}
        >
          <Link href="/">Precisa de ajuda?</Link>
          <Link href="/" className="text-blue-400">
            Chat do Controle da Missão
          </Link>
        </div>
      </aside>
      <button
        onClick={() => setShowSide(!showside)}
        className={`absolute left-full top-1/2 h-fit  -translate-y-1/2 rounded-r-lg bg-violet-900 py-5 px-1 text-lg text-white`}
      >
        <ArrowLeft
          className={`${
            !showside && 'rotate-180'
          } transition-transform duration-300`}
        />
      </button>
    </div>
  )
}
