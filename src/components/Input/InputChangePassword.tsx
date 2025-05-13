import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface InputChangePasswordProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  register?: UseFormRegister<any>
  error?: string
  helperText?: string
  onChangePassword: () => void
}

export function InputChangePassword({
  id,
  label,
  register,
  error,
  helperText,
  onChangePassword,
  ...rest
}: InputChangePasswordProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id}> {label} </label>
      <div className="relative flex w-full max-w-md">
        <input
          {...(register && {
            ...register(id, {
              required: 'O campo senha é obrigatório',
              minLength: {
                value: 8,
                message: 'A senha deve ter no mínimo 8 caracteres.',
              },
            }),
          })}
          id={id}
          className="w-full rounded-md border border-solid border-gray-400 p-2 transition-all duration-200 hover:border-purple-500 hover:shadow-sm hover:shadow-purple-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          {...rest}
        />
        <button
          type="button"
          onClick={() => onChangePassword()}
          className="absolute right-4 top-2"
        >
          <span className="text-sm font-semibold text-blue-400">
            Alterar senha
          </span>
        </button>
      </div>
      <span
        className={`text-[12px] leading-[1.1] ${
          error ? 'text-rose-600' : 'text-gray-600'
        }`}
      >
        {error || helperText}
      </span>
    </div>
  )
}
