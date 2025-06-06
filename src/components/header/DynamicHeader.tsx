import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Camera, List, X } from 'phosphor-react'
import Link from 'next/link'
import Logo from '../../../public/images/logotipoCosmos.svg'
import { useHeader } from '../../context/HeaderContext'
import DropdownMenu from '../menu/DropdownMenu'

interface Route {
  label: string
  href: string
}

export default function DynamicHeader() {
  const {
    showMenu,
    showOrganization,
    routes,
    userName,
    profilePicture,
    organizationName,
    socialOrganizationId,
  } = useHeader()

  return (
    <header className="flex h-[68px] w-full items-center justify-between bg-white px-6 shadow-md">
      <div className="flex items-center gap-4 px-6">
        <LogoWithLink socialOrganizationId={socialOrganizationId || 0} />
        {showOrganization && (
          <span className="px-6 text-gray-700">{organizationName}</span>
        )}
      </div>

      {showMenu && userName && (
        <UserMenu
          userName={userName}
          routes={routes}
          socialOrganizationId={socialOrganizationId || 0}
          profilePicture={profilePicture}
        />
      )}
    </header>
  )
}

function LogoWithLink({
  socialOrganizationId,
}: {
  socialOrganizationId: number
}) {
  return (
    <Link
      href={
        socialOrganizationId && socialOrganizationId !== 0
          ? `/institutions/socialOrganization/${socialOrganizationId}/home`
          : '/user/login'
      }
      passHref
    >
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

function UserMenu({
  userName,
  routes,
  socialOrganizationId,
  profilePicture,
}: {
  userName: string
  routes: Route[]
  socialOrganizationId: number
  profilePicture: string | null
}) {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  function toggleDropdown() {
    setDropdownMenu((prev) => !prev)
  }

  function handleCloseMenu() {
    setDropdownMenu(false)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownMenu(false)
      }
    }

    if (dropdownMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownMenu])

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-5">
        <Link
          href={
            socialOrganizationId && socialOrganizationId !== 0
              ? `/institutions/socialOrganization/${socialOrganizationId}/profile`
              : ''
          }
          passHref
        >
          <span className="cursor-pointer font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blue-400 bg-gray-200 p-1">
                {profilePicture ? (
                  <Image
                    className="rounded-full object-cover"
                    src={profilePicture}
                    alt="foto do usuario"
                    width={128}
                    height={128}
                    quality={100}
                  />
                ) : (
                  <Camera size={16} className="text-gray-400" />
                )}
              </div>
              {userName}
            </div>
          </span>
        </Link>

        <div className="h-5 w-[1px] bg-slate-100" />

        <div className="relative" ref={dropdownRef}>
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

          {dropdownMenu && (
            <DropdownMenu routes={routes} onClose={handleCloseMenu} />
          )}
        </div>
      </div>
    </div>
  )
}
