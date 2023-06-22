import Link from 'next/link'
import { ArrowLeft } from 'phosphor-react'

interface BackButtonProps {
  link: string
}

export function BackButton({ link }: BackButtonProps) {
  return (
    <Link
      href={link}
      className="fixed top-[10%] left-[5%] cursor-pointer rounded-[50%] bg-zinc-800/30 p-3 text-zinc-50 backdrop-blur-md hover:bg-purple-500 focus:bg-purple-500"
    >
      <ArrowLeft weight="bold" />
    </Link>
  )
}
