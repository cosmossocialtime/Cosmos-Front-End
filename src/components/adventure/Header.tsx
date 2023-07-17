import Link from 'next/link'
import { X } from 'phosphor-react'
import { ReactNode } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="relative flex items-center gap-7 px-20 py-7 shadow-lg after:absolute after:left-0 after:bottom-0 after:h-[6px] after:w-full after:bg-gradient-to-l after:from-violet-400 after:to-blue-300">
      <div>
        <span className="text-xl">{subtitle}</span>
        <h1 className="text-3xl font-semibold text-gray-600">{title}</h1>
      </div>
      {children}
      <Link href={'/user/painel'} className="absolute right-20 cursor-pointer">
        <X size={24} />
      </Link>
    </header>
  )
}
