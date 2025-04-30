import { ReactNode } from 'react'

interface SelectableButtonProps {
  onClick: () => void
  icon: ReactNode
  text: string
  arrow: ReactNode
}

export function SelectableButton({
  onClick,
  icon,
  text,
  arrow,
}: SelectableButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[80px] w-full items-center justify-between rounded-[16px] border border-solid border-[#D0D5E5] px-6 py-4 transition hover:bg-gray-100"
    >
      <div className="flex items-center">
        <span className="mr-3 h-[20px] w-[20px] flex-shrink-0 text-gray-600">
          {icon}
        </span>
        <span className="flex-grow text-left text-sm text-gray-800">
          {text}
        </span>
      </div>
      <span className="h-[20px] w-[20px] flex-shrink-0 text-gray-600">
        {arrow}
      </span>
    </button>
  )
}
