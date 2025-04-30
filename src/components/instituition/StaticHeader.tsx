import Image from 'next/image'
import Logo from '../../../public/images/logotipoCosmos.svg'

export default function StaticHeader() {
  return (
    <header className="flex h-[68px] w-full items-center justify-between bg-white px-6 shadow-md">
      {/* Logo e Nome da Organização */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="inline-flex items-center">
          <Image
            className={`flex-shrink-0`}
            src={Logo}
            alt="Logo cosmos"
            width={120}
            height={24}
            quality={100}
          />
        </div>
      </div>
    </header>
  )
}
