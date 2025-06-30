interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export function ButtonTertiary({ text, type, disabled, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`mx-auto mt-4 max-w-max rounded-lg border border-solid border-white bg-white px-20 py-2 font-semibold text-violet-500 transition-all hover:bg-violet-600 hover:text-white ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {text}
    </button>
  )
}
