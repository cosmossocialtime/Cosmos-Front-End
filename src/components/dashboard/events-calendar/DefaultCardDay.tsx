import React from 'react'
import { twMerge } from 'tailwind-merge'

interface DefaultCardDayProps {
  day: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

export function DefaultCardDay({
  day,
  className,
  disabled = false,
  onClick,
  children,
}: DefaultCardDayProps) {
  return (
    <div
      data-disabled={disabled}
      className={twMerge(
        'text-grey-600 relative flex h-full w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border-2 border-solid border-transparent bg-zinc-100 p-2 text-sm transition-all duration-200 hover:border-violet-400 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-none data-[disabled=true]:opacity-60',
        className
      )}
      onClick={onClick}
    >
      {/* Data no topo */}
      <span className="text-grey-600 ml-2 mt-2 text-sm">{day}</span>

      {/* Conteúdo com scroll se necessário */}
      <div className="mt-auto max-h-[70%] overflow-y-auto text-sm leading-tight text-white">
        {children}
      </div>
    </div>
  )
}
