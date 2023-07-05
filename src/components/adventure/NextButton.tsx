import Link, { LinkProps } from 'next/link'
import { ArrowRight } from 'phosphor-react'

interface NextButtonProps extends LinkProps {
  href: string
  disabled?: boolean
}

export function NextButton({
  href,
  disabled = false,
  ...rest
}: NextButtonProps) {
  return (
    <Link
      {...rest}
      href={href}
      className={`${disabled ? 'pointer-events-none' : ''}`}
    >
      <ArrowRight
        size={64}
        className="absolute right-36 bottom-16 cursor-pointer rounded-full bg-gray-400/10 p-4 text-blue-800 transition-colors hover:bg-violet-600 hover:text-white"
      />
    </Link>
  )
}
