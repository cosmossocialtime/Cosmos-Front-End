import Link, { LinkProps } from 'next/link'
import { ArrowLeft } from 'phosphor-react'

interface BackButtonProps extends LinkProps {
  href: string
  disabled?: boolean
}

export function BackButton({
  href,
  disabled = false,
  ...rest
}: BackButtonProps) {
  return (
    <Link
      {...rest}
      href={href}
      className={`${disabled ? 'pointer-events-none' : ''}`}
    >
      <ArrowLeft
        size={64}
        className="absolute left-36 bottom-16 cursor-pointer rounded-full bg-gray-400/10 p-4 text-blue-800 transition-colors hover:bg-violet-600 hover:text-white"
      />
    </Link>
  )
}
