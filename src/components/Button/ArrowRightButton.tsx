import { ArrowRight } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ArrowRightButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  position?: 'top' | 'center' | 'bottom'
}

export function ArrowRightButton({
  className,
  position = 'bottom',
  ...rest
}: ArrowRightButtonProps) {
  return (
    <button
      {...rest}
      data-position={position}
      className={twMerge(
        'fixed right-[5%] cursor-pointer rounded-[50%] bg-zinc-800/30 p-3 text-blue-800 backdrop-blur-md transition-colors hover:bg-violet-500 hover:text-gray-100 data-[position=top]:top-[10%] data-[position=center]:top-1/2 data-[position=bottom]:bottom-[10%] data-[position=center]:-translate-y-1/2',
        className,
      )}
    >
      <ArrowRight size={36} />
    </button>
  )
}
