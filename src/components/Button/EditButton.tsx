import { PencilSimple } from 'phosphor-react'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export function EditButton({ text, type, disabled, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md border border-solid border-gray-300 p-2 text-sm font-normal text-blue-400 transition-colors hover:bg-blue-50 ${
        disabled ? 'disabled' : ''
      }`}
    >
      <PencilSimple size={16} weight="bold" />
      {text}
    </button>
  )
}
