import Image from 'next/image'
import { useState } from 'react'
import { List, X } from 'phosphor-react'
import Link from 'next/link'
import Logo from '../../../public/images/logotipoCosmos.svg'
import { useHeader } from '../../context/HeaderContext'
import DropdownMenu from '../menu/DropdownMenu'

interface Route {
  label: string
  href: string
}

export default function DynamicHeader() {
  const { showMenu, showOrganization, routes, userName, organizationName } =
    useHeader()

  return (
    <header className="flex h-[68px] w-full items-center justify-between bg-white px-6 shadow-md">
      <div className="flex items-center gap-4">
        <LogoWithLink showOrganization={showOrganization} />
        {showOrganization && (
          <span className="text-gray-700">{organizationName}</span>
        )}
      </div>

      {showMenu && userName && <UserMenu userName={userName} routes={routes} />}
    </header>
  )
}

function LogoWithLink({ showOrganization }: { showOrganization: boolean }) {
  return (
    <Link href={showOrganization ? '/institutions/painel' : '#'} passHref>
      <Image
        src={Logo}
        alt="Logo cosmos"
        width={120}
        height={24}
        quality={100}
      />
    </Link>
  )
}

function UserMenu({ userName, routes }: { userName: string; routes: Route[] }) {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  function toggleDropdown() {
    setDropdownMenu((prev) => !prev)
  }

  function handleCloseMenu() {
    setDropdownMenu(false)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-5">
        <span className="cursor-pointer font-medium text-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-500 p-1"></div>
            {userName}
          </div>
        </span>

        <div className="h-5 w-[1px] bg-slate-100" />

        <div className="relative">
          {dropdownMenu ? (
            <X
              onClick={toggleDropdown}
              className="cursor-pointer"
              size={24}
              color="#4B5563"
            />
          ) : (
            <List
              onClick={toggleDropdown}
              className="cursor-pointer"
              size={24}
              color="#4B5563"
            />
          )}
          {/* Dropdown */}
          {dropdownMenu && (
            <DropdownMenu routes={routes} onClose={handleCloseMenu} />
          )}
        </div>
      </div>
    </div>
  )
}
