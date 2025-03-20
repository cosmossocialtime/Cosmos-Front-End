import Image from 'next/image'
// import { useRouter } from 'next/router'
import { useState } from 'react'
import Logo from '../../../public/images/logotipoCosmos.svg'
// import styles from '../../components/instituition/heade.module.css'
import { List, X } from 'phosphor-react'
import DropdownMenu from './DropdownMenu'

interface HeaderProps {
  organizationName?: string
  userName?: string
}

export default function DynamicHeader({
  organizationName,
  userName,
}: HeaderProps) {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  // const router = useRouter()
  // const [showFullHeader, setShowFullHeader] = useState(false)

  // useEffect(() => {
  //   // Definir páginas onde apenas o logo deve ser exibido
  //   const minimalPages = new Set([
  //     '/institutions/onboardingProgram/terms',
  //     '/institutions/onboardingProgram/finalization',
  //     '/institutions/onboardingProgram/focalPoint',
  //     '/institutions/onboardingProgram/aboutInstitution',
  //     '/institutions/onboardingProgram/descriptiveData',
  //   ])
  //   setShowFullHeader(!minimalPages.has(router.pathname))
  // }, [router.pathname])

  return (
    <header className="flex h-[68px] w-full items-center justify-between bg-white px-6 shadow-md">
      {/* Logo e Nome da Organização */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div>
            <Image
              src={Logo}
              alt="Logo cosmos"
              width={120}
              height={24}
              quality={100}
            />
          </div>
          <div>
            {organizationName && (
              <span className="text-gray-700">{organizationName}</span>
            )}
          </div>
        </div>
      </div>

      {/* Nome do usuário à direita (se necessário) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-5">
          <span className="cursor-pointer font-medium text-gray-700">
            <div className={`flex items-center gap-2`}>
              <div className={`h-8 w-8 rounded-full bg-gray-500 p-1`}></div>
              {userName || 'Usuário Name'}
            </div>
          </span>

          <div className={`h-5 w-[1px] bg-slate-100`}></div>

          <div className={`relative`}>
            {!dropdownMenu ? (
              <List
                onClick={() => setDropdownMenu((prev) => !prev)}
                className={`cursor-pointer`}
                size={24}
                color={`#4B5563`}
              />
            ) : (
              <X
                onClick={() => setDropdownMenu((prev) => !prev)}
                className={`cursor-pointer`}
                size={24}
                color={`#4B5563`}
              />
            )}

            {dropdownMenu && <DropdownMenu />}
          </div>
          {/* Aqui pode ser adicionado um dropdown de menu futuramente */}
        </div>
      </div>
    </header>
  )
}
