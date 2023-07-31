import { ArrowLeft } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ArrowLeftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  position?: 'top' | 'center' | 'bottom'
}

export function ArrowLeftButton({
  className,
  position = 'bottom',
  ...rest
}: ArrowLeftButtonProps) {
  return (
    <button
      {...rest}
      data-position={position}
      className={twMerge(
        'fixed left-[5%] cursor-pointer rounded-[50%] bg-zinc-800/30 p-3 text-blue-800 shadow-none backdrop-blur-md transition-colors hover:bg-violet-500 hover:text-gray-100 data-[position=bottom]:bottom-[10%] data-[position=center]:top-1/2 data-[position=top]:top-[10%] data-[position=center]:-translate-y-1/2',
        className,
      )}
    >
      <ArrowLeft size={36} className="" />
    </button>
  )
}
