interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export function ButtonSecondary({
  text,
  type,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-12 items-center justify-center rounded-md bg-[#0A84FF] px-4 text-sm font-semibold text-white transition hover:bg-[#006FE0] ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {text}
    </button>
  )
}
