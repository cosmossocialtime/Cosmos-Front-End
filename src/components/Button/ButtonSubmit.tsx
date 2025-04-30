interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
}

export function Button({ text, type, disabled, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`colorButton mt-[20px] w-full rounded-md p-2 font-normal text-white transition ${
        disabled ? 'disabled' : ''
      }`}
    >
      {text}
    </button>
  )
}
