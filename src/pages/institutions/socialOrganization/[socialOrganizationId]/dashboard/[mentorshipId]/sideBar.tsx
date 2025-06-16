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
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SideBar() {
  const router = useRouter()
  const { mentorshipId } = router.query
  const { socialOrganizationId } = router.query

  const SideBarItems = [
    {
      id: 1,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/mission-painel`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/mission-painel',
      name: 'Painel da Missão',
      icon: <HouseLine />,
    },
    {
      id: 2,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/log-book`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/log-book',
      name: 'Diário de Bordo',
      icon: <File />,
    },
    {
      id: 3,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/satellite-images`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/satellite-images',
      name: 'Sistema Estelar',
      icon: <Star />,
    },
    {
      id: 4,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/events-calendar`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/events-calendar',
      name: 'Calendário de Eventos',
      icon: <Calendar />,
    },
    {
      id: 6,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/navigation-map`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/navigation-map',
      name: 'Mapa de Navegação',
      icon: <MapTrifold />,
    },
    {
      id: 7,
      route: `/institutions/socialOrganization/${socialOrganizationId}/dashboard/${mentorshipId}/crew`,
      pathname:
        '/institutions/socialOrganization/[socialOrganizationId]/dashboard/[mentorshipId]/crew',
      name: 'Tripulação',
      icon: <UsersThree />,
    },
  ]
  const { pathname } = useRouter()
  const [showside, setShowSide] = useState(true)

  return (
    <div className="relative h-full w-max">
      <aside
        className={`${
          showside ? 'w-[19rem]' : 'w-20 2xl:w-[5.5rem]'
        }  flex h-full flex-col bg-violet-900 transition-all duration-300`}
      >
        <div>
          <div className="relative mt-2 flex min-w-max flex-col px-2">
            {SideBarItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.route}
                  className={`${
                    pathname.includes(item.pathname) ? 'bg-white/10' : ''
                  } z-[1] my-1 flex items-center gap-4 rounded-lg border border-solid border-transparent py-3 pl-2 pr-3 text-white transition-colors hover:border-violet-500`}
                >
                  <span
                    className={`${
                      pathname.includes(item.pathname)
                        ? 'bg-purple-500'
                        : 'bg-white/10'
                    } items-center justify-center rounded-full p-2 text-center text-2xl 2xl:p-4`}
                  >
                    {item.icon}
                  </span>
                  {showside && (
                    <span
                      className={`${
                        pathname.includes(item.pathname) ? 'font-semibold' : ''
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        <div
          className={`${
            showside ? '' : 'hidden'
          } mt-auto flex min-w-max flex-col gap-1 bg-blue-900 px-2 py-4 text-white`}
        >
          <span>Precisa de ajuda?</span>
          <a
            href="https://wa.me/554191473667?text=Oi%2C%20aterrissei%20aqui%20vindo%20da%20Cosmos.%20Consegue%20me%20ajudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-400`}
          >
            Chat do Controle da Missão
          </a>
        </div>
      </aside>
      <button
        onClick={() => setShowSide(!showside)}
        className={`absolute left-full top-1/2 z-20 h-fit -translate-y-1/2 rounded-r-lg bg-violet-900 px-1 py-5 text-lg text-white`}
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
