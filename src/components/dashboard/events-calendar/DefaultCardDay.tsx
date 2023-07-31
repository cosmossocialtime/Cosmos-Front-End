import { twMerge } from 'tailwind-merge'

interface DefaultCardDayProps {
  day: string
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function DefaultCardDay({
  day,
  className,
  disabled = false,
  onClick,
}: DefaultCardDayProps) {
  return (
    <div
      data-disabled={disabled}
      className={twMerge(
        'relative flex h-full w-full cursor-pointer flex-col rounded-2xl border-2 border-solid border-transparent bg-zinc-100 p-2 text-sm font-bold transition-all duration-200 hover:border-violet-400 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-none data-[disabled=true]:opacity-60',
        className,
      )}
      onClick={onClick}
    >
      <span className="absolute left-2 top-2">{day}</span>
    </div>
  )
}
